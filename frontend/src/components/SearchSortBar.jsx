
import React from 'react';

export default function SearchSortBar({ searchTerm, setSearchTerm, sortOption, setSortOption, onClear }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white dark:bg-gray-800 shadow rounded-xl mb-6">
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="px-4 py-2 w-full sm:w-1/2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
      />

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <select
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
          className="px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
        >
          <option value="">Sort By</option>
          <option value="rating">⭐ Rating (High → Low)</option>
          <option value="year">📅 Year (New → Old)</option>
        </select>

        <button
          onClick={onClear}
          className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 text-sm"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
