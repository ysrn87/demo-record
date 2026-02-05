'use client';

export default function DemoBanner() {
  return (
    <div className="bg-linear-to-r from-yellow-400 via-yellow-300 to-yellow-400 border-b-2 border-yellow-500">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-800 animate-pulse shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-semibold text-yellow-900 whitespace-nowrap">
            🎭 DEMO MODE • <span className="text-red-500 font-bold animate-pulse"> ALL DATA RESETS AFTER LOGOUT
          </span>
          
          </span>
          {/* <p className="text-yellow-800">
            Switch roles to see different layouts 
          </p> */}
        </div>
      </div>
    </div>
  );
}