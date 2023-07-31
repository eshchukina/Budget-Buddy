import React from 'react';
import ReactApexChart from 'react-apexcharts';

import "./ApexChart.css";
import "./Style.css";
import "./Dashboard.css";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [50, 55, 13, 43, 22],
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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
        colors: ['#E96E94', '#5EC7DD', '#FFCD38', '#9DDD5E', '#3344FF'], // Задайте желаемые цвета для диаграммы
      }
    };
  }

  render() {
    return (
      <div className="mainField">
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={380} />
        </div>
      </div>
    )
  }
}

export default ApexChart;

