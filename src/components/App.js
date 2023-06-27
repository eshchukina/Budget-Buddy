import React, { useState } from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import AccountList from "./AccountList";
import "./Style.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [activeAccount, setActiveAccount] = useState(
    accounts.length > 0 ? accounts[0] : null
  );
  const [currency, setCurrency] = useState("USD");

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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

  return (
    <div>
      
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
        updateAccountCaption={updateAccountCaption} // Передача функции updateAccountCaption
      />

      {activeAccount ? (
        <AccountList
          isDarkMode={isDarkMode}
          account={activeAccount}
          updateAccountData={updateAccountData}
          currency={currency}
          handleDelete={handleDelete}
          submittedDataList={activeAccount.submittedDataList}
          
        />
      ) : (
        <div className={`mainField ${isDarkMode ? "dark" : "light"}`}>
          <div className={`text ${isDarkMode ? "dark" : "light"}`}>Budget Buddy is your reliable companion for efficient financial 
          management! No matter where you're heading or in which currency 
          you conduct your transactions, our application provides you with 
        all the necessary tools to control and plan your finances.
        
         With Budget Buddy, you can create multiple accounts with different currencies 
         that reflect your financial flows. For example, you can have an account for
          regular expenses in your local currency, as well as accounts for vacations
          or foreign investments in another currency. This allows you to accurately 
         track your expenses and income for each account.
        </div></div>
      )}
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;
