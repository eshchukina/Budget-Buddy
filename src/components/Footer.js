import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';


import "./Style.css";
import "./SideMenu.css";
import "./Footer.css";

const Footer = ({ isDarkMode }) => {
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

   
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}`;

 
    window.open(mailtoLink, "_blank");
  };

  

  return (
    <div className={`footer ${isDarkMode ? "dark" : "light"}`}>
      <div className={`shareFooter ${isDarkMode ? "dark" : "light"}`}>
  
      


     
    
          <div className="item" onClick={handleShare}>
            <FontAwesomeIcon icon={faShareNodes} /> <span className="textItem"></span>
          </div>

          <div className="item" onClick={handleContactUs}>
    <FontAwesomeIcon icon={faEnvelope} /> <span className="textItem"></span>
  </div>
              
          <div className="item" onClick={handleLogout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />  <span className="textItem"></span>
        </div>
     



      </div>
    </div>
  );
};

export default Footer;
