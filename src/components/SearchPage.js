import React, { useState, useEffect, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Style.css";
import "./Header.css";

const SearchPage = () => {
  const [searchWord, setSearchWord] = useState("");
  const [foundElements, setFoundElements] = useState([]);
  const inputRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchWord(e.target.value);
  };

  const handleSearch = () => {
    if (searchWord.trim() === "") {
      return;
    }

    const allElements = document.querySelectorAll("*");
    const foundElements = [];

    const searchWordLowerCase = searchWord.toLowerCase();

    allElements.forEach((element) => {
      if (
        element.innerText &&
        element.innerText.toLowerCase().includes(searchWordLowerCase)
      ) {
        highlightElement(element);
        foundElements.push(element);
      }
    });
    setFoundElements(foundElements);
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const highlightElement = (element) => {
    element.style.color = "#e96e94";
  };

  const removeHighlight = useCallback(() => {
    foundElements.forEach((element) => {
      element.style.color = "";
    });
    setFoundElements([]);
  }, [foundElements]);

  const handleDocumentClick = useCallback(
    (event) => {
      const isSearchContainer = event.target.closest(".searchContainer");
      if (!isSearchContainer) {
        removeHighlight();
        setSearchWord("");
      }
    },
    [removeHighlight]
  );

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [handleDocumentClick]);

  return (
    <div>
      <div className="searchContainer">
        <div className="inputContainer">
          <input
            type="text"
            className="searchInput"
            value={searchWord}
            onChange={handleSearchChange}
            onKeyDown={handleEnterPress}
            ref={inputRef}
            placeholder="search"
          />
          <button className="searchButton" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} title="search" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
