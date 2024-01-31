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
      className="form-input mt-6 mb-12 px-5 py-1.5 rounded-button border-border border-button rounded-md bg-dark  text-light text-sm w-11/12 outline-none"
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Search..."
    />
  );
};

export default Search;
