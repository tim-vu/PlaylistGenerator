import React from "react";

import "./SearchBar.css";
import "../../index.css";

import ArrowIcon from "./arrowleft.svg";
import classNames from "classnames";

interface SearchBarProps {
  onQueryChanged: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onQueryChanged }) => {
  const [value, setValue] = React.useState("");

  const onValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChanged(event.target.value);
    setValue(event.target.value);
  };

  const onSearchCancelClicked = () => {
    onQueryChanged("");
    setValue("");
  };

  const cancelSearchButtonClass = classNames("cancel-search-button", {
    hidden: value.length === 0,
  });

  return (
    <div className="searchbar">
      <input
        className="searchbar-input"
        type="text"
        placeholder="Search for Songs"
        maxLength={80}
        value={value}
        onChange={onValueChanged}
      />
      <div className="searchbar-icons">
        <button
          className={cancelSearchButtonClass}
          onClick={onSearchCancelClicked}
        >
          <img src={ArrowIcon} alt="Magnifying glass" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
