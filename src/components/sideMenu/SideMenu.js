import React from "react";
import Button from "../buttons/Button";
import {
  faEnvelope,
  faCircleInfo,
  faPaperclip,
  faArrowRightFromBracket,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "../buttons/ThemeToggle";
import "../Style.css";
import "./SideMenu.css";

const SideMenu = ({ isDarkMode, handleToggleView, toggleTheme }) => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("expiresIn");
    window.location.reload();
  };

  const handleContactUs = () => {
    const emailSubject = "Contact Us Inquiry";
    const emailAddress = "frankkat377@gmail.com";
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
      emailSubject
    )}`;

    window.open(mailtoLink, "_blank");
  };

  const handleButtonClick = () => {
    window.location.href =
      "https://www.freeprivacypolicy.com/live/d875faef-4508-457b-aabc-79905cae1581";
  };

  return (
    <div>
      <div className={`sidebar ${isDarkMode ? "dark" : "light"} `}>
        <div className={`one ${isDarkMode ? "dark" : "light"}`}></div>
        <div className="buttonContainer">
          <div className="button">
            <Button
              text="info"
              onClick={handleToggleView}
              icon={faCircleInfo}
              iconColor="#ffcd38"
            />
          </div>
          <div className="button">
            <Button
              text="сontact us"
              onClick={handleContactUs}
              icon={faEnvelope}
              iconColor="#ffcd38"
            />
          </div>

          <div className="button">
            <Button
              text="politic privacy"
              onClick={handleButtonClick}
              icon={faPaperclip}
              iconColor="#ffcd38"
            />
          </div>

          <div className="button">
            <Button
              text="our app"
              onClick={handleLogout}
              icon={faMobile}
              iconColor="#e96e94"
            />
          </div>
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          <div className="button">
            <Button
              text="exit"
              onClick={handleLogout}
              icon={faArrowRightFromBracket}
              iconColor="#ffcd38"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
