import React from "react";
import ReactApexChart from "react-apexcharts";

import "./ApexChart.css";
import "../Style.css";
import "../../components/dashboard/Dashboard.css";

const ApexChart = ({ isDarkMode, chartData }) => {
  const chartIsEmpty = chartData.series.length === 0;

  return (
    <div className={`mainField ${isDarkMode ? "dark" : "light"}`}>
      <p className="title">most common monthly expenses</p>
      <div id="chart" className="converter">
        {chartIsEmpty ? (
          <ReactApexChart
            options={{
              chart: {
                width: 350,
                type: "donut",
              },

              labels: ["Category 1", "Category 2", "Category 3"],

              legend: {
                position: "right",
              },
              colors: ["#E96E94", "#5EC7DD", "#ffcd38"],
              title: {
                text: "",
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
            width={350}
          />
        ) : (
          <ReactApexChart
            options={{
              ...chartData.options,
              legend: {
                position: "right",
              },
            }}
            series={chartData.series}
            type="donut"
            width={350}
          />
        )}
      </div>
    </div>
  );
};

export default ApexChart;
