import React from "react";

const SearchForm = ({ search, onChange }) => {
  return (
    <div className="form-container">
      <form id="search-form" className="search-form">
        <div className="icon-container">
          <i className="bi bi-search"></i>
        </div>
        <input
          type="text"
          id="searchbar"
          name="searchbar"
          className="form-control"
          placeholder="Search People"
          onChange={onChange}
          value={search}
        />
      </form>
    </div>
  );
};

export default SearchForm;
