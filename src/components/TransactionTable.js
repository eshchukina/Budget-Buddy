import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";
import MoneyBox from "./MoneyBox";
import TransactionRow from "./TransactionRow";



import "./Style.css";
import "./Dashboard.css";
import "./MoneyBox";






const TransactionTable = ({
  account,
  dataList,
  isDarkMode,
  handleEdit,
  handleDelete,
  openModal,
  handleTagChange
  
}) => {
  const [expandedDescription, setExpandedDescription] = useState(null);

  const formatData = (data) => {
    const maxLength = 30;
    if (!data || data.length === 0) {
      return "";
    }
    if (data.length > maxLength) {
      return `${data.substring(0, maxLength)}...`;
    }
    return data;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatBalance = (balance) => {
    if (typeof balance === "number" && !isNaN(balance)) {
      return balance.toFixed(2);
    }
    return "";
  };

  const handleExpandDescription = (dataId) => {
    if (expandedDescription === dataId) {
      setExpandedDescription(null);
    } else {
      setExpandedDescription(dataId);
    }
  };

  const moneyBoxTransactions = dataList ? dataList.filter((data) => data.tag === "moneyBox") : [];


  const currentBalanceMoneyBox = moneyBoxTransactions.reduce(
    (total, item) => total + Math.abs(item.amount), // Use Math.abs() to convert negative values to positive
    0
  );
  
  


  return (
    <>
    <div className={`mainField ${isDarkMode ? "dark" : "light"}`}>
  
<div className="flex-container">

<div className="firstt">
  
      <table
        key={account.id}
        className={`accountContent ${isDarkMode ? "dark" : "light"}`}
      >
        <caption>
          {account.name.length > 20
            ? `${account.name.substring(0, 13)}...`
            : account.name}
          ({account.currency})
        </caption>


        <thead>
          <tr>
          <th></th>
       
            <th>Name</th>
           
            <th>Amount</th>
            <th>Date</th>
            <th>Balance</th>
            <th></th>
          </tr>
        </thead>
        {dataList && dataList.length > 0 ? (
          <tbody>
            
          {dataList.map((data, index) => (
  <TransactionRow
    key={data.id}
    index={index}
    data={data}
    isDarkMode={isDarkMode}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    handleExpandDescription={handleExpandDescription}
    expandedDescription={expandedDescription}
    formatData={formatData}
    formatDate={formatDate}
    formatBalance={formatBalance}
    handleTagChange={handleTagChange}
    
  />
))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="6"><br/><br/><p>Create your first transaction  <span>  <FontAwesomeIcon icon={faArrowTurnDown} className="blinking-icon"/> </span></p></td>
            </tr>
          </tbody>
        )}{" "}
        <tfoot>
          <tr>
            <td colSpan="6">
              {" "}
              <div className="pad">
                {" "}
                <button
                  className={`modalButton ${isDarkMode ? "dark" : "light"}`}
                  onClick={openModal}
                >
                  Create transaction
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="6">
              {" "}
              <div className="pad"></div>
            </td>
          </tr>
        </tfoot>
      </table>{" "}
    </div> </div>

    <div className="secondt">
    <MoneyBox
        isDarkMode={isDarkMode}
        currentBalanceMoneyBox={currentBalanceMoneyBox} 
        dataList={dataList}
        // Pass the current balance of Money Box transactions
      />
    </div>   

  </div>

    
    
    </>
   
  );
};

export default TransactionTable;
