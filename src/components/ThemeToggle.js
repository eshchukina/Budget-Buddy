import React from "react";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from '@fortawesome/free-solid-svg-icons';
import "./Style.css";
import "./Header.css";

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <button
      className={`buttonTheme ${isDarkMode ? "dark" : "light"}`}
      onClick={handleThemeToggle}
    >
      {isDarkMode ? (
        <FontAwesomeIcon icon={faMoon} />
      ) : (
        <FontAwesomeIcon icon={faSun}  />
      )}
    </button>
  );
};

export default ThemeToggle;
