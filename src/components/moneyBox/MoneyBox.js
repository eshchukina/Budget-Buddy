import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import CurrencyIcon from "../../utils/currencyIcon";

import "./MoneyBox.css";
import "../Style.css";
import "../../components/dashboard/Dashboard.css";

const MoneyBox = ({ isDarkMode, currentBalanceMoneyBox, account }) => {
  const [remainingValue, setRemainingValue] = useState(0);
  const [editingRemaining, setEditingRemaining] = useState(false);
  const [progress, setProgress] = useState(0);

  // Загрузка значения из localStorage при переключении на новый аккаунт
  useEffect(() => {
    const savedRemainingValue = localStorage.getItem(`remainingValue_${account}`);
    if (savedRemainingValue) {
      setRemainingValue(parseFloat(savedRemainingValue));
    } else {
      setRemainingValue(500); // Если нет сохраненного значения, использовать значение по умолчанию
    }
  }, [account]);

  useEffect(() => {
    const newProgress = (currentBalanceMoneyBox * 100) / remainingValue;
    setProgress(newProgress);
  }, [currentBalanceMoneyBox, remainingValue]);

  const handleRemainingEdit = () => {
    setEditingRemaining(true);
  };

  const handleRemainingChange = (event) => {
    const newValue = event.target.value;

    if (!isNaN(newValue) && newValue.length <= 6) {
      setRemainingValue(newValue);
    }
  };

  const handleRemainingBlur = () => {
    setEditingRemaining(false);
    // Сохранение значения в localStorage при завершении редактирования
    localStorage.setItem(`remainingValue_${account}`, remainingValue);
  };

  return (
    <div className="moneyBox">
      <p className="title">
        money box
       
      </p>
      <div className={`moneyBox ${isDarkMode ? "dark" : "light"}`}>
        <p>
          <FontAwesomeIcon icon={faPiggyBank} className="logoMoneyBox" />
        </p>
        <div className="progressContainer">
          <div className="progressBar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="infoMoneyBox">
          <p>{`${currentBalanceMoneyBox.toFixed(2)} saved`}</p>
          {editingRemaining ? (
            <input
              maxLength={10}
              type="number"
              step="0.01"
              className="inputMoneyBox"
              value={remainingValue}
              onChange={handleRemainingChange}
              onBlur={handleRemainingBlur}
              autoFocus
            />
          ) : (
            <p onClick={handleRemainingEdit}><CurrencyIcon currency={account.currency} size={20} color="#5e718b" />{` ${remainingValue} remaining`}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoneyBox;
