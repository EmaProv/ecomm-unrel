import React, { Component } from "react";
import Chart from "react-apexcharts";

var Bar = true;
const chartW = window.screen.width;

if (chartW <= 500) {
  Bar = false;
}

class UserChart extends Component {
  constructor(props) {
    super(props);

    {
      Bar
        ? (this.state = {
            options: {
              colors: ["#FF00FF"],
              chart: {
                toolbar: {
                  show: true,
                },
              },
              grid: {
                show: false,
              },
              dataLabels: {
                enabled: false,
              },
              title: {
                text: "UTENTI REGISTRATI",
                align: "center",
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                  fontSize: "25px",
                  fontWeight: "bold",
                },
              },
              xaxis: {
                labels: {
                  rotate: -45,
                  rotateAlways: true,
                  style: {
                    fontSize: "0.9em",
                  },
                },
                categories: [
                  "Gennaio",
                  "Febbraio",
                  "Marzo",
                  "Aprile",
                  "Maggio",
                  "Giugno",
                  "Luglio",
                  "Agosto",
                  "Settembre",
                  "Ottonbre",
                  "Novembre",
                  "Dicembre",
                ],
              },
            },

            series: [
              {
                name: "Registrazioni",
                data: [30, 40, 45, 50, 49, 60, 70, 91, 50, 100, 150, 70],
              },
            ],
            responsive: [
              {
                breakpoint: undefined,
                options: {},
              },
            ],
          })
        : (this.state = {
            options: {
              colors: ["#FF00FF"],
              chart: {
                toolbar: {
                  show: false,
                },
              },
              grid: {
                show: false,
              },
              dataLabels: {
                enabled: false,
              },
              title: {
                text: "UTENTI REGISTRATI",
                align: "center",
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                  fontSize: "25px",
                  fontWeight: "bold",
                },
              },
              xaxis: {
                labels: {
                  rotate: -45,
                  rotateAlways: true,
                  style: {
                    fontSize: "0.9em",
                  },
                },
                categories: [
                  "Gennaio",
                  "Febbraio",
                  "Marzo",
                  "Aprile",
                  "Maggio",
                  "Giugno",
                  "Luglio",
                  "Agosto",
                  "Settembre",
                  "Ottonbre",
                  "Novembre",
                  "Dicembre",
                ],
              },
            },

            series: [
              {
                name: "Registrazioni",
                data: [30, 40, 45, 50, 49, 60, 70, 91, 50, 100, 150, 70],
              },
            ],
            responsive: [
              {
                breakpoint: undefined,
                options: {},
              },
            ],
          });
    }
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="area"
        width="100%"
        height="100%"
      />
    );
  }
}

export default UserChart;
