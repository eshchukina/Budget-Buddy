import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

import "./Style.css";
import "./SideMenu.css";

const AccountButton = ({ isDarkMode, account, activeAccount, handleAccountChange, handleEditAccount, handleDelete }) => {
  const formatAccountName = (name) => {
    return name.length > 9 ? `${name.substring(0, 9)}...` : name;
  };

  return (
    <div key={account.id} className="accountButtonContainer">
      <button
        className={`accountButton ${isDarkMode ? "dark" : "light"} ${account === activeAccount ? "active" : ""}`}
        onClick={() => handleAccountChange(account)}
      >
        {formatAccountName(account.name)} ({account.currency}) 
      </button>

      <div className="accountButtonActions">
        <FontAwesomeIcon
          icon={faPencilAlt}
          className={`editButton ${isDarkMode ? "dark" : "light"}`}
          onClick={() => handleEditAccount(account)}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={`deleteButton ${isDarkMode ? "dark" : "light"}`}
          onClick={() => handleDelete(account)}
        /> 
      </div>
    </div>
  );
};

export default AccountButton;