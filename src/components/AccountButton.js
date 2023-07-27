import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./Style.css";
import "./SideMenu.css";

const AccountButton = ({
  isDarkMode,
  account,
  activeAccount,
  handleAccountChange,
  handleEditAccount,
  handleDelete,
}) => {
  const formatAccountName = (name) => {
    return name.length > 10 ? `${name.substring(0, 8)}...` : name;
  };

  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div key={account.id} className="accountButtonContainer">
      <button
        className={`accountButton ${isDarkMode ? "dark" : "light"} ${
          account === activeAccount ? "active" : ""
        }`}
        onClick={() => handleAccountChange(account)}
      >
        <div className="label">
          {formatAccountName(account.name)}
          <span className="currency"> {account.currency}</span>{" "}
        </div>

        <div className="balance">
          <div className="balanceWord"> Balance:</div>
          <div>future {account.futureBalance}</div>
          <div>current {account.currentBalance}</div>
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

        {showDetails && (
          <div className="balance1">
            <div className="balanceWord"> Balance:</div>
            <div>future {account.futureBalance}</div>
            <div>current {account.currentBalance}</div>
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
        )}
        <div
          className={`detailsButton majorButton ${
            isDarkMode ? "dark" : "light"
          }`}
          onClick={handleToggleDetails}
        >
          detail
        </div>
      </button>
    </div>
  );
};

export default AccountButton;
