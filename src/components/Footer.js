import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import "./Style.css";
import "./SideMenu.css";
import "./Footer.css";

const Footer = ({ isDarkMode, toggleTheme }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Share App",
          url: window.location.href,
        })
        .then(() => console.log("successfully"))
        .catch((error) => console.log("Error:", error));
    } else {
      console.log("Not supported in your browser");
    }
  };

  return (
    <div className={`footer ${isDarkMode ? "dark" : "light"}`}>
      <div className={`shareFooter ${isDarkMode ? "dark" : "light"}`}>
        <div
          className={`itemFooter ${isDarkMode ? "dark" : "light"}`}
          onClick={handleShare}
        >
          <FontAwesomeIcon icon={faShareNodes} />
        </div>
        <div className={`itemFooter ${isDarkMode ? "dark" : "light"}`}>
          <FontAwesomeIcon icon={faEnvelope} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
