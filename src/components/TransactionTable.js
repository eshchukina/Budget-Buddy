import React from "react";
import { useState } from "react";
import TransactionRow from "./TransactionRow";

import "./Style.css";

import "./Dashboard.css";

const TransactionTable = ({
  account,
  dataList,
  isDarkMode,
  handleEdit,
  handleDelete,
  openModal,
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

  return (
    <div className={`mainField ${isDarkMode ? "dark" : "light"}`}>
      <table
        key={account.id}
        className={`accountContent ${isDarkMode ? "dark" : "light"}`}
      >
        <caption>
          {account.name.length > 20
            ? `${account.name.substring(0, 14)}...`
            : account.name}
          ({account.currency})
        </caption>
        <thead>
          <tr>
            <th>Number</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Balance</th>
            <th></th>
          </tr>
        </thead>
        {dataList && dataList.length > 0 ? (
          <tbody>
            {dataList.map((data) => (
              <TransactionRow
                key={data.id}
                data={data}
                isDarkMode={isDarkMode}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleExpandDescription={handleExpandDescription}
                expandedDescription={expandedDescription}
                formatData={formatData}
                formatDate={formatDate}
                formatBalance={formatBalance}
              />
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="6">No data available</td>
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
    </div>
  );
};

export default TransactionTable;
