import React from "react";
import ReactApexChart from "react-apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import "./AreaCharts.css";
import "./Style.css";

const AreaCharts = ({ account, chartDataSchedule, isDarkMode, formatBalance }) => {
  const chartIsEmpty = !chartDataSchedule.series || chartDataSchedule.series.length === 0;

  const axisLabelColor = '#9dafb4';
  const axisLabelFontSize = '10px'; 
  const axisTitleFontSize = '10px'; 
  const axisTitleMargin = 10; 
  const lineColors = ['#E96E94', '#5EC7DD'];
  const areaColors = ['#E96E94', '#5EC7DD']; 




  
  const options = chartIsEmpty
    ? {
        chart: {
          height: 350,
          type: 'area',
          background: 'transparent',
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: []
        },
        tooltip: {
          x: {
            format: '/MM/yy'
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: axisLabelColor,
              fontSize: axisLabelFontSize
            }
          },
          title: {
            text: 'Y-Axis Title',
            style: {
              color: axisLabelColor,
              fontSize: axisTitleFontSize,
            }
          }
        },
        legend: {
          labels: {
            colors: lineColors,
            style: {
              fontSize: '14px',
            },
          },
        },
      }
    : {
        ...chartDataSchedule.options,
        stroke: {
          curve: 'smooth',
          colors: lineColors
        },
        fill: {
          colors: areaColors
        },
        xaxis: {
          ...chartDataSchedule.options.xaxis,
          labels: {
            show: true,
            style: {
              colors: '#9dafb4',
              fontSize: '13px'
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: axisLabelColor,
              fontSize: axisLabelFontSize
            }
          },
          title: {
            style: {
              color: axisLabelColor,
              fontSize: axisTitleFontSize,
              margin: `${axisTitleMargin}px 0`
            }
          },
        },
      };

  const series = chartIsEmpty ? [] : chartDataSchedule.series;

  return (
    <div className={`mainField ${isDarkMode ? "dark" : "light"}`}>
      <div id="chart2" className="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
         
          height={200}
        />
        <div className="labelG">
          <p className="labelT">
            positive amount {formatBalance}{" "}
            <FontAwesomeIcon className="pos" icon={faCircle} /> negative amount{" "}
            <FontAwesomeIcon className="neg" icon={faCircle} />{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AreaCharts;
