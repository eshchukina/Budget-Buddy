import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import "./Style.css";
import "./Header.css";
const BurgerButton = ({ isMenuOpen, handleToggleMenu, isDarkMode }) => {
  return (
    <div
      className={`burger ${isMenuOpen ? "open" : ""} ${
        isDarkMode ? "dark" : "light"
      }`}
      onClick={handleToggleMenu}
    >
      <FontAwesomeIcon icon={faBars} />
    </div>
  );
};

export default BurgerButton;
