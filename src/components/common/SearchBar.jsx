import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ placeholder, onSearch, initialValue = "" }) => {
  const [term, setTerm] = useState(initialValue);

  const handleChange = (e) => {
    const newTerm = e.target.value;
    setTerm(newTerm);
    if (onSearch) {
      onSearch(newTerm);
    }
  };

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        value={term}
        onChange={handleChange}
        className="w-full h-8 py-2 pl-10 pr-4 font-lato text-14px text-primary-gray-dark 
                   bg-[#E8E8E8] rounded-md focus:ring-1 focus:ring-primary-blue 
                   focus:bg-white outline-none placeholder-primary-gray-medium"
      />
      <FiSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-gray-medium"
        size={16}
      />
    </div>
  );
};

export default SearchBar;
