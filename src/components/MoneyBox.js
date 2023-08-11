import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import "./MoneyBox.css"; // You can create your own CSS file for styling

const MoneyBox = (  {isDarkMode} ) => {
  const progress = (10 / 10) * 10;
  const remaining = 500;

  const currentBalance = 100

  return (

    <div className={`moneyBox ${isDarkMode ? "dark" : "light"}`}>
 
      <p>Money Box
      <FontAwesomeIcon
            icon={faPiggyBank}
            className="logoMoneyBox"
         
          /></p>  
      <div className="progressContainer">
        <div className="progressBar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="infoMoneyBox">
       
      <p>{`$${currentBalance.toFixed(2)} saved`}</p>
        <p>{`$${remaining.toFixed(2)} remaining`}</p>
      </div>
    </div>
  );
};

export default MoneyBox;
