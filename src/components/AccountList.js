import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Style.css";

const AccountList = ({ isDarkMode, account, updateAccountData, currency }) => {
  const [editData, setEditData] = useState({
    id: null,
    description: "",
    amount: "",
    date: "",
  });

  const formatData = (data) => {
    const maxLength = 30;
    if (data.length > maxLength) {
      return `${data.substring(0, maxLength)}...`;
    }
    return data;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [accountCaption, setAccountCaption] = useState("");
  
  const shortenedAccountName =
    account.name.length > 20 ? `${account.name.substring(0, 14)}...` : account.name;

  const mainFieldClass = `mainField ${isDarkMode ? "dark" : "light"}`;
  const [expandedDescription, setExpandedDescription] = useState(null);

  const handleExpandDescription = (dataId) => {
    if (expandedDescription === dataId) {
      setExpandedDescription(null);
    } else {
      setExpandedDescription(dataId);
    }
  };

  useEffect(() => {
    setAccountCaption(`${account.name} (${account.currency})`);
  }, [account]);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await fetch(`http://192.168.1.30:1323/transactions/account/${account.id}`);
        const data = await response.json();
        setDataList(data);
      } catch (error) {
        console.log("Error fetching account data:", error);
      }
    };

    fetchAccountData();
  }, [account]);

  useEffect(() => {
    setAccountCaption(`${account.name} (${account.currency})`);
  }, [account]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (editData.id !== null) {
    // Update existing data
    const updatedDataList = dataList.map((data) =>
      data.id === editData.id ? { ...data, ...editData } : data
    );
    setDataList(updatedDataList);
    updateAccountData(account.id, updatedDataList);
    
    try {
      const response = await fetch(
        `http://192.168.1.30:1323/transactions/${editData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );

      if (!response.ok) {
        console.log("Error updating data in the database.");
      }
    } catch (error) {
      console.log("Error updating data in the database:", error);
    }
  } else {
    // Create new data
    const newSubmittedData = {
      account_id: account.id,
      description: editData.description,
      amount: editData.amount,
      date: editData.date,
    };

    try {
      const response = await fetch("http://192.168.1.30:1323/transactions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubmittedData),
      });

      if (response.ok) {
        const responseData = await response.json();
        const updatedDataList = [...dataList, responseData];
        setDataList(updatedDataList);
        updateAccountData(account.id, updatedDataList);
      } else {
        console.log("Error adding data to the database.");
      }
    } catch (error) {
      console.log("Error adding data to the database:", error);
    }
  }
  
  closeModal();
};

  
  


  const handleEdit = (data) => {
    setEditData({ ...data });
    openModal();
  };

  const handleDelete = async (accountId, dataId) => {
    try {
      const response = await fetch(
        `http://192.168.1.30:1323/transactions/${dataId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedDataList = dataList.filter((data) => data.id !== dataId);
        setDataList(updatedDataList);
        updateAccountData(accountId, updatedDataList);
      } else {
        console.log("Error deleting data from the database.");
      }
    } catch (error) {
      console.log("Error deleting data from the database:", error);
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditData({
      id: null,
      description: "",
      amount: "",
      date: "",
    });
  };

  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    if (value.length <= 50) {
      setEditData({ ...editData, description: value });
    }
  };
  const handleAmountChange = (e) => {
    const { value } = e.target;
    const floatValue = parseFloat(value);
    if (!isNaN(floatValue)) {
      setEditData({ ...editData, amount: floatValue });
    }
  };

  const formatDateForInput = (date) => {
    if (!date) {
      return "";
    }
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };
  const formatDateTime = (date) => {
    const timeString = "T00:00:00Z";
    const formattedDate = date + timeString;
    return formattedDate;
  };
  
  
  if (!account) {
    return null;
  }

  return (
    <div className={mainFieldClass}>
      <div key={account.id}>
        {isModalOpen && (
          <div className="modal">
            <div className={`modalContent ${isDarkMode ? "dark" : "light"}`}>
              <h3>Enter the data</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={editData.description}
                  onChange={handleDescriptionChange}
                  placeholder="description"
                />
                <input
                  type="text"
                  value={editData.amount}
                  onChange={handleAmountChange}

                  
                  placeholder="amount"
                />

<input
  type="date"
  value={editData.date ? formatDateForInput(editData.date) : ""}
  onChange={(e) => {
    const selectedDate = e.target.value;
    const formattedDate = formatDateTime(selectedDate);
    setEditData({ ...editData, date: formattedDate });
  }}
  placeholder="date"
/>


                {/* <input
                  type="date"
                  value={editData.date}
                  onChange={(e) =>
                    setEditData({ ...editData, date: e.target.value + "T00:00:00Z" })
                  }
                  placeholder="date"
                /> */}

                <button
                  className={`modalBtn ${isDarkMode ? "dark" : "light"}`}
                  type="submit"
                >
                  Add
                </button>
                <button
                  className={`modalBtn ${isDarkMode ? "dark" : "light"}`}
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
        <table className={`accountContent ${isDarkMode ? "dark" : "light"}`}>
          <caption>
            {shortenedAccountName} ({account.currency})
          </caption>
          <thead>
            <tr>
              <th>Number</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          {dataList && dataList.length > 0 && (
  <tbody>
    {dataList.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td
                    onClick={() => handleExpandDescription(data.id)}
                    className={`expandable-description ${
                      expandedDescription === data.id ? "expanded" : ""
                    }`}
                  >
                    {expandedDescription === data.id
                      ? data.description
                      : formatData(data.description)}
                  </td>
                  <td>{formatData(data.amount)}</td>
                  <td>{data.date}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      onClick={() => handleEdit(data)}
                      className={`editIcon1 ${
                        isDarkMode ? "dark" : "light"
                      }`}
                    />

                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={() => handleDelete(account.id, data.id)}
                      className={`deleteIcon1 ${
                        isDarkMode ? "dark" : "light"
                      }`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {!dataList || dataList.length === 0 && <p>No submitted data.</p>}

        {/* Display message when dataList is empty */}
      </div>{" "}
      <button
        className={`modalButton ${isDarkMode ? "dark" : "light"}`}
        onClick={openModal}
      >
        Create transaction
      </button>
    </div>
  );
};

export default AccountList;
