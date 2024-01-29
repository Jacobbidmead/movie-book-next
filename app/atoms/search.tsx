"use client";

import React, { useState, useEffect } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(inputValue);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(delayDebounce);
  }, [inputValue, onSearch]);

  return (
    <input
      className="form-input mb-2 px-2 py-1 border rounded-xl text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-transparent w-52"
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Search..."
    />
  );
};

export default Search;
