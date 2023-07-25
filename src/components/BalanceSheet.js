import React from "react";
import "./Style.css";

const BalanceSheet = ({ isDarkMode, futureBalance, currentBalance }) => {
  return (
    <div className={`futureBalance ${isDarkMode ? "dark" : "light"}`}>
      <div>
        <p>Future balance: {futureBalance}</p>
        <p>Current balance: {currentBalance}</p>
      </div>
    </div>
  );
};

export default BalanceSheet;
