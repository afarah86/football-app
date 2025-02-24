export default function Step3Preferences({ formData, handleChange, prevStep, handleSubmit }: any) {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm -space-y-px">
        <div className="mb-4">
          <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
            Position
          </label>
          <select
            id="position"
            name="position"
            required
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            value={formData.position}
            onChange={handleChange}
          >
            <option value="">Select position</option>
            <option value="attacker">Attacker</option>
            <option value="midfield">Midfield</option>
            <option value="defender">Defender</option>
            <option value="goalkeeper">Goalkeeper</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="footPreference" className="block text-sm font-medium text-gray-700 mb-1">
            Foot Preference
          </label>
          <select
            id="footPreference"
            name="footPreference"
            required
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            value={formData.footPreference}
            onChange={handleChange}
          >
            <option value="">Select foot preference</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="both">Both</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="playFrequency" className="block text-sm font-medium text-gray-700 mb-1">
            Play Frequency
          </label>
          <select
            id="playFrequency"
            name="playFrequency"
            required
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            value={formData.playFrequency}
            onChange={handleChange}
          >
            <option value="">Select frequency</option>
            <option value="once_week">Once a week</option>
            <option value="twice_week">Twice a week</option>
            <option value="several_week">Several times a week</option>
            <option value="once_month">Once a month</option>
            <option value="once_three_months">Once every 3 months</option>
            <option value="rarely">Rarely</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={prevStep}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-red-600 bg-white border-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Back
        </button>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Register
        </button>
      </div>
    </form>
  );
} 