"use client";

import { Filter } from "lucide-react";
import { useState } from "react";

interface FilterSidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showApproved: boolean;
  setShowApproved: (approved: boolean) => void;
}

export default function FilterTopBar({
  searchQuery,
  setSearchQuery,
  showApproved,
  setShowApproved,
}: FilterSidebarProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleApprovedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowApproved(event.target.checked);
  };

  return (
    <div className="w-full mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white my-0">
            Search
          </h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Filter size={20} />
          </button>
        </div>

        <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
          <div className="mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showApproved}
                onChange={handleApprovedChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Show Approved Only
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
