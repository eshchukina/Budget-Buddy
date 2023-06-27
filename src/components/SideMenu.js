import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
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
  const [fetchedAccountList, setFetchedAccountList] = useState([]);


  

  

  const formatAccountName = (name) => {
    return name.length > 10 ? `${name.substring(0, 11)}...` : name;
  };

  useEffect(() => {
    setNewCurrency(currency);
  }, [currency]);

  useEffect(() => {
    fetchAccountList();
  }, [accountList, editAccountId]);

  const fetchAccountList = async () => {
    try {
      const response = await fetch("http://192.168.1.30:1323/accounts/");
      const data = await response.json();
      setFetchedAccountList(data);
    } catch (error) {
      console.log("Error fetching account list:", error);
    }
  };

  const handleCreateAccount = async () => {
    if (newAccount) {
      try {
        const response = await fetch("http://192.168.1.30:1323/accounts/", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newAccount,
            currency: newCurrency,
          }),
        });
        if (response.ok) {
          const createdAccount = await response.json();
          setAccounts([...accountList, createdAccount]);
          setNewAccount("");
          closeModal();
          fetchAccountList();
        } else {
          console.log("Failed to create account");
        }
      } catch (error) {
        console.log("Error creating account:", error);
      }
    }
  };

  const handleEditAccount = async (account) => {
    setActiveAccount(account);
    setEditAccountId(account.id);
    setNewAccount(account.name);
    setNewCurrency(account.currency);
    openModal();
    updateAccountCaption(account);
  };

  const handleSaveAccount = async () => {
    try {
      const response = await fetch(`http://192.168.1.30:1323/accounts/${editAccountId}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newAccount,
          currency: newCurrency,
        }),
      });

      if (response.ok) {
        fetchAccountList();
        closeModal();
      } else {
        console.log("Failed to update account");
      }
    } catch (error) {
      console.log("Error updating account:", error);
    }
  };

  const handleAccountChange = (account) => {
    setActiveAccount(account);
    setEditAccountId(null);
  };

  const handleDelete = async (account) => {
    try {
      const response = await fetch(`http://192.168.1.30:1323/accounts/${account.id}`, {
        method: "DELETE",
        mode: "cors",
      });
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
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
    <div className={`sidebar ${isDarkMode ? "dark" : "light"}`}>
      <button className={`majorButton ${isDarkMode ? "dark" : "light"}`} onClick={openModal}>
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
            <select value={newCurrency} onChange={(e) => setNewCurrency(e.target.value)}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
            {editAccountId ? (
              <button className={`modalBtn ${isDarkMode ? "dark" : "light"}`} onClick={handleSaveAccount}>
                Save
              </button>
            ) : (
              <button className={`modalBtn ${isDarkMode ? "dark" : "light"}`} onClick={handleCreateAccount}>
                Add
              </button>
            )}
            <button className={`modalBtn ${isDarkMode ? "dark" : "light"}`} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className="accountButtons">
        <div className="titleList">Your account list:</div>
        {fetchedAccountList.map((account) => (
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
      <div className="share">
<div class="item" onClick={handleShare}>
<FontAwesomeIcon icon={faShareNodes} /></div>
<div class="item">
<FontAwesomeIcon icon={faEnvelope} /></div>
</div>

    </div>
  );
};

export default SideMenu;
