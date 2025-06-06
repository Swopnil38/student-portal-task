import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Searchbar({ onSearch, sortValue, onSortChange }) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sort, setSort] = React.useState(sortValue || '');

  const handleSearch = () => {
    // Allow searching by name or plan
    onSearch(searchTerm, sort);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    onSortChange && onSortChange(e);
    // Optionally trigger search on sort change:
    onSearch(searchTerm, e.target.value);
  };

  return (
    <div className="flex flex-col mb-4 w-full">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
          <input
            type="text"
            aria-label="Search for a student by name or plan"
            placeholder="Search by name or plan"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full transition-colors bg-blue-50 placeholder-blue-400 text-gray-800 shadow-sm"
          />
        </div>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors w-full sm:w-auto justify-center text-base sm:text-base"
          onClick={handleSearch}
          aria-label="Search"
        >
          <MagnifyingGlassIcon className="w-5 h-5" aria-hidden="true" />
          <span className="sm:inline">Search</span>
        </button>
        <div className="relative w-full sm:w-auto">
          <select
            className="border-2 border-blue-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-[120px] bg-blue-50 text-gray-800 shadow-sm appearance-none pr-8 w-full sm:w-auto"
            value={sort}
            onChange={handleSortChange}
            aria-label="Sort By"
          >
            <option value="">Sort By</option>
            <option value="-enrolled_date">Enrolled Date (Newest)</option>
            <option value="enrolled_date">Enrolled Date (Oldest)</option>
            <option value="status">Status</option>
          </select>
          <svg className="w-4 h-4 text-blue-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
    </div>
  );
}

