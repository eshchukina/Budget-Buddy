import React, { useEffect } from "react";

const AccountModal = ({
  isDarkMode,
  isModalOpenAccount,
  newAccount,
  setNewAccount,
  newCurrency,
  setNewCurrency,
  editAccountId,
  handleSaveAccount,
  handleCreateAccount,
  closeModalAccount,
}) => {

  
  useEffect(() => {
    setNewAccount("");

  }, [isModalOpenAccount]);

  return (
    isModalOpenAccount && (
      <div className="modalWindow">
        <div className={`modalContent ${isDarkMode ? "dark" : "light"}`}>
          <h3>Enter the data</h3>
          <input
            maxLength={10}
            type="text"
            value={newAccount}
            onChange={(e) => setNewAccount(e.target.value)}
            placeholder="Account Name"
          />
          <select
            value={newCurrency}
            onChange={(e) => setNewCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="GEL">GEL</option>
            <option value="TRY">TRY</option>
            <option value="RUB">RUB</option>
          </select>
          {editAccountId ? (
            <button
              className={`modalBtn ${isDarkMode ? "dark" : "light"}`}
              onClick={handleSaveAccount}
            >
              Save
            </button>
          ) : (
            <button
              className={`modalBtn ${isDarkMode ? "dark" : "light"}`}
              onClick={handleCreateAccount}
            >
              Add
            </button>
          )}
          <button
            className={`modalBtn ${isDarkMode ? "dark" : "light"}`}
            onClick={closeModalAccount}
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default AccountModal;
