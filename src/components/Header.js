import React from "react";

import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';





import './Style.css';

const Header = ({ isDarkMode, toggleTheme }) => {

  const handleThemeToggle = () => {
    toggleTheme();
  };

  // Function to handle theme toggle
 

  return (
    <div className={`header ${isDarkMode ? "dark" : "light"}`}>
      <h1>Budget Buddy</h1>
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
    </div>
  );
};

export default Header;
