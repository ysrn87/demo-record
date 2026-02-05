'use client';

import { useState } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { UserRole } from '@prisma/client';
import toast from 'react-hot-toast';

interface DemoRoleSwitcherProps {
  currentRole: UserRole;
  userEmail: string;
}

const roleLabels: Record<UserRole, string> = {
  PRIVILEGE: 'Super Admin (Privilege)',
  ADMIN: 'Admin',
  SALES: 'Sales',
  WAREHOUSE: 'Warehouse',
};

const roleDescriptions: Record<UserRole, string> = {
  PRIVILEGE: 'Full access to all features including reports and user management',
  ADMIN: 'Manage products, variants, pricing, and users',
  SALES: 'Record sales transactions and generate invoices',
  WAREHOUSE: 'Record incoming stock and inventory',
};

export default function DemoRoleSwitcher({ currentRole, userEmail }: DemoRoleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [switching, setSwitching] = useState(false);

  const handleRoleSwitch = async (newRole: UserRole) => {
    if (newRole === currentRole) {
      setIsOpen(false);
      return;
    }

    setSwitching(true);
    const loadingToast = toast.loading(`Switching to ${roleLabels[newRole]}...`);
    
    try {
      // Step 1: Update role in database
      const response = await fetch('/api/demo/switch-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      // Step 2: Sign out (without redirect)
      await signOut({ redirect: false });

      // Step 3: Sign back in with same credentials (role is now updated in DB)
      const result = await signIn('credentials', {
        email: userEmail,
        password: 'password123', // Demo password
        redirect: false,
      });

      if (result?.error) {
        throw new Error('Failed to re-authenticate');
      }

      toast.dismiss(loadingToast);
      toast.success(`Switched to ${roleLabels[newRole]}!`);
      
      // Step 4: Reload the page to get fresh session and layout
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 500);
      
    } catch (error) {
      console.error('Role switch error:', error);
      toast.dismiss(loadingToast);
      toast.error('Failed to switch role. Refreshing page...');
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-yellow-100 border border-yellow-300 rounded-lg hover:bg-yellow-100 transition-colors"
        disabled={switching}
      >
        <svg
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
        <span className="hidden sm:inline">Switch Demo Mode: {roleLabels[currentRole]}</span>
        <span className="sm:hidden whitespace-nowrap">Switch: {roleLabels[currentRole]}</span>
        <svg
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute mt-2 w-2/3 sm:w-80 max-w-sm bg-white rounded-lg shadow-xl border border-gray-200 z-50 mx-2 sm:mx-0">
            <div className="p-3 sm:p-4 border-b border-gray-200 bg-yellow-100">
              <h3 className="font-semibold text-sm sm:text-base text-gray-900">Demo Role</h3>
              <p className="text-xs text-gray-600 mt-1">
                Switch to see different layouts and features
              </p>
            </div>
            
            <div className="p-2 max-h-96 overflow-y-auto">
              {Object.values(UserRole).map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleSwitch(role)}
                  disabled={switching || role === currentRole}
                  className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors mb-1 ${
                    role === currentRole
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  } ${switching ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm sm:text-base text-gray-900">
                      {roleLabels[role]}
                    </span>
                    {role === currentRole && (
                      <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">
                    {roleDescriptions[role]}
                  </p>
                </button>
              ))}
            </div>
            
            <div className="p-2 sm:p-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                💡 Layout and menu will update to match the selected role
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}