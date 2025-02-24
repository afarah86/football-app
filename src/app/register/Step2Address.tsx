import { useState, useEffect, useRef } from 'react';
import countries from './countries'; // We'll create this file next

export default function Step2Address({ formData, handleChange, nextStep, prevStep }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle clicking outside of dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  const selectCountry = (countryName: string) => {
    handleChange({
      target: {
        name: 'country',
        value: countryName
      }
    });
    setSearchTerm(countryName);
    setIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm -space-y-px">
        <div className="mb-4 relative" ref={dropdownRef}>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <div className="relative">
            <input
              type="text"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Search and select country..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              onClick={() => setIsOpen(true)}
            />
            {isOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                {filteredCountries.map((country) => (
                  <div
                    key={country.code}
                    className="cursor-pointer hover:bg-gray-100 px-3 py-2"
                    onClick={() => selectCountry(country.name)}
                  >
                    {country.name}
                  </div>
                ))}
                {filteredCountries.length === 0 && (
                  <div className="px-3 py-2 text-gray-500">
                    No countries found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="streetName" className="sr-only">Street Name</label>
          <input
            id="streetName"
            name="streetName"
            type="text"
            required
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            placeholder="Street Name"
            value={formData.streetName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="streetNumber" className="sr-only">Street Number</label>
          <input
            id="streetNumber"
            name="streetNumber"
            type="text"
            required
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            placeholder="Street Number"
            value={formData.streetNumber}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="zipCode" className="sr-only">ZIP Code</label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            required
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            placeholder="ZIP Code"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="sr-only">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
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
          Next
        </button>
      </div>
    </form>
  );
} 