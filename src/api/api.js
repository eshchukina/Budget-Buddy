// api.js

import config from "../config";

// Функция для создания аккаунта
 const handleCreateAccount = async (newAccount, newCurrency, setAccounts, fetchAccountList, closeModalAccount) => {
    if (newAccount) {
      try {
        const token = localStorage.getItem("accessToken");
        const headersWithToken = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await fetch(`${config.apiUrl}accounts`, {
          method: "POST",
          mode: "cors",
          headers: headersWithToken,
          body: JSON.stringify({
            name: newAccount,
            currency: newCurrency,
          }),
        });
        if (response.ok) {
          const createdAccount = await response.json();
          setAccounts((prevAccounts) => [...prevAccounts, createdAccount]);
          fetchAccountList();
        } else {
          console.log("Failed to create account");
        }
      } catch (error) {
        console.log("Error creating account:", error);
      }
    }
    closeModalAccount();
    fetchAccountList();
  };

// Функция для получения данных для графиков
const fetchChartData = async (activeAccount, setChartData) => {
  try {
    const token = localStorage.getItem("accessToken");
    const headersWithToken = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(
      `${config.apiUrl}transactions/accounts/${activeAccount.id}/statistics`,
      {
        headers: headersWithToken,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch account statistics");
    }

    const data = await response.json();

    const sortedData = Object.entries(data).sort(
      (a, b) => parseFloat(b[1]) - parseFloat(a[1])
    );

    const chartLabels = sortedData.slice(0, 5).map(([label]) => label);
    const seriesData = sortedData
      .slice(0, 5)
      .map(([, value]) => parseFloat(value));

    const chartColors = [
      "#E96E94",
      "#5EC7DD",
      "#ffcd38",
      "#9ddd5e",
      "#9dafb4",
    ];

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

const fetchChartDataSchedule = async (activeAccount, setChartDataSchedule) => {
    try {
      const token = localStorage.getItem("accessToken");
      const headersWithToken = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
  
      const response = await fetch(
        `${config.apiUrl}transactions/accounts/${activeAccount.id}/statement`,
        {
          headers: headersWithToken,
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch account statement data");
      }
  
      const data = await response.json();
      const positiveData = data.filter((item) => item.amount >= 0);
      const negativeData = data.filter((item) => item.amount < 0);
      const categories = positiveData.map((item) => item.date);
  
      setChartDataSchedule((prevState) => ({
        ...prevState,
        series: [
          {
            name: "Positive Amounts",
            data: positiveData.map((item) => item.amount),
          },
          {
            name: "Negative Amounts",
            data: negativeData.map((item) => item.amount),
          },
        ],
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: categories,
          },
        },
      }));
    } catch (error) {
      console.log("Error fetching account data:", error.message);
    }
  };


  const handleDeleteAccount = async (account, editAccountId, setEditAccountId, fetchAccountList) => {
    try {
      const token = localStorage.getItem("accessToken");
      const headersWithToken = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(`${config.apiUrl}accounts/${account.id}`, {
        method: "DELETE",
        mode: "cors",
        headers: headersWithToken,
      });
      if (response.ok) {
        if (editAccountId !== null && editAccountId === account.id) {
          setEditAccountId(null);
        }
        fetchAccountList();
      } else {
        console.log("Failed to delete account");
      }
    } catch (error) {
      console.log("Error deleting account:", error);
    }
  };
  

export { handleCreateAccount, fetchChartData, fetchChartDataSchedule, handleDeleteAccount  };
