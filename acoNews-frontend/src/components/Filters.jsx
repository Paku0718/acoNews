import React from 'react';
import { ChevronDown } from 'lucide-react';

const Filters = ({ onFilterChange, currentQuery, filters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  const FilterSelect = ({ name, options, value }) => (
    <div className="relative inline-block w-full sm:w-auto">
      <select
        id={name}
        name={name}
        onChange={handleChange}
        value={value} // Ensure the selected value is displayed
        className="block w-full sm:w-auto pl-2 pr-8 py-1 text-xs text-gray-700 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <ChevronDown size={12} />
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 py-4 px-6 shadow-sm">
      <div className="flex flex-wrap justify-start items-center gap-2">
        <FilterSelect
          name="category"
          value={filters.category} // Bind selected category value
          options={[
            { value: "", label: "All Categories" },
            { value: "business", label: "Business" },
            { value: "entertainment", label: "Entertainment" },
            { value: "general", label: "General" },
            { value: "health", label: "Health" },
            { value: "science", label: "Science" },
            { value: "sports", label: "Sports" },
            { value: "technology", label: "Technology" },
          ]}
        />
        <FilterSelect
          name="country"
          value={filters.country} // Bind selected country value
          options={[
            { value: "", label: "All Countries" },
            { value: "us", label: "United States" },
            { value: "in", label: "India" },
            { value: "gb", label: "United Kingdom" },
          ]}
        />
        <FilterSelect
          name="lang"
          value={filters.lang} // Bind selected language value
          options={[
            { value: "en", label: "English" },
            { value: "es", label: "Spanish" },
            { value: "fr", label: "French" },
            { value: "de", label: "German" },
          ]}
        />
      </div>
      {/* Current Query Display as a Heading */}
      <div className="flex flex-col items-start py-5">
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-extrabold text-gray-800 mb-2">
          {currentQuery || "Latest"}
        </h2>
        <div className="w-12 sm:w-16 h-1 bg-yellow-300 rounded-full mb-2 sm:mb-1"></div>
      </div>
    </div>
  );
};

export default Filters;
