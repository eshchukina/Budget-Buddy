import React from "react";
import PropTypes from "prop-types";
import "../sideMenu/SideMenu.css";

const MainButton = ({ isDarkMode, onClick, buttonText }) => {
  return (
    <button
      className={`majorButton ${isDarkMode ? "dark" : "light"}`}
      onClick={onClick}
    >
      <span className="majorButtonBig">{buttonText}</span>
    </button>
  );
};

MainButton.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default MainButton;
