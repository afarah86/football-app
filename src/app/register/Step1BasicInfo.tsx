import { useState, useEffect, useRef } from 'react';
import { format, parse, isValid, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import countries from './countries';

export default function Step1BasicInfo({ formData, handleChange, nextStep }: any) {
  const today = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNationalities, setSelectedNationalities] = useState<string[]>(formData.nationalities || []);
  const [dateSelection, setDateSelection] = useState<'yearGroup' | 'year' | 'month' | 'day'>('day');
  const [selectedYearGroup, setSelectedYearGroup] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewDate, setViewDate] = useState<Date>(today);
  const [dateInput, setDateInput] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedNationalities.includes(country.name)
  );

  // Handle clicking outside of dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
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
    const newNationalities = [...selectedNationalities, countryName];
    setSelectedNationalities(newNationalities);
    handleChange({
      target: {
        name: 'nationalities',
        value: newNationalities
      }
    });
    setSearchTerm('');
  };

  const removeNationality = (nationality: string) => {
    const newNationalities = selectedNationalities.filter(n => n !== nationality);
    setSelectedNationalities(newNationalities);
    handleChange({
      target: {
        name: 'nationalities',
        value: newNationalities
      }
    });
  };

  // Generate year groups (10 years each)
  const currentYear = new Date().getFullYear();
  const yearGroups = Array.from({ length: 10 }, (_, i) => {
    const startYear = currentYear + (5 - (i * 10));
    const endYear = startYear - 9;
    return {
      label: `${startYear} - ${endYear}`,
      startYear,
      endYear
    };
  });

  // Generate calendar data
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
  const startDay = monthStart.getDay();
  
  // Create array for blank days at start
  const blanksAtStart = Array(startDay).fill(null);
  
  // Calculate blanks needed at end to complete the grid
  const totalDays = blanksAtStart.length + daysInMonth.length;
  const remainingCells = 42 - totalDays; // 6 rows * 7 days = 42
  const blanksAtEnd = Array(remainingCells).fill(null);

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault(); // Prevent form submission
    const value = e.target.value;
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length <= 8) {
      let formattedDate = '';
      if (numbers.length > 0) formattedDate = numbers.slice(0, 2);
      if (numbers.length > 2) formattedDate += '-' + numbers.slice(2, 4);
      if (numbers.length > 4) formattedDate += '-' + numbers.slice(4, 8);
      
      setDateInput(formattedDate);

      // Auto-parse valid date
      if (numbers.length === 8) {
        const parsedDate = parse(formattedDate, 'dd-MM-yyyy', new Date());
        if (isValid(parsedDate)) {
          setSelectedDate(parsedDate);
          setViewDate(parsedDate);
          handleChange({
            target: {
              name: 'dateOfBirth',
              value: format(parsedDate, 'yyyy-MM-dd')
            }
          });
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
    }
    if (e.key === 'Backspace' && dateInput.length > 0) {
      e.preventDefault();
      const newValue = dateInput.slice(0, -1).replace(/-$/, '');
      setDateInput(newValue);
    }
  };

  const toggleCalendar = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault(); // Prevent form submission
      e.stopPropagation(); // Prevent event bubbling
    }
    setIsCalendarOpen(!isCalendarOpen);
    setDateSelection('day');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm -space-y-px">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4 relative" ref={calendarRef}>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <div className="relative">
            <input
              ref={inputRef}
              id="dateOfBirth"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
              value={isCalendarOpen ? dateInput : selectedDate ? format(selectedDate, 'dd MMMM yyyy') : ''}
              onChange={handleDateInput}
              onKeyDown={handleKeyDown}
              onClick={(e) => {
                e.preventDefault();
                toggleCalendar(e);
                setDateInput('');
              }}
              placeholder="DD-MM-YYYY"
              required
            />
            <button
              type="button" // Specify button type to prevent form submission
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={toggleCalendar}
            >
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>

          {isCalendarOpen && (
            <div className="absolute mt-1 bg-white rounded-lg shadow-lg border border-gray-200 w-[280px] z-50">
              {/* Calendar UI will go here - I can provide this next */}
            </div>
          )}
        </div>

        <div className="mb-4 relative" ref={dropdownRef}>
          <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
            Nationality
          </label>
          {selectedNationalities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedNationalities.map(nationality => (
                <span
                  key={nationality}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800"
                >
                  {nationality}
                  <button
                    type="button"
                    onClick={() => removeNationality(nationality)}
                    className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full hover:bg-red-200"
                  >
                    <span className="sr-only">Remove {nationality}</span>
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          <div className="relative">
            <input
              type="text"
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Select country"
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
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