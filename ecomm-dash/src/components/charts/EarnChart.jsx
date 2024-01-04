import React, { Component } from "react";
import Chart from "react-apexcharts";

class EarnChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [30, 40, 45, 50, 49, 60, 70, 91, 50, 100, 150, 70],

      options: {
        chart: {
          type: "donut",
          toolbar: {
            show: false,
          },
        },
        title: {
          text: "GUADAGNO NETTO",
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
        labels: [
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
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="donut"
        width="100%"
        height="100%"
      />
    );
  }
}

export default EarnChart;
