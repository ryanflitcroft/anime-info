import React, { useState } from 'react';

export default function SearchBar({ setSearch }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    // setSearchInput('');
  };

  return (
    <>
      <form
        aria-label="search Kitsu for anime by title name or title"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Search Anime:</label>
        <input
          type="text"
          name="name"
          placeholder="name/title"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          required
        />
        <button>Search</button>
      </form>
    </>
  );
}
