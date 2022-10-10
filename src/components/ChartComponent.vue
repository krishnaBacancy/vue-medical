<template>
  <div style="height: 30vh; width: 30vw">
    <canvas :width="width" :height="height" :id="id"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
// import axios from "axios";
export default {
  props: [
    "id",
    "width",
    "height",
    "type",
    "title",
    "labels",
    "data",
    "fill",
    "backgroundColor",
    "borderColor",
    "borderWidth",
  ],
  methods: {
    // destroyChart(){
    //     let myChart = this.id
    //     myChart.destroy()
    // },
    plotChartData() {
      const ctx = document.getElementById(this.id).getContext("2d");
      new Chart(ctx, {
        type: this.type ? this.type : "bar",
        data: {
          labels: this.labels,
          datasets: [
            {
              label: this.title,
              data: this.data,
              fill: this.fill,
              backgroundColor: this.backgroundColor,
              borderColor: this.borderColor,
              borderWidth: this.borderWidth ? this.borderWidth : 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              min: 0,
              max: 1000000,
            },
          },
          responsive: true,
          xAxes: {
            type: "time",
          },
          yAxes: {},
        },
      });
    },
    // apiChartData() {
    //   console.log("datesData--", this.labels);
    //   console.log('data--', this.data)
    //   const data = this.labels?.map((date, index) => ({
    //     x: new Date(date * 1000),
    //     y: this.data[index],
    //   }));
    //   const ctx = document.getElementById(this.id).getContext("2d");
    //   // eslint-disable-next-line no-undef,no-unused-vars
    //   new Chart(ctx, {
    //     type: this.type,
    //     data: {
    //       datasets: [
    //         {
    //           data,
    //           label: "Chart from API ",
    //           borderColor: "#7367F0",
    //         },
    //       ],
    //     },
    //     options: {
    //       scales: {
    //         xAxes: {
    //           type: "time",
    //           time: {
    //             unit: "month",
    //             // displayFormats: {
    //             //   month: "MMM YYYY",
    //             // },
    //           },
    //         },
    //         yAxes: {
    //           ticks: {
    //             // eslint-disable-next-line no-unused-vars
    //             callback(value, index, values) {
    //               return `${value}%`;
    //             },
    //           },
    //         },
    //       },
    //     },
    //   });
    // },
  },
  mounted() {
    // this.destroyChart()
    this.plotChartData();
    // this.apiChartData();
    // this.getChartData();
  },
};
</script>

<style scoped></style>
