import React, { useState, useEffect } from "react";
import TransactionTable from "./TransactionTable";
 import ApexChart from './ApexCharts'; 
 import AreaCharts from "./AreaChart";
 import Converter from "./Converter";
import config from '../config';


import "./Style.css";
import "./Dashboard.css";
import "./SideMenu";


import Instruction from "./Instruction";

const Dashboard = ({
  isDarkMode,
  account,
  updateAccountData,
  activeAccount

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




  const [positiveBalanceData, setPositiveBalanceData] = useState([]);
  const [negativeBalanceData, setNegativeBalanceData] = useState([]);


  const [showInstructions, setShowInstructions] = useState(false);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);

    const hiddenContent = document.querySelector('.sidebar'); 

 if (window.innerWidth <= 600) {
        if (hiddenContent.style.display === 'none') {
          hiddenContent.style.display = 'flex'; 
        } else {
          hiddenContent.style.display = 'none'; 
        }
      }
  };



  const [chartData, setChartData] = useState({
    series: [], 
    options: {
      chart: {
        width: 380,
        type: 'donut',
      },
      labels: [], 
      responsive: [
        {
       
        options: {
         
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
      colors: ['#E96E94', '#5EC7DD', '#ffcd38', '#9ddd5e', '#1b414c'],
      title: {
        text: 'most common monthly expenses',
        align: 'center', 
    
        style: {
          fontSize: '18px', 
          fontFamily: "'Ysabeau SC', sans-serif", 
          color: "#9dafb4"
         
        },
      },  
    }
  });
  

  const [chartDataSchedule, setChartDataSchedule] = useState({
    series: [
      {
        name: 'series1',
        data: []
      },
      {
        name: 'series2',
        data: []
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: [
       
        ]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    },
  });
  






  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isModalOpen &&
        e.target.classList.contains("modalWindow") &&
        !e.target.classList.contains("modalContent")
      ) {
        closeModal();
      }
    };
  
    if (isModalOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
  
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isModalOpen]);
  



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
      
        // console.log(data);
    
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
    
        const sortedData = Object.entries(data).sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));
    
        const chartLabels = sortedData.slice(0, 5).map(([label]) => label);
        const seriesData = sortedData.slice(0, 5).map(([, value]) => parseFloat(value));
    
        const chartColors = ['#E96E94', '#5EC7DD', '#ffcd38', '#9ddd5e', '#9dafb4'];
    
        setChartData((prevState) => ({
          ...prevState,
          series: seriesData,
          options: {
            ...prevState.options,
            labels: chartLabels,
            colors: chartColors,
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
  
      const sortedData = Object.entries(data).sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));
  
      const chartLabels = sortedData.slice(0, 5).map(([label]) => label);
      const seriesData = sortedData.slice(0, 5).map(([, value]) => parseFloat(value));
  
      const chartColors = ['#E96E94', '#5EC7DD', '#ffcd38', '#9ddd5e', '#9dafb4'];
  
      setChartData((prevState) => ({
        ...prevState,
        series: seriesData,
        options: {
          ...prevState.options,
          labels: chartLabels,
          colors: chartColors,
        },
      }));
    } catch (error) {
      console.log("Error fetching account statistics:", error.message);
    }
  };
  
  
  




  useEffect(() => {
    const fetchChartDataSchedule = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const headersWithToken = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
  
        const response = await fetch(`${config.apiUrl}accounts/${account.id}/statement/`, {
          headers: headersWithToken,
        });
  
        if (!response.ok) {
          console.log("Error fetching account data:", response);
          return;
        }
  
        const data = await response.json();
        let positiveData = 0;
        let negativeData = 0;
        if (!data) {
          console.log("Received null data:", data);
        


          positiveData = [];
           negativeData = [];
          
        }
        else {
         positiveData = data.filter(item => item.amount >= 0);
        negativeData = data.filter(item => item.amount < 0);
      
      }

        setPositiveBalanceData(positiveData);
        setNegativeBalanceData(negativeData);
  
        const categories = positiveData.map(item => item.date);
  
        setChartDataSchedule((prevState) => ({
          ...prevState,
          series: [
            {
              name: ' ',
              data: positiveData.map(item => item.amount)
            },
            {
              name: ' ',
              data: negativeData.map(item => item.amount)
            }
          ],
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: categories
            }
          }
        }));
      } catch (error) {
        console.log("Error fetching account data:", error);
      }
    };
  
    fetchChartDataSchedule();
  }, [account]);
  
  



  const fetchChartDataSchedule = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headersWithToken = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`${config.apiUrl}accounts/${account.id}/statement/`, {
        headers: headersWithToken,
      });

  
      const data = await response.json();

      const positiveData = data.filter(item => item.amount >= 0);
      const negativeData = data.filter(item => item.amount < 0);


      const categories = positiveData.map(item => item.date);

      setChartDataSchedule((prevState) => ({
        ...prevState,
        series: [
          {
            name: ' ',
            data: positiveData.map(item => item.amount)
          },
          {
            name: ' ',
            data: negativeData.map(item => item.amount)
          }
        ],
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: categories
          }
        }
      }));
    } catch (error) {
      console.log("Error fetching account data:", error);
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
      // setChartDataSchedule({ series: [], options: chartDataSchedule.options }); // Обнулить данные графика
      // fetchChartData();
      // fetchChartDataSchedule();
      fetchChartDataSchedule();

      
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
        fetchChartDataSchedule();
      
        closeModal();
      } else {
        console.log("Error adding data to the database.");
        fetchAccountData();
      }
    } catch (error) {
      console.log("Error adding data to the database:", error);
    }
    fetchAccountData();
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
 
    const response = await fetch(
       `${config.apiUrl}transactions/${editData.id}`,
    
      {
        method: "PUT",
        headers: headersWithToken,
        body: JSON.stringify(updatedData), 
      }
    ); 
    fetchAccountData();
   
    if (!response.ok) {
      console.log("Error updating data in the database.");
    }  
  } catch (error) {
    console.log("Error updating data in the database:", error);
  }
 
  fetchAccountData();
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
    const shouldDelete = window.confirm("Are you sure you want to delete this transaction?");
    if (shouldDelete) {
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
        fetchAccountData();
        fetchChartDataSchedule();
       
      } else {
        console.log("Error deleting data from the database.");
      }
    } catch (error) {
      console.log("Error deleting data from the database:", error);
    }}
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditData({
      id: null,
      description: "",
      tag: "",
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
    const { value } = e.target;
    setEditData({ ...editData, tag: value });
  };
  
  

  const handleAmountChange = (e) => {
    const { value } = e.target;
    let sanitizedValue = value.replace(/[^0-9.-]/g, ""); // Remove non-numeric characters except minus sign
    let floatValue;
  
    // Ensure there is only one minus sign at the beginning
    if (sanitizedValue.indexOf("-") === 0) {
      sanitizedValue = sanitizedValue.replace(/-/g, "");
      floatValue = sanitizedValue ? -parseFloat(sanitizedValue) : "";
    } else {
      floatValue = sanitizedValue ? parseFloat(sanitizedValue) : "";
    }
  
    setEditData({ ...editData, amount: floatValue });
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




  const transactionData = [
    // ... Your transaction data ...
  ];

  // Calculate the current balance of "Money Box" transactions
  // const moneyBoxTransactions = transactionData.filter((data) => data.tag === "moneyBox");
  // const currentBalanceMoneyBox = moneyBoxTransactions.reduce(
  //   (total, item) => total + item.amount,
  //   0
  // );



  return (
 

    <div className={`mainField ${isDarkMode ? "dark" : "light"}`}>
      
     
      {/* <FontAwesomeIcon className="instructionButton" onClick={toggleInstructions}icon={faCircleInfo} /> */}
     
 
    
      {showInstructions ? (
      <Instruction isDarkMode={isDarkMode} />
    ) : (
      <div key={account.id}>
        {isModalOpen && (
          <div className="modalWindow">
            <div className={`modalContent ${isDarkMode ? "dark" : "light"}`}>
              <h3>Enter the data</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={editData.description}
                  onChange={handleDescriptionChange}
                  placeholder="description"
                />



<select
  value={editData.tag}
  onChange={handleTagChange}
  required
  className="tagSelect"
>
  <option value="other" className="tagOther">Select a tag</option>
  <option value="food" className="tagFood">food</option>
  <option value="transport" className="tagTransport">transport</option>
  <option value="salary" className="tagSalary">salary</option>
  <option value="health" className="tagHealth">health</option>
  <option value="pets" className="tagPets">pets</option>
  <option value="gifts" className="tagGifts">gifts</option>
  <option value="hobby" className="tagHobby">hobby</option>
  <option value="entertainment" className="tagEntertainment">entertainment</option>
  <option value="cloth" className="tagCloth">cloth</option>
 


  <option value="moneyBox" className="tagmoneyBox">money box</option>
  <option value="trips" className="tagTrips">trips</option>
  <option value="credit" className="tagCredit">credit</option>
  <option value="other" className="tagOther">other</option>
</select>




                <input
                  type="number"
                  inputMode="decimal"
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
      
      <div className="flex-container">
<div className="firstt">




   <TransactionTable
          account={account}
          dataList={dataList}
          dataList1={transactionData}
          isDarkMode={isDarkMode}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleDescriptionChange={handleDescriptionChange}
          handleAmountChange={handleAmountChange}
          formatDateForInput={formatDateForInput}
          formatDateTime={formatDateTime}
          openModal={openModal}
          formatBalance={formatBalance}
          handleTagChange={handleTagChange} 
          toggleInstructions = {toggleInstructions}
        />
        {!dataList || (dataList.length === 0 && <p>No submitted data</p>)}
        
        <AreaCharts
             isDarkMode={isDarkMode} 
             formatBalance={formatBalance}
              positiveBalanceData={positiveBalanceData}
              negativeBalanceData={negativeBalanceData}
              chartDataSchedule={chartDataSchedule}
              fetchChartDataSchedule={fetchChartDataSchedule}
            />
   

        </div>
     

     
      <div className="secondt">
      {/* <MoneyBox isDarkMode={isDarkMode}
      currentBalanceMoneyBox={currentBalanceMoneyBox} 
       /> */}
         <ApexChart account={account}
       isDarkMode={isDarkMode} 
       chartData={chartData} 
        fetchChartData={fetchChartData}  
       />  <Converter isDarkMode={isDarkMode}/>
       
   
   </div>
        </div>
      </div>
    )}
  </div>
);
                }
export default Dashboard;
