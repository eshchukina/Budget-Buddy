import React from "react";
import ReactApexChart from "react-apexcharts";

import "./ApexChart.css";
import "./Style.css";
import "./Dashboard.css"

const ApexChart = ({ account, isDarkMode, chartData }) => {
  const chartIsEmpty = chartData.series.length === 0;

  return (
    <div className={`mainField ${isDarkMode ? "dark" : "light"}`}>
     


      <div id="chart" className="secondt chart">
        {chartIsEmpty ? (
          <ReactApexChart
            options={{
              chart: {
                width: 345,
                type: "donut",
              },

             

              
              labels: ["Category 1", "Category 2", "Category 3"],
              
              legend: {
                position: "bottom",
              },
              colors: ["#E96E94", "#5EC7DD", "#ffcd38"],
              title: {
                text: "most common monthly expenses",
                align: "center",
                style: {
                  fontSize: "18px",
                  fontFamily: "'Ysabeau SC', sans-serif",
                  color: "#9dafb4",
                },
              },
            }}
            series={[50, 30, 20]}
            type="donut"
            width={345}
          />
        ) : (
          <ReactApexChart
            options={{
              ...chartData.options,
              legend: {
                position: "bottom",
              },
            }}  
            series={chartData.series}
            type="donut"
            width={345}
          />
        )}
      </div>
    </div>
  );  
};

export default ApexChart;
