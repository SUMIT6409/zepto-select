import { useEffect, useRef, useState } from "react";
import * as React from "react";

// drop component
const Icon = ({ isOpen }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="#222"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={isOpen ? "translate" : ""}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};
// user icon
const UserIcon = () => {
  return (
    <svg
      className="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
      style={{ width: "20px" }}
    >
      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
    </svg>
  );
};
// Close component
const CloseIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      stroke="#fff"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
};

// Select Scratch component
interface SelectProps {
  options: any;
  placeHolder: string;
  isSearchable: boolean;
  isMulti: boolean;
}
const SelectScratch = ({
  options,
  placeHolder,
  isSearchable,
  isMulti,
}: SelectProps) => {
  // State variables
  const [showMenu, setShowMenu] = useState<boolean>(false); // for changing visibility of dropdown
  const [searchValue, setSearchValue] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null); // Reference hook to the search input element
  const inputRef = useRef<HTMLInputElement>(null); // Reference hook to the select scratch input element
  const [selectedValue, setSelectedValue] = useState<any>(isMulti ? [] : null); // selected value array
  const [backspace, setBackspace] = useState<string>("normal");
  const [lastOption, setLastOption] = useState<any>({});

  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  const handleMenuOpen = () => {
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return placeHolder;
    }
    if (isMulti) {
      return (
        <div className="dropdown-tags">
          {selectedValue.map((option: any, index: any) => (
            <div
              key={`${option.value}-${index}`}
              style={{
                backgroundColor:
                  backspace === "highlight" && lastOption.value === option.value
                    ? "#add8e6"
                    : "#0d839f",
              }}
              className="dropdown-tag-item"
            >
              <UserIcon /> &nbsp; &nbsp;
              {option.label}
              <span
                onClick={(e) => onTagRemove(e, option)}
                className="dropdown-tag-close"
              >
                <CloseIcon />
              </span>
            </div>
          ))}
        </div>
      );
    }
    return selectedValue.label;
  };

  const removeOption = (option) => {
    return selectedValue.filter((o: any) => o.value !== option.value);
  };

  const onTagRemove = (e: any, option: any) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
  };
  const onItemClick = (option) => {
    console.log("option value", option.value);
    // setLastOption(option);
    let newValue: any;
    if (isMulti) {
      if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
  };

  const isSelected = (option) => {
    if (isMulti) {
      return selectedValue.filter((o) => o.value === option.value).length > 0;
    }

    if (!selectedValue) {
      return false;
    }

    return selectedValue.value === option.value;
  };

  const onSearch = (e: any) => {
    setSearchValue(e.target.value);
  };
  const onBackspace = (e) => {
    if (e.code === "Backspace") {
      if (backspace === "normal") {
        setLastOption(selectedValue[selectedValue.length - 1]);
        setBackspace("highlight");
      } else {
        onTagRemove(e, lastOption);
        setBackspace("normal");
      }
    }
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }

    return options.filter(
      (option) =>
        option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );
  };

  return (
    <div className="custom--dropdown-container">
      <div
        ref={inputRef}
        className="dropdown-input"
        data-testid="test-drop"
        onClick={handleMenuOpen}
      >
        <div
          className={`dropdown-selected-value ${
            !selectedValue || selectedValue.length === 0 ? "placeholder" : ""
          }`}
        >
          {getDisplay()}
        </div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
            <div>
              <Icon isOpen={showMenu} />
            </div>
          </div>
        </div>
      </div>
      {showMenu && (
        <div className={`dropdown-menu alignment--auto`}>
          {isSearchable && (
            <div className="search-box">
              <input
                className="form-control"
                onChange={onSearch}
                value={searchValue}
                ref={searchRef}
                onKeyUp={onBackspace}
              />
            </div>
          )}
          {getOptions().map(
            (option: any) =>
              !isSelected(option) && (
                <div key={option.value}>
                  <div
                    onClick={() => onItemClick(option)}
                    key={option.value}
                    className={`dropdown-item ${
                      isSelected(option) && "selected"
                    }`}
                  >
                    <UserIcon />
                    {`  ${option.label}`}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default SelectScratch;
