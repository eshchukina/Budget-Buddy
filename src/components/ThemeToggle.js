import React from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './Style.css';
import './Header.css';

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
        <FontAwesomeIcon icon={faMoon} style={{ color: "#bc881b" }} />
      ) : (
        <FontAwesomeIcon icon={faSun} style={{ color: "#bc881b" }} />
      )}
    </button>
  );
};

export default ThemeToggle;
