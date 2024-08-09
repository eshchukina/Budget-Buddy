import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import SideMenu from "./sideMenu/SideMenu";
import Footer from "../components/footer/Footer";
import "./Style.css";
import "../components/dashboard/Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Dashboard from "./dashboard/Dashboard";
import Instruction from "./Instruction/Instruction";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("isDarkMode");
    return storedTheme ? JSON.parse(storedTheme) : true;
  });
  const [accounts, setAccounts] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInstructionOpen, setIsInstructionOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeAccount, setActiveAccount] = useState(null);
  const [isDashboardView, setIsDashboardView] = useState(true);
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const handleDeleteAccount = (account) => {
    const updatedAccounts = accounts.filter((acc) => acc.id !== account.id);
    setAccounts(updatedAccounts);
    setActiveAccount(updatedAccounts.length > 0 ? updatedAccounts[0] : null);
  };

  useEffect(() => {
    if (activeAccount) {
      localStorage.setItem("lastVisitedAccount", activeAccount.id);
    }
  }, [activeAccount]);

  const toggleInstructions = () => {
    if (windowWidth <= 600) {
      setIsInstructionOpen(!isInstructionOpen);
    }
  };

  const moneyBoxTransactions = dataList
    ? dataList.filter((data) => data.tag === "moneyBox")
    : [];

  const currentBalanceMoneyBox = moneyBoxTransactions.reduce(
    (total, item) => total + Math.abs(item.amount),
    0
  );

  return (
    <div className={isDarkMode ? "dark" : "light"}>
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        activeAccount={activeAccount}
        setActiveAccount={setActiveAccount}
        setIsLoggedIn={setIsLoggedIn}
      />

      <FontAwesomeIcon
        className={`instructionButton ${isDashboardView ? "active" : ""} ${
          isDarkMode ? "dark" : "light"
        }`}
        icon={faCircleInfo}
        title="Instructions"
        onClick={() => {
          setIsDashboardView(!isDashboardView);
          toggleInstructions();
        }}
      />

      {!isDashboardView && <Instruction isDarkMode={isDarkMode} />}

      <Dashboard
        isDarkMode={isDarkMode}
        account={activeAccount}
        updateAccountData={updateAccountData}
        setDataList={setDataList}
        dataList={dataList}
        currentBalanceMoneyBox={currentBalanceMoneyBox}
      />

      <Footer isDarkMode={isDarkMode} />

      <SideMenu
        isDarkMode={isDarkMode}
        setActiveAccount={setActiveAccount}
        setAccounts={setAccounts}
        accountList={accounts}
        activeAccount={activeAccount}
        currency={currency}
        handleDeleteAccount={handleDeleteAccount}
        updateAccountCaption={updateAccountCaption}
        closeInstructionView={() => setIsDashboardView(true)}
      />
    </div>
  );
}

export default App;
