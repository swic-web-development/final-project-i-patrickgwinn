import React from 'react'

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search pokemon..."
        value={searchTerm}
        onChange={onSearchChange}
        className="search-input"
      />
    </div>
  )
}

export default SearchBar
