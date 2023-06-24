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
  const [accountCaption, setAccountCaption] = useState('');
  const shortenedAccountName = account.name.length > 20 ? `${account.name.substring(0, 14)}...` : account.name;

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
  

const handleSubmit = (e) => {
  e.preventDefault();
  if (editData.id !== null) {
    const updatedDataList = dataList.map((data) =>
      data.id === editData.id ? { ...data, ...editData } : data
    );
    setDataList(updatedDataList); // Обновление состояния dataList
    updateAccountData(account.id, updatedDataList);
    setEditData({
      id: null,
      description: "",
      amount: "",
      date: "",
    });
  } else {
    const newSubmittedData = {
      ...editData,
      id: dataList.length + 1,
    };

    const updateAccountCaption = () => {
      const tableCaption = document.querySelector(".accountContent caption");
      if (tableCaption) {
        tableCaption.textContent = `${account.name} (${account.currency})`;
      }
    };
    const updatedDataList = [...dataList, newSubmittedData];
    setDataList(updatedDataList); // Обновление состояния dataList
    updateAccountData(account.id, updatedDataList);
    setEditData({
      id: null,
      description: "",
      amount: "",
      date: "",
    });
  }
  closeModal();
};


  const handleEdit = (data) => {
    setEditData({ ...data });
    openModal();
  };

  const handleDelete = (accountId, dataId) => {
    const updatedDataList = dataList.filter((data) => data.id !== dataId);
    setDataList(updatedDataList); // Обновление состояния dataList
    updateAccountData(accountId, updatedDataList);
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
  if (!account) {
    return null; // Return early if account is null
  }






  
  return (
    <div className={mainFieldClass}>
      <div key={account.id}>
      

        {isModalOpen && (
          <div className="modal">
            <div className={`modalContent ${isDarkMode ? "dark" : "light"}`} >
              <h3>Enter the data</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={editData.description}
                  onChange={handleDescriptionChange}
                  placeholder="description"
                />
                <input
                  type="number"
                  value={editData.amount}
                  onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                  placeholder="amount"
                />
                <input
                  type="date"
                  value={editData.date}
                  onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                  placeholder="date"
                />
               <button className={`modalBtn ${isDarkMode ? "dark" : "light"}`} type="submit" >
                 Add
                </button>
                <button className={`modalBtn ${isDarkMode ? "dark" : "light"}`} onClick={closeModal}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
        <table className={`accountContent ${isDarkMode ? "dark" : "light"}`} >
        <caption>{shortenedAccountName} ({account.currency})</caption>
                    <thead>
              <tr>
              <th>Number</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th></th>
               
              </tr>
            </thead>
            <tbody>
              {dataList.map((data, account) => (

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
                      className={`editIcon1 ${isDarkMode ? "dark" : "light"}`}
                    />
                 
                  <FontAwesomeIcon
                      icon={faTimes}
                      onClick={() => handleDelete(account.id, data.id)}
                      className={`deleteIcon1 ${isDarkMode ? "dark" : "light"}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No submitted data.</p>
        )}
      
      </div>  <button className={`modalButton ${isDarkMode ? "dark" : "light"}`} onClick={openModal}>
          Create transaction
        </button>
    </div>
  );
};

export default AccountList;