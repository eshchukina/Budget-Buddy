import React, { useState, useEffect } from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import "./Style.css";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import Instruction from "./Instruction";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("isDarkMode");
    return storedTheme ? JSON.parse(storedTheme) : false;
  });
  const [accounts, setAccounts] = useState([]);
  const [currency, setCurrency] = useState("USD");
  // const [activeAccount, setActiveAccount] = useState(
  //   accounts.length > 0 ? accounts[0] : null 
  // );

  const setActiveModal = (modal) => {};

  const headersWithToken = {};


// Inside the App component
// const [activeAccount, setActiveAccount] = useState(() => {
//   const lastVisitedAccountId = localStorage.getItem("lastVisitedAccount");
//   return accounts.find((account) => account.id === parseInt(lastVisitedAccountId)) || null;
// });

const [activeAccount, setActiveAccount] = useState(null);



  
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };



 




  const onAccountUpdate = (account) => {};

  const createAccount = (newAccount, currency) => {
    const account = {
      name: newAccount,
      id: accounts.length + 1,
      submittedDataList: [],
      currency: currency,
    };
    setAccounts([...accounts, account]);
    setActiveAccount(account);
  };

  const updateAccountData = (accountId, newData) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === accountId
          ? { ...account, submittedDataList: [...newData] }
          : account
      )
    );
  };
  const updateAccountCaption = (account) => {
    setActiveAccount((prevActiveAccount) =>
      prevActiveAccount.id === account.id
        ? { ...prevActiveAccount, ...account }
        : prevActiveAccount
    );

    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) =>
        acc.id === account.id ? { ...acc, ...account } : acc
      )
    );
  };
  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleDeleteAccount = (account) => {
    const updatedAccounts = accounts.filter((acc) => acc.id !== account.id);
    setAccounts(updatedAccounts);
    setActiveAccount(updatedAccounts.length > 0 ? updatedAccounts[0] : null);
  };

  const handleDelete = (accountId, id) => {
    const updatedDataList = accounts
      .find((account) => account.id === accountId)
      .submittedDataList.filter((data) => data.id !== id);
    updateAccountData(accountId, updatedDataList);
  };



  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiresIn");
  
  
   
    window.location.reload();
  };





useEffect(() => {
  if (activeAccount) {
    localStorage.setItem("lastVisitedAccount", activeAccount.id);
  }
}, [activeAccount]);



const [isDashboardView, setIsDashboardView] = useState(true); 


const toggleInstructions = () => {


  const hiddenContent = document.querySelector('.sidebar'); 

if (window.innerWidth <= 600) {
      if (hiddenContent.style.display === 'none') {
        hiddenContent.style.display = 'flex'; 
      } else {
        hiddenContent.style.display = 'none'; 
      }
    }
};


  return (
    <div className={isDarkMode ? "dark" : "light"}>







<Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        handleLogout={handleLogout}

        activeModal={null} 
        setActiveModal={() => {}} 
        activeAccount={activeAccount}
        setActiveAccount={setActiveAccount}
     
      />
      
      <FontAwesomeIcon
  className={`instructionButton ${isDashboardView ? "active" : ""} ${isDarkMode ? "dark" : "light"}`}
  icon={faCircleInfo}
  title="Instructions"
  onClick={() => {
    setIsDashboardView(!isDashboardView);
    toggleInstructions();
  }}
/>

{!isDashboardView && <Instruction isDarkMode={isDarkMode} />}
      
      {
  isDashboardView  ? (
    activeAccount? (
      <Dashboard
          isDarkMode={isDarkMode}
          account={activeAccount}
          updateAccountData={updateAccountData}
          currency={currency}
          handleDelete={handleDelete}
          submittedDataList={activeAccount.submittedDataList}
          headersWithToken={headersWithToken}
          setActiveAccount={setActiveAccount}
          updateAccountCaption={updateAccountCaption}
          handleCurrencyChange={handleCurrencyChange}
        

          
          createAccount={createAccount}
        
          setAccounts={setAccounts}
          accountList={accounts}
          activeAccount={activeAccount}
        
     
          handleDeleteAccount={handleDeleteAccount}
       
          setActiveModal={setActiveModal}
          onAccountUpdate={onAccountUpdate}
        
        /> 
      



        
      ) 
      
      
      
      : (
    
      
      <Instruction isDarkMode={isDarkMode} />

          
       
      )
      
      
      ) : (
      
        <div></div>
      )
    }

      
  <SideMenu
  isDarkMode={isDarkMode}
  createAccount={createAccount}
  setActiveAccount={setActiveAccount}
  setAccounts={setAccounts}
  accountList={accounts}
  activeAccount={activeAccount}
  currency={currency}
  handleCurrencyChange={handleCurrencyChange}
  handleDeleteAccount={handleDeleteAccount}
  updateAccountCaption={updateAccountCaption}
  onAccountUpdate={onAccountUpdate}
  handleLogout={handleLogout}


  isInstructionViewOpen={!isDashboardView}
  closeInstructionView={() => setIsDashboardView(true)}

/>


      <Footer isDarkMode={isDarkMode} />
     


    </div>
  );
}

export default App;
