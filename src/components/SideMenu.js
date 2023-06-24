import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
 import "./Style.css";

const SideMenu = ({
  isDarkMode,
  createAccount,
  setActiveAccount,
  accountList,
  activeAccount,
  currency,
  handleCurrencyChange,
  handleDeleteAccount,
  setAccounts,
  updateAccountCaption,
}) => {
  const [newAccount, setNewAccount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAccountId, setEditAccountId] = useState(null);
  const [newCurrency, setNewCurrency] = useState(currency);
  const [isAccountListVisible, setIsAccountListVisible] = useState(false);
  const [fetchedAccountList, setFetchedAccountList] = useState([]);

  const formatAccountName = (name) => {
    return name.length > 10 ? `${name.substring(0, 11)}...` : name;
  };

  

  useEffect(() => {
    setNewCurrency(currency);
  }, [currency]);

  useEffect(() => {
    setIsAccountListVisible(accountList.length > 0);
  }, [accountList]);

  useEffect(() => {
    fetchAccountList();
  }, []);

  const fetchAccountList = async () => {
    try {
      const response = await fetch("http://192.168.1.30:1323/accounts/2");
      const data = await response.json();
      setFetchedAccountList(data);
    } catch (error) {
      console.log("Error fetching account list:", error);
    }
  };


  const handleCreateAccount = () => {
    if (newAccount) {
      if (editAccountId !== null) {
        // Update existing account
        const updatedAccounts = accountList.map((account) => {
          if (account.id === editAccountId) {
            return { ...account, name: newAccount, currency: newCurrency };
          }
          return account;
        });
        setAccounts(updatedAccounts);
        setEditAccountId(null);
      } else {
        // Create new account
        createAccount(newAccount, newCurrency);
        setEditAccountId(null);
      }
      setNewAccount("");
      closeModal();
    }
  };

  const handleEditAccount = (account) => {
    setNewAccount(account.name);
    setNewCurrency(account.currency);
    setEditAccountId(account.id);
    openModal();
    updateAccountCaption(account); // Обновление заголовка таблицы

  };

  const handleAccountChange = (account) => {
    setActiveAccount(account);
    setEditAccountId(null);
  };

  const handleDelete = (account) => {
    handleDeleteAccount(account);
    if (editAccountId !== null && editAccountId === account.id) {
      setEditAccountId(null);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`sidebar ${isDarkMode ? "dark" : "light"}`}>
      <button
        className={`majorButton ${isDarkMode ? "dark" : "light"}`}
        onClick={openModal}
      >
        Create new account
      </button>
  
      {isModalOpen && (
        <div className="modal">
          <div className={`modalContent ${isDarkMode ? "dark" : "light"}`}>
            <h3>Enter the data</h3>
            <input
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
            </select>
            <button className={`modalBtn ${isDarkMode ? "dark" : "light"}`} onClick={handleCreateAccount}>
              Add
            </button>
            <button className={`modalBtn ${isDarkMode ? "dark" : "light"}`} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
  
      {isAccountListVisible && (
        
        <div className="accountButtons">
          <div className="titleList">Your account list:</div>
          {accountList.map((account) => (
            <div key={account.id} className="accountButtonContainer">
              <button
                className={`accountButton ${isDarkMode ? "dark" : "light"} ${
                  account === activeAccount ? "active" : ""
                }`}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default SideMenu; 