import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";

import "./MoneyBox.css";
import "./Style.css";
import "./Dashboard.css";

const MoneyBox = ({
  isDarkMode,
  currentBalanceMoneyBox,
  moneyBoxPositiveAmounts,
  moneyBoxNegativeAmounts,
}) => {
  const [remainingValue, setRemainingValue] = useState(500);
  const [editingRemaining, setEditingRemaining] = useState(false);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const newProgress = (currentBalanceMoneyBox * 100) / remainingValue;
    setProgress(newProgress);
  }, [currentBalanceMoneyBox, remainingValue]);

  // const progress = (currentBalanceMoneyBox * 100) / remainingValue;

  const handleRemainingEdit = () => {
    setEditingRemaining(true);
  };

  const handleRemainingChange = (event) => {
    const newValue = event.target.value;
    if (!isNaN(newValue)) {
      setRemainingValue(newValue);
    }
  };

  const handleRemainingBlur = () => {
    setEditingRemaining(false);
  };

  return (
    <div className="flex-container">
      <div className="secondt">
        <div className={`moneyBox ${isDarkMode ? "dark" : "light"}`}>
          <p>
            Money Box
            <FontAwesomeIcon icon={faPiggyBank} className="logoMoneyBox" />
          </p>
          <div className="progressContainer">
            <div
              className="progressBar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="infoMoneyBox">
            <p>{`$${currentBalanceMoneyBox.toFixed(2)} saved`}</p>

            {editingRemaining ? (
              <input
                type="number"
                step="0.01"
                className="inputMoneyBox"
                value={remainingValue}
                onChange={handleRemainingChange}
                onBlur={handleRemainingBlur}
                autoFocus
              />
            ) : (
              <p
                onClick={handleRemainingEdit}
              >{`$${remainingValue} remaining`}</p>
            )}
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default MoneyBox;
