export default function PremiumBanner() {
  return (
    <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-100">
      <div className="flex items-start gap-4">
        <div className="bg-[#0A2133] p-3 rounded-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#0A2133] mb-2">GET ONE STEP AHEAD</h2>
          <p className="text-gray-600 text-lg">
            Get notified for available courts, grant your matches more visibility and discover your advanced statistics
          </p>
        </div>
        <div className="text-[#0A2133]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
} 