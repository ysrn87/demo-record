import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import Sidebar from '@/components/layout/Sidebar';
import SessionMonitor from '@/components/auth/SessionMonitor';
import DemoBanner from '@/components/demo/DemoBanner';
import DemoRoleSwitcher from '@/components/demo/DemoRoleSwitcher';

// Prevent caching to ensure fresh session check
// export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Check for valid session with user data
  if (!session?.user?.id || (session as any)?.error === 'UserInvalidated') {
    redirect('/login?error=SessionExpired');
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SessionMonitor />
      
      {/* Demo Banner - Fixed at top on all screens */}
      <div className="sticky top-0 z-50 no-print mb-1">
        <DemoBanner />
      </div>
      <div className="sticky top-0 left-0 z-50 no-print">
        <DemoRoleSwitcher currentRole={session.user.role} userEmail={session.user.email} />
      </div>
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="no-print sticky bottom-0">
          <Sidebar userRole={session.user.role} userName={session.user.name} />
        </div>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          
          {/* Main Content */}
          <div className="p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}