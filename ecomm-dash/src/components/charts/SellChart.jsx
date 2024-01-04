import React, { Component } from "react";
import Chart from "react-apexcharts";

class SellChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors: ["#00FF00"],
        chart: {
          toolbar: {
            show: false,
          },
        },
        grid: {
          show: false,
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: "center",
            },
          },
        },
        title: {
          text: "SCARPE VENDUTE",
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
          name: "Vendite",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 50, 100, 150, 70],
        },
      ],
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        width="100%"
        height="100%"
      />
    );
  }
}

export default SellChart;
