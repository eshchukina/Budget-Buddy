import React from "react";
import { useState } from "react";
import TransactionRow from "./TransactionRow";
import MainButton from "../buttons/MainButton";
import "../Style.css";
import "../../components/dashboard/Dashboard.css";

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
    const maxLength = 10;
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
    <div className={` ${isDarkMode ? "dark" : "light"}`}>
      <div className="titleContainer">
        <p className="title">
          {account.name.length > 20
            ? `${account.name.substring(0, 13)}...`
            : account.name}{" "}
          ({account.currency})
        </p>

        <MainButton
          isDarkMode={isDarkMode}
          onClick={openModal}
          buttonText="+ transaction"
        />
      </div>
      <div className="textContainer">
        <p></p>
        <p className="titleSmall">name and date</p>
        <p className="titleSmall">amount</p>
        <p className="titleSmall">balance</p>
        <p></p>
      </div>

      <div className="table">
        <div style={{ maxHeight: "230px", overflowY: "scroll" }}>
          <table
            key={account.id}
            className={`accountContent ${isDarkMode ? "dark" : "light"}`}
          >
            {dataList && dataList.length > 0 ? (
              <tbody>
                {dataList.map((data, index) => (
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
                  <td colSpan="6">
                    <p>Create your first transaction</p>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
