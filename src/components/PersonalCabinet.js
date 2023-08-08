import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import "./PersonalCabinet.css";


const PersonalCabinet = ({  name, email, onClose, isDarkMode }) => {
  return (
    <div className= {`personal-cabinet ${isDarkMode ? "dark" : "light"}`}>
            <button className= {`buttonCabCross ${isDarkMode ? "dark" : "light"}`} onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
     

      <div className="cat-container">
      <div className="cat">
        <div className="cat-eye left-eye"></div>
        <div className="cat-eye right-eye"></div>
        <div className="cat-mouth"></div>
        <div className="cat-nose"></div>
        <div className="cat-tongue"></div>
        <div className="cat-head"></div>
      </div>
    </div>
      <div className="user-details">
        <h3>{name}</h3>
        <p>{email}</p>
     
      </div>
    </div>
  );
};

export default PersonalCabinet;
