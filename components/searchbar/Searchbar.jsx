import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

const Searchbar = ({ placeholder, handleChange, value }) => {
  return (
      <div className="searchbar-wrapper">
        <form className="searchbar-form">
            <div className="icon-container">
            <MagnifyingGlassIcon  className="icon"/>
            </div>
          <input
            onChange={(e) => handleChange(e)}
            type="search"
            name="search"
            id="search"
            placeholder={placeholder}
            className="input-field"
            value={value}
          />
        </form>
      </div>
  );
};

export default Searchbar;
