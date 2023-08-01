import React, { useState, useEffect } from "react";import ReactApexChart from 'react-apexcharts';
import config from '../config';

import "./ApexChart.css";
import "./Style.css";
import "./Dashboard.css";

const ApexChart = ({ account, isDarkMode, chartData }) => {
//   const [chartData, setChartData] = useState({
//     series: [], 
//     options: {
//       chart: {
//         width: 380,
//         type: 'pie',
//       },
//       labels: [], 
//       responsive: [{
//         breakpoint: 480,
//         options: {
//           chart: {
//             width: 200
//           },
//           legend: {
//             position: 'bottom'
//           }
//         }
//       }],
//       colors: ['#E96E94', '#5EC7DD', '#ffcd38', '#9ddd5e', '#1b414c'],
//       dataLabels: {
//         style: {
//           colors: ['#fff'] 
//         }
//       }
//     }
//   });
  

//   useEffect(() => {
//   const fetchChartData = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const headersWithToken = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       };

//       const response = await fetch(`${config.apiUrl}accounts/${account.id}/statistics`, {
//         headers: headersWithToken,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch account statistics");
//       }

//       const data = await response.json();

     
//       const chartLabels = Object.keys(data);
//       const seriesData = Object.values(data).map(value => parseFloat(value));
//       setChartData(prevState => ({
//         ...prevState,
//         series: seriesData,
//         options: {
//           ...prevState.options,
//           labels: chartLabels,
//         },
//       }));
//     } catch (error) {
//       console.log("Error fetching account statistics:", error.message);
//     }
//   };
//   if (account) {
//     fetchChartData()
//   }
// }, [account]);





  const chartIsEmpty = chartData.series.length === 0;



  return (
    <div className={`mainField ${isDarkMode ? 'dark' : 'light'}`}>
    <div id="chart">
      {chartIsEmpty ? (
        <p className='textShedule'>here is your spending schedule</p>
      ) : (
        <ReactApexChart options={chartData.options} series={chartData.series} type="pie" width={380} />
      )}
    </div>
  </div>
);
};

export default ApexChart;

