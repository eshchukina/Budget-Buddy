import React, { useState, useEffect } from "react";
import AreaCharts from "../charts/AreaChart";
import ApexChart from "../charts/ApexCharts";
import MoneyBox from "../moneyBox/MoneyBox";
import TransactionTable from "../table/TransactionTable";
import config from "../../config";
import Converter from "../converter/Converter";
import "../Style.css";
import "./Dashboard.css";
import "../sideMenu/SideMenu";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import TransactionModal from "../modals/TransactionModal";
import AccountModal from "../modals/AccountModal";
import MainButton from "../buttons/MainButton";
import AccountCard from "../accounts/AccountCard";
import { handleDeleteAccount,  fetchChartData, fetchChartDataSchedule } from "../../api/api";

const Dashboard = ({
  isDarkMode,
  currency,
  updateAccountData,
  dataList,
  setDataList,
  currentBalanceMoneyBox,
  fetchAccountList,
  fetchedAccountList,
  activeAccount,
  handleAccountChange,
  setActiveAccount,
  updateAccountCaption,
  setAccounts,
  accounts,
  closeModalAccount,
  isModalOpenAccount,
  openModalAccount,
  setNewAccount,
  newAccount,
  setNewCurrency,
  newCurrency,
  setEditAccountId,
  editAccountId,
}) => {
  const [editData, setEditData] = useState({
    id: null,
    description: "",
    tag: "",
    amount: null,
    date: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(
    activeAccount ? activeAccount.currentBalance : 0
  );
  const [futureBalance, setFutureBalance] = useState(
    activeAccount ? activeAccount.futureBalance : 0
  );
  const [chartData, setChartData] = useState({
    series: [],
  });

  const [chartDataSchedule, setChartDataSchedule] = useState({
    series: [
      { name: "series1", data: [] },
      { name: "series2", data: [] },
    ],
    options: {
      chart: { height: 350, type: "area" },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth" },
      xaxis: { type: "datetime", categories: [] },
      tooltip: { x: { format: "dd/MM/yy HH:mm" } },
    },
  });

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

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

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isModalOpen]);

  useEffect(() => {
    if (activeAccount) {
      fetchAccountData();
      fetchChartData(activeAccount, setChartData);

      fetchChartDataSchedule(activeAccount, setChartDataSchedule);
    }
  }, [activeAccount]);

  const handleCreateAccount = async () => {
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
          setAccounts([...accounts, createdAccount]);
          setNewAccount("");
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



  useEffect(() => {
    const futureBalance = calculateFutureBalance(dataList);
    setFutureBalance(futureBalance);
  }, [dataList]);

  useEffect(() => {
    setCurrentBalance(currentBalance);
    setFutureBalance(futureBalance);
  }, [currentBalance, futureBalance]);

  const handleSaveAccount = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headersWithToken = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(
        `${config.apiUrl}accounts/${editAccountId}`,
        {
          method: "PUT",
          mode: "cors",
          headers: headersWithToken,
          body: JSON.stringify({
            name: newAccount,
            currency: newCurrency,
          }),
        }
      );

      if (response.ok) {
        fetchAccountList();

        updateAccountCaption({
          id: editAccountId,
          name: newAccount,
          currency: newCurrency,
        });
      } else {
        console.log("Failed to update account");
      }
    } catch (error) {
      console.log("Error updating account:", error);
    }
    closeModalAccount();
  };
  const handleEditAccount = (account) => {
    setActiveAccount(account);
    setEditAccountId(account.id); // Устанавливаем id аккаунта для редактирования
    setNewAccount(account.name);
    setNewCurrency(account.currency);
    openModalAccount();
    updateAccountCaption(account);
  };
  

  const fetchAccountData = async () => {
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
        console.log("Error fetching account data:", response);
        return;
      }
      const data = await response.json();
      setDataList(data);

      const currentBalance =
        data.reduce((total, item) => total + item.amount, 0) || 0;
      setCurrentBalance(currentBalance);
      setFutureBalance(currentBalance);
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
      account_id: activeAccount.id,
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
    updateAccountData(activeAccount.id, updatedDataList);

    try {
      const token = localStorage.getItem("accessToken");
      const headersWithToken = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`${config.apiUrl}transactions`, {
        method: "POST",
        headers: headersWithToken,
        body: JSON.stringify(newSubmittedData),
      });

      if (response.ok) {
        fetchAccountData();
        fetchChartData();
        fetchChartDataSchedule();
        const balance = currentBalance || 0;
        setCurrentBalance(balance);
        setFutureBalance(balance);

        closeModal();
      } else {
        console.log("Error adding data to the database.");
      }
    } catch (error) {
      console.log("Error adding data to the database:", error);
    }
    fetchAccountData();
    const balance = currentBalance || 0;
    setCurrentBalance(balance);
    setFutureBalance(balance);
  };

  const handleUpdateData = async () => {
    const updatedDataList = dataList
      ? dataList.map((data) =>
          data.id === editData.id ? { ...data, ...editData } : data
        )
      : [];

    setDataList(updatedDataList);
    updateAccountData(activeAccount.id, updatedDataList);

    try {
      const token = localStorage.getItem("accessToken");
      const headersWithToken = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const updatedData = {
        account_id: activeAccount.id,
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

      setCurrentBalance(currentBalance);
      setFutureBalance(currentBalance);

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
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (shouldDelete) {
      try {
        const token = localStorage.getItem("accessToken");
        const headersWithToken = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await fetch(`${config.apiUrl}transactions/${dataId}`, {
          method: "DELETE",
          headers: headersWithToken,
        });

        if (response.ok) {
          const updatedDataList = dataList.filter((data) => data.id !== dataId);
          setDataList(updatedDataList);
          updateAccountData(accountId, updatedDataList);
          fetchChartData();
          fetchAccountData();
          fetchChartDataSchedule();
          setCurrentBalance(currentBalance);
          setFutureBalance(currentBalance);
        } else {
          console.log("Error deleting data from the database.");
        }
      } catch (error) {
        console.log("Error deleting data from the database:", error);
      }
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
    let sanitizedValue = value.replace(/[^0-9.-]/g, "");
    let floatValue;

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

  if (!activeAccount) {
    return null;
  }

  const formatBalance = (balance) => {
    if (typeof balance === "number" && !isNaN(balance)) {
      return balance.toFixed(2);
    }
    return "";
  };

 

  return (
    <div className={`${isDarkMode ? "dark" : "light"}`}>
     
      <div key={activeAccount.id}>
        <TransactionModal
          isDarkMode={isDarkMode}
          isModalOpen={isModalOpen}
          editData={editData}
          handleSubmit={handleSubmit}
          handleDescriptionChange={handleDescriptionChange}
          handleTagChange={handleTagChange}
          handleAmountChange={handleAmountChange}
          formatDateForInput={formatDateForInput}
          formatDateTime={formatDateTime}
          setEditData={setEditData}
          closeModal={closeModal}
        />

        <AccountModal
          isDarkMode={isDarkMode}
          isModalOpenAccount={isModalOpenAccount}
          newAccount={newAccount}
          setNewAccount={setNewAccount}
          newCurrency={newCurrency}
          setNewCurrency={setNewCurrency}
          editAccountId={editAccountId}
          handleSaveAccount={handleSaveAccount}
          handleCreateAccount={handleCreateAccount}
          closeModalAccount={closeModalAccount}
        />

        <div className="FlexContainer">
          <div
            className={`FlexContainerItemDouble FlexContainerItem ${
              isDarkMode ? "dark" : "light"
            }`}
          >
            <TransactionTable
              account={activeAccount}
              dataList={dataList}
              isDarkMode={isDarkMode}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              openModal={openModal}
              fetchAccountLis={fetchAccountList}
            />
          </div>

          <div
            className={`FlexContainerItemAccount FlexContainerItem ${
              isDarkMode ? "dark" : "light"
            }`}
          >
            <div className="accountButtons">
              <Slider {...settings}>
                {fetchedAccountList?.map((account) => (
                  <div key={activeAccount.id}>
                    <AccountCard
                      isDarkMode={isDarkMode}
                      account={account}
                      activeAccount={activeAccount}
                      handleAccountChange={handleAccountChange}
                      handleEditAccount={handleEditAccount}
                      handleDelete={handleDeleteAccount}
                      editAccountId={editAccountId}
                      setEditAccountId={setEditAccountId}
                      fetchAccountList={fetchAccountList}
                    />
                  </div>
                ))}
              </Slider>
              <div className="buttonTransaction">
                <MainButton
                  isDarkMode={isDarkMode}
                  onClick={openModalAccount}
                  buttonText="+ account"
                />
              </div>
            </div>
          </div>
          <div className={`FlexContainerItem ${isDarkMode ? "dark" : "light"}`}>
            <ApexChart isDarkMode={isDarkMode} chartData={chartData} />
          </div>
          <div className={`FlexContainerItem ${isDarkMode ? "dark" : "light"}`}>
            <AreaCharts
              isDarkMode={isDarkMode}
              formatBalance={formatBalance}
              chartDataSchedule={chartDataSchedule}
            />
          </div>
          <div className={`FlexContainerItem ${isDarkMode ? "dark" : "light"}`}>
            <Converter isDarkMode={isDarkMode} />
          </div>
          <div className={`FlexContainerItem ${isDarkMode ? "dark" : "light"}`}>
            <MoneyBox
              account={activeAccount}
              isDarkMode={isDarkMode}
              currentBalanceMoneyBox={currentBalanceMoneyBox}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
