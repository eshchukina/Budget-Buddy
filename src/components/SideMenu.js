import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import AccountButton from "./AccountButton";
// import config from './config';

import "./Style.css";
import "./SideMenu.css";

const SideMenu = ({
  isDarkMode,
  setActiveAccount,
  accountList,

  activeAccount,
  currency,
  handleDeleteAccount,
  setAccounts,
  updateAccountCaption,
  onAccountUpdate,
}) => {
  const [newAccount, setNewAccount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAccountId, setEditAccountId] = useState(null);
  const [newCurrency, setNewCurrency] = useState(currency);
  const [fetchedAccountList, setFetchedAccountList] = useState([]);

  useEffect(() => {
    setNewCurrency(currency);
  }, [currency]);

  useEffect(() => {
    fetchAccountList();
  }, [accountList, editAccountId]);

  const fetchAccountList = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headersWithToken = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch("http://192.168.1.30:1323/accounts/", {
        headers: headersWithToken,
      });

      if (response.ok) {
        const data = await response.json();
        setFetchedAccountList(data);
      } else {
        console.log("Failed to fetch account list");
      }
    } catch (error) {
      console.log("Error fetching account list:", error);
    }
  };

  const handleCreateAccount = async () => {
    if (newAccount) {
      try {
        const token = localStorage.getItem("accessToken");
        const headersWithToken = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await fetch("http://192.168.1.30:1323/accounts/", {
          method: "POST",
          mode: "cors",
          headers: headersWithToken,
          body: JSON.stringify({
            name: newAccount,
            currency: newCurrency,
          }),
        });
        if (response.ok) {
          const createdAccount = await response.json();
          setAccounts([...accountList, createdAccount]);
          setNewAccount("");
      
          fetchAccountList();
        } else {
          console.log("Failed to create account");
        }
      } catch (error) {
        console.log("Error creating account:", error);
      }
    }  closeModal();
  };

  const handleEditAccount = async (account) => {
    setActiveAccount(account);
    setEditAccountId(account.id);
    setNewAccount(account.name);
    setNewCurrency(account.currency);
    openModal();
    onAccountUpdate(account);
    updateAccountCaption(account);
  };

  const handleSaveAccount = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headersWithToken = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(
        `http://192.168.1.30:1323/accounts/${editAccountId}`,
        {
          method: "PUT",
          mode: "cors",
          headers: headersWithToken,
          body: JSON.stringify({
            name: newAccount,
            currency: newCurrency,
          }),
        }
      );

      if (response.ok) {
        fetchAccountList();
    
        updateAccountCaption({
          id: editAccountId,
          name: newAccount,
          currency: newCurrency,
        });
      } else {
        console.log("Failed to update account");
      }
    } catch (error) {
      console.log("Error updating account:", error);
    }  closeModal();
  };

  const handleAccountChange = (account) => {
    setActiveAccount(account);
    onAccountUpdate(account);
  };

  const handleDelete = async (account) => {
    try {
      const token = localStorage.getItem("accessToken");
      const headersWithToken = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(
        `http://192.168.1.30:1323/accounts/${account.id}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: headersWithToken,
        }
      );
      if (response.ok) {
        handleDeleteAccount(account);
        if (editAccountId !== null && editAccountId === account.id) {
          setEditAccountId(null);
        }
        fetchAccountList();
      } else {
        console.log("Failed to delete account");
      }
    } catch (error) {
      console.log("Error deleting account:", error);
    }
  };

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

  const openModal = () => {
    setIsModalOpen(true); // Устанавливаем состояние для открытия модального окна
  };

  const closeModal = () => {
    setIsModalOpen(false); // Устанавливаем состояние для закрытия модального окна
  };

  return (
    <div>
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
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="accountButtons">
          <div className="titleList">Your account list:</div>
          <div className="carousel-container">
            {fetchedAccountList.map((account) => (
              <div key={account.id} className="carousel-item">
                <AccountButton
                  key={account.id}
                  isDarkMode={isDarkMode}
                  account={account}
                  activeAccount={activeAccount}
                  handleAccountChange={handleAccountChange}
                  handleEditAccount={handleEditAccount}
                  handleDelete={handleDelete}
                  updateAccountCaption={updateAccountCaption}
                  onAccountUpdate={onAccountUpdate} 
                />
              </div>
            ))}
          </div>{" "}
        </div>

        <div className="share">
          <div className="item" onClick={handleShare}>
            <FontAwesomeIcon icon={faShareNodes} />
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
