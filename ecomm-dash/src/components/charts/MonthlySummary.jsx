import React, { Component } from "react";
import Chart from "react-apexcharts";

class MontlySummaryChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Totale",
          data: [44, 55, 41, 37, 22, 43, 21],
        },
        {
          name: "Spedizioni",
          data: [53, 32, 33, 52, 13, 43, 32],
        },
        {
          name: "Tasse",
          data: [12, 17, 11, 9, 15, 11, 20],
        },
        {
          name: "Guadagno",
          data: [9, 7, 5, 8, 6, 9, 4],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 1,
          colors: ["#fff"],
        },
        title: {
          text: "SOMMARIO MENSILE",
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
        yaxis: {
          title: {
            text: undefined,
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40,
        },
      },
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

export default MontlySummaryChart;
