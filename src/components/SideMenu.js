import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import AccountButton from "./AccountButton";

import config from '../config';

import "./Style.css";
import "./SideMenu.css";

const SideMenu = ({
  isDarkMode,
  setActiveAccount,
  accountList,
  toggleTheme,
  activeAccount,
  currency,
  handleDeleteAccount,
  setAccounts,
  updateAccountCaption,
  onAccountUpdate,

  isInstructionViewOpen,
  closeInstructionView,
  isLoggedIn
}) => {
  const [newAccount, setNewAccount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAccountId, setEditAccountId] = useState(null);
  const [newCurrency, setNewCurrency] = useState(currency);
  const [fetchedAccountList, setFetchedAccountList] = useState([]);


  // const [accountsAvailable, setAccountsAvailable] = useState(false);
  const [isTokenAvailable, setTokenAvailable] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("accessToken");
    setTokenAvailable(!!token);
  }, []);


  useEffect(() => {
    setFetchedAccountList(fetchedAccountList || []);
  }, [fetchedAccountList]);
   

  useEffect(() => {
    setNewCurrency(currency);
  }, [currency]);

  useEffect(() => {
    fetchAccountList();
  }, [accountList, editAccountId]);



  useEffect(() => {
 
    setFetchedAccountList(fetchedAccountList || []);
  }, [fetchedAccountList]);
  









  
  const fetchAccountList = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headersWithToken = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    
      const response = await fetch(`${config.apiUrl}accounts/`, {
        headers: headersWithToken,
      });

      if (response.ok) {
        const data = await response.json();
        // setFetchedAccountList(data);
        setFetchedAccountList(data || []);
      
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
        const response = await fetch(`${config.apiUrl}accounts/`, {
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
      const response = await fetch(`${config.apiUrl}accounts/${editAccountId}`,
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
    const shouldDelete = window.confirm("Are you sure you want to delete this account?");
    if (shouldDelete) {

    try {
      const token = localStorage.getItem("accessToken");
      const headersWithToken = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(`${config.apiUrl}accounts/${account.id}`,
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
    }}
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
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
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


  
  useEffect(() => {
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal();
    }
  };

    if (isModalOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
  

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isModalOpen]);
  
   

  return (
    <div>
      
      <div className={`sidebar ${isDarkMode ? "dark" : "light"} `} onClick={closeInstructionView}>
     
      {isTokenAvailable  && (
        
        <>  <button
            className={`majorButton ${isDarkMode ? "dark" : "light"}`}
            onClick={openModal}
          >
           <span className="majorButtonBig"> Create new account</span>
           <span className="majorButtonSmall">+ account</span>
          </button>  
        
          </>
        )}
       

        {isModalOpen && (
          <div className="modalWindow">
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
                className={`modalBtn  ${isDarkMode ? "dark" : "light"}`}
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="accountButtons">
       
          <div className="carousel-container">
       
            {fetchedAccountList?.map((account) => (
              
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
            <FontAwesomeIcon icon={faShareNodes} 
            /> <span className="textItem">share</span>
          </div>

          <div className="item" onClick={handleContactUs}>
    <FontAwesomeIcon icon={faEnvelope} /> <span className="textItem">connect with us</span>
  </div>
              
          <div className="item" onClick={handleLogout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />  <span className="textItem">log out</span>
        </div>
     
        </div>
 
         </div>
     

   
     
    </div>
  );
};

export default SideMenu;
