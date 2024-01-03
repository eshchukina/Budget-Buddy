import React from "react";
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
          <span className="currency"> ({account.currency})</span>
        </div>

        <div className="balance1">
          <div className="balanceWord"> Balance:</div>
          <div>
            future{" "}
            <span
              className={`balanceFC ${
                account.futureBalance < 0 ? "minus" : ""
              }`}
            >
              {account.futureBalance}
            </span>
          </div>
          <div>
            current{" "}
            <span
              className={`balanceFC ${
                account.currentBalance < 0 ? "minus" : ""
              }`}
            >
              {account.currentBalance}
            </span>
          </div>
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
      </button>
    </div>
  );
};

export default AccountButton;
