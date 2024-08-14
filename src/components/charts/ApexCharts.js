import React from "react";
import ReactApexChart from "react-apexcharts";

import "./ApexChart.css";
import "../Style.css";
import "../../components/dashboard/Dashboard.css";

const ApexChart = ({ isDarkMode, chartData }) => {
  const chartIsEmpty = chartData.series.length === 0;

  return (
    <div className={`converter ${isDarkMode ? "dark" : "light"}`}>
      <p className="title">most common monthly expenses</p>
      <div id="chart" >
        {chartIsEmpty ? (
          <ReactApexChart
            options={{
              chart: {
                width: 400,
                type: "donut",
              },

              labels: ["Category 1", "Category 2", "Category 3"],

              legend: {
                position: "bottom",
              },
              colors: [  "#E96E94",
        "#5EC7DD",
        "#ffcd38",
        "#9ddd5e",
        "#9dafb4",],
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
            width={400}
          />
        ) : (
          <ReactApexChart
            options={{
              ...chartData.options,
          
            }}
            series={chartData.series}
            type="donut"
            width={400}
          />
        )}
      </div>
    </div>
  );
};

export default ApexChart;