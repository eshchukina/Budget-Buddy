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
      <div id="chart">
        {chartIsEmpty ? (
          <ReactApexChart
            options={{
              chart: {
                width: 350,
                type: "donut",
              },

              labels: ["Category 1"],

              legend: {
                position: "bottom",
              },
              colors: ["#5EC7DD"],
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
            series={[50]}
            type="donut"
            width={350}
          />
        ) : (
          <ReactApexChart
            options={{
              ...chartData.options,
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
