import React, { useState, useEffect } from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import "./Style.css";

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


  return (
    <div className={isDarkMode ? "dark" : "light"}>
   
            {activeAccount ? (
              <div>
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
        </div>
      ) 
      
      
      
      : (
        <div className={`mainField ${isDarkMode ? "dark" : "light"}`}>
          <div className={`text ${isDarkMode ? "dark" : "light"}`}>
            Budget Buddy is your reliable companion for efficient financial
            management! No matter where you're heading or in which currency you
            conduct your transactions, our application provides you with all the
            necessary tools to control and plan your finances. With Budget
            Buddy, you can create multiple accounts with different currencies
            that reflect your financial flows. For example, you can have an
            account for regular expenses in your local currency, as well as
            accounts for vacations or foreign investments in another currency.
            This allows you to accurately track your expenses and income for
            each account
          </div>
        </div>
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

/>

<Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        handleLogout={handleLogout}

        activeModal={null} 
        setActiveModal={() => {}} 
        activeAccount={activeAccount}
        setActiveAccount={setActiveAccount}
     
      />
      
      <Footer isDarkMode={isDarkMode} />
     


    </div>
  );
}

export default App;
