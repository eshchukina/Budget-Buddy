import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import SideMenu from "./sideMenu/SideMenu";
import "./Style.css";
import "../components/dashboard/Dashboard.css";

import Dashboard from "./dashboard/Dashboard";
import Instruction from "./Instruction/Instruction";
import config from "../config";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("isDarkMode");
    return storedTheme ? JSON.parse(storedTheme) : true;
  });
  const [accounts, setAccounts] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [activeAccount, setActiveAccount] = useState(null);
  const [dataList, setDataList] = useState([]);
  const [fetchedAccountList, setFetchedAccountList] = useState([]);
  const [isTokenAvailable, setTokenAvailable] = useState(false);
  const [isModalOpenAccount, setIsModalOpenAccount] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);

  useEffect(() => {
    if (fetchedAccountList.length > 0) {
      setActiveAccount(fetchedAccountList[0]);
    }
  }, [fetchedAccountList]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setTokenAvailable(!!token);
  }, []);

  useEffect(() => {
    setFetchedAccountList(fetchedAccountList || []);
  }, [fetchedAccountList]);

  useEffect(() => {
    fetchAccountList();
  }, []);

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

      const response = await fetch(`${config.apiUrl}accounts`, {
        headers: headersWithToken,
      });

      if (response.ok) {
        const data = await response.json();
        setFetchedAccountList(data || []);
      } else {
        console.log("Failed to fetch account list");
      }
    } catch (error) {
      console.log("Error fetching account list:", error);
    }
  };

  const openModalAccount = () => {
    setIsModalOpenAccount(true);
  };

  const closeModalAccount = () => {
    setIsModalOpenAccount(false);
  };

  const handleAccountChange = (account) => {
    setActiveAccount(account);
  };

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

  useEffect(() => {
    if (activeAccount) {
      localStorage.setItem("lastVisitedAccount", activeAccount.id);
    }
  }, [activeAccount]);

  const moneyBoxTransactions = dataList
    ? dataList.filter((data) => data.tag === "moneyBox")
    : [];

  const currentBalanceMoneyBox = moneyBoxTransactions.reduce(
    (total, item) => total + Math.abs(item.amount),
    0
  );

  const handleToggleView = () => {
    setShowDashboard((prev) => !prev);
  };

  return (
    <div className={isDarkMode ? "dark" : "light"}>
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        activeAccount={activeAccount}
        setActiveAccount={setActiveAccount}
      />
      <SideMenu
        isDarkMode={isDarkMode}
        handleToggleView={handleToggleView}
        toggleTheme={toggleTheme}
      />

      {!isTokenAvailable ? (
        <Instruction isDarkMode={isDarkMode} />
      ) : showDashboard ? (
        <Dashboard
          isDarkMode={isDarkMode}
          currency={currency}
          updateAccountData={updateAccountData}
          setDataList={setDataList}
          dataList={dataList}
          currentBalanceMoneyBox={currentBalanceMoneyBox}
          activeAccount={activeAccount}
          handleAccountChange={handleAccountChange}
          accountList={accounts}
          fetchedAccountList={fetchedAccountList}
          updateAccountCaption={updateAccountCaption}
          setAccounts={setAccounts}
          closeModalAccount={closeModalAccount}
          isModalOpenAccount={isModalOpenAccount}
          openModalAccount={openModalAccount}
          setActiveAccount={setActiveAccount}
          fetchAccountList={fetchAccountList}
        />
      ) : (
        <Instruction isDarkMode={isDarkMode} />
      )}
    </div>
  );
}

export default App;
