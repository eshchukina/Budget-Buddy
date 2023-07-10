import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import TransactionTable from "./TransactionTable";
import BalanceSheet from "./BalanceSheet";

import "./Style.css";

import "./Dashboard.css";



const Dashboard = ({ 
  isDarkMode,
   account,
    updateAccountData, 
    currency,  
    headersWithToken,
  
    activeModal, setActiveModal }) => {

  const [editData, setEditData] = useState({
    id: null,
    description: "",
    amount: "",
    date: "",
 
  });





  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [accountCaption, setAccountCaption] = useState("");
  

  const handleOpenModal1 = () => {
    setActiveModal('accountModal');
  };



  const formatBalance = (balance) => {
    if (typeof balance === "number" && !isNaN(balance)) {
      return balance.toFixed(2);
    }
    return "";
  };


  // const [expandedDescription, setExpandedDescription] = useState(null);


  // const handleExpandDescription = (dataId) => {
  //   if (expandedDescription === dataId) {
  //     setExpandedDescription(null);
  //   } else {
  //     setExpandedDescription(dataId);
  //   }
  // };







//   const fetchAccountData = async () => {
//     try {
      
//   const response = await fetch(`http://192.168.1.30:1323/accounts/${account.id}/statement/`);
//   const data = await response.json();
//    setDataList(data);
// } catch (error) {
//       console.log("Error fetching account list:", error);
//     }
//   };

 
    const fetchAccountData = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Retrieve the token from localStorage
        const headersWithToken = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        };
   
        const response = await fetch(`http://192.168.1.30:1323/accounts/${account.id}/statement/`, {
          headers: headersWithToken // Pass the headers object in the fetch options
        });
        const data = await response.json();
        setDataList(data);
      } catch (error) {
        console.log("Error fetching account data:", error);
      }
    };


   useEffect(() => {
    fetchAccountData();
  }, [account]);




  useEffect(() => {
    setAccountCaption(`${account.name} (${account.currency})`);
  }, [account]);


  const updateAccountCaption = (account) => {
    setAccountCaption(`${account.name} (${account.currency})`);
  };
  

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
        // Make the PUT request to update the data in the database
        const token = localStorage.getItem("accessToken");
        const headersWithToken = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await fetch(
          `http://192.168.1.30:1323/transactions/${editData.id}`,
          {
            method: "PUT",
            headers: headersWithToken,
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
        // Make the POST request to add the data to the database
        const token = localStorage.getItem("accessToken");
        const headersWithToken = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await fetch("http://192.168.1.30:1323/transactions/", {
          method: "POST",
          headers: headersWithToken,
          body: JSON.stringify(newSubmittedData),
        });
  
        if (response.ok) {
          await fetchAccountData(); // Fetch the updated account data
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
      const token = localStorage.getItem("accessToken"); // Retrieve the token from localStorage
      const headersWithToken = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };
      const response = await fetch(
        `http://192.168.1.30:1323/transactions/${dataId}`,
        {
          method: "DELETE",
          headers: headersWithToken,
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
   
    <div className={`mainField ${isDarkMode ? "dark" : "light"}`}>  
      <div key={account.id}>
        {isModalOpen && 
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
        }    



<BalanceSheet
  futureBalance={account.futureBalance}
  currentBalance={account.currentBalance}
/>

         <TransactionTable
           account={account}
           dataList={dataList}
           isDarkMode={isDarkMode}
           handleEdit={handleEdit}
           handleDelete={handleDelete}
           handleDescriptionChange={handleDescriptionChange} // Add this prop
           handleAmountChange={handleAmountChange} // Add this prop
           formatDateForInput={formatDateForInput} // Add this prop
           formatDateTime={formatDateTime}
           openModal={openModal} 
           formatBalance={formatBalance} 
        />
        {!dataList || (dataList.length === 0 && <p>No submitted data</p>)}



      </div>
     
    </div>
  );
};


export default Dashboard;