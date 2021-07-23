import React from "react";

const people = () => {
  return (
    <div className="container main">
      <div className="form-container">
        <form id="search-form" className="search-form">
          <div>
            <i className="bi bi-search"></i>
          </div>
          <input
            type="text"
            id="searchbar"
            name="searchbar"
            className="form-control"
            placeholder="Search People"
          />
        </form>
      </div>
    </div>
  );
};

export default people;
