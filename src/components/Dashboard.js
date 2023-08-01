import React, { useState, useEffect } from "react";
import TransactionTable from "./TransactionTable";
 import ApexChart from './ApexChart'; 
import config from '../config';

import "./Style.css";
import "./Dashboard.css";

const Dashboard = ({
  isDarkMode,
  account,
  updateAccountData,

}) => {

  const [editData, setEditData] = useState({
    id: null,
    description: "",
    tag: "",
    amount: null,
    date: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(account.currentBalance);
  const [futureBalance, setFutureBalance] = useState(account.futureBalance);


  const [chartData, setChartData] = useState({
    series: [], 
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: [], 
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      colors: ['#E96E94', '#5EC7DD', '#ffcd38', '#9ddd5e', '#1b414c'],
      dataLabels: {
        style: {
          colors: ['#fff'] 
        }
      }
    }
  });
  






  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const headersWithToken = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
       
        const response = await 
        fetch(`${config.apiUrl}accounts/${account.id}/statement/`,
          {
            headers: headersWithToken,
          }
        );
        
        if (!response.ok) {
          console.log("Error fetching account data:", response);
          return;
        }
        const data = await response.json();
        setDataList(data);
      

        const currentBalance = data.reduce(
          (total, item) => total + item.amount,
          0
        );
        setCurrentBalance(currentBalance);
        setFutureBalance(currentBalance);
        
      } catch (error) {
        console.log("Error fetching account data:", error);
      }
    };

    fetchAccountData();
 
  
   
  }, [account]);




  useEffect(() => {
  
    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const headersWithToken = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
  
        const response = await fetch(`${config.apiUrl}accounts/${account.id}/statistics`, {
          headers: headersWithToken,
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch account statistics");
        }
  
        const data = await response.json();
  
        const chartLabels = Object.keys(data);
        const seriesData = Object.values(data).map((value) => parseFloat(value));
        setChartData((prevState) => ({
          ...prevState,
          series: seriesData,
          options: {
            ...prevState.options,
            labels: chartLabels,
          },
        }));
      } catch (error) {
        console.log("Error fetching account statistics:", error.message);
      }
    };

    fetchChartData();
  
   
  }, [account]);





    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const headersWithToken = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
  
        const response = await fetch(`${config.apiUrl}accounts/${account.id}/statistics`, {
          headers: headersWithToken,
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch account statistics");
        }
  
        const data = await response.json();
  
        const chartLabels = Object.keys(data);
        const seriesData = Object.values(data).map((value) => parseFloat(value));
        setChartData((prevState) => ({
          ...prevState,
          series: seriesData,
          options: {
            ...prevState.options,
            labels: chartLabels,
          },
        }));
      } catch (error) {
        console.log("Error fetching account statistics:", error.message);
      }
    };
  
  



  useEffect(() => {
    const futureBalance = calculateFutureBalance(dataList);
    setFutureBalance(futureBalance);
  }, [dataList]);

  useEffect(() => {

    setCurrentBalance(currentBalance);
    setFutureBalance(futureBalance);
  }, [currentBalance, futureBalance]);

  

  const fetchAccountData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headersWithToken = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`${config.apiUrl}accounts/${account.id}/statement/` ,
        {
          headers: headersWithToken,
        }
      );

      if (!response.ok) {
        console.log("Error fetching account data:", response);
        return;
      }
      const data = await response.json();
      setDataList(data);

      const currentBalance = data.reduce(
        (total, item) => total + item.amount,
        0
      );
      setCurrentBalance(currentBalance);
      setFutureBalance(currentBalance);
      fetchChartData();
    
    
    } catch (error) {
      console.log("Error fetching account data:", error);
    }
  };

  const calculateFutureBalance = (dataList) => {
    if (dataList && dataList.length > 0) {
      const currentBalance = dataList.reduce(
        (total, item) => total + item.amount,
        0
      );
      return currentBalance;
    }
    return 0;
  };

  const handleCreateData = async () => {
    const newSubmittedData = {
      account_id: account.id,
      description: editData.description,
      tag: editData.tag,
      amount: editData.amount,
      date: editData.date,
    };
    const updatedDataList = dataList
    ? dataList.map((data) =>
        data.id === editData.id ? { ...data, ...editData } : data
      )
    : [];

  setDataList(updatedDataList);
  updateAccountData(account.id, updatedDataList);

    try {
      const token = localStorage.getItem("accessToken");
      const headersWithToken = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      
      const response = await fetch(`${config.apiUrl}transactions/`, {
        method: "POST",
        headers: headersWithToken,
        body: JSON.stringify(newSubmittedData),
      });

      if (response.ok) {
        fetchAccountData();
        fetchChartData();
      
      
        closeModal();
      } else {
        console.log("Error adding data to the database.");
      }
    } catch (error) {
      console.log("Error adding data to the database:", error);
    }
  };

 const handleUpdateData = async () => {
  const updatedDataList = dataList
    ? dataList.map((data) =>
        data.id === editData.id ? { ...data, ...editData } : data
      )
    : [];

  setDataList(updatedDataList);
  updateAccountData(account.id, updatedDataList);

  try {
    const token = localStorage.getItem("accessToken");
    const headersWithToken = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const updatedData = {
      account_id: account.id,
      description: editData.description,
      tag: editData.tag,
      amount: parseFloat(editData.amount),
      date: editData.date,
    };
   console.log(updatedData);
    const response = await fetch(
       `${config.apiUrl}transactions/${editData.id}`,
      // `http://192.168.1.30:1323/transactions/${editData.id}`,
      {
        method: "PUT",
        headers: headersWithToken,
        body: JSON.stringify(updatedData), 
      }
    );

    if (!response.ok) {
      console.log("Error updating data in the database.");
    } else {
      fetchAccountData();
      fetchChartData();
 
      
    }
  } catch (error) {
    console.log("Error updating data in the database:", error);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editData.id !== null) {
      await handleUpdateData();
    } else {
      await handleCreateData();
    }

    closeModal();
  };

  const handleEdit = (data) => {
    setEditData({
      id: data.id,
      description: data.description,
      tag: data.tag,
      amount: data.amount,
      date: data.date,
    });
    openModal();
  };

  const handleDelete = async (accountId, dataId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const headersWithToken = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(`${config.apiUrl}transactions/${dataId}`,
        {
          method: "DELETE",
          headers: headersWithToken,
        }
      );

      if (response.ok) {
        const updatedDataList = dataList.filter((data) => data.id !== dataId);
        setDataList(updatedDataList);
        updateAccountData(accountId, updatedDataList);
        fetchChartData();
       
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


  const handleTagChange = (e) => {
    setEditData({ ...editData, tag: e.target.value });
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

  const formatBalance = (balance) => {
    if (typeof balance === "number" && !isNaN(balance)) {
      return balance.toFixed(2);
    }
    return "";
  };






  return (
    <div className={`mainField ${isDarkMode ? "dark" : "light"}`}>
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
                    <select value={editData.tag} onChange={handleTagChange} >
      <option value="">category</option>
      <option value="food">food</option>
      <option value="transport">transport</option>
      <option value="health">health</option>
      <option value="entertaiment">entertaimen</option>
      <option value="cloth">cloth</option>
      <option value="saving">saving</option>
      <option value="pets">pets</option>
      <option value="gifts">gifts</option>
      <option value="hobby">hobby</option>
      <option value="trips">trips</option>
      <option value="other">other</option>

    </select>
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
        )}

        <TransactionTable
          account={account}
          dataList={dataList}
          isDarkMode={isDarkMode}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleDescriptionChange={handleDescriptionChange}
          handleAmountChange={handleAmountChange}
          formatDateForInput={formatDateForInput}
          formatDateTime={formatDateTime}
          openModal={openModal}
          formatBalance={formatBalance}
        />

        {!dataList || (dataList.length === 0 && <p>No submitted data</p>)}
      </div>
      <ApexChart account={account}
       isDarkMode={isDarkMode} 
       chartData={chartData} 
        fetchChartData={fetchChartData} 
       />

    </div>
  );
};

export default Dashboard;
