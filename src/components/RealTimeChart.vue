<template>
  <div style="width: 100%; overflow-x: auto">
    <div
      :style="{
        width: [...Array(80).keys()].length * 10 + 'px',
      }"
      style="overflow: hidden"
    >
      <!-- <div style="overflow: hidden"> -->
      <canvas
        ref="myChart"
        :width="width"
        :height="height"
        style="background-color: black"
      ></canvas>
      <!-- <input type="button" value="Add Data" @click="addData" /> -->
    </div>
  </div>
</template>

<script>
import { Chart } from "chart.js";
import "chartjs-plugin-streaming";
import "chartjs-adapter-moment";
import { RealTimeScale, StreamingPlugin } from "chartjs-plugin-streaming";
import { fileData } from "@/views/testData";
// import { fileData } from "@/views/testData";
Chart.register(StreamingPlugin, RealTimeScale);

export default {
  name: "sales-chart",
  props: {
    // The canvas's width.
    width: {
      type: Number,
      validator: (value) => value > 0,
    },

    // The canvas's height.
    height: {
      type: Number,
      validator: (value) => value > 0,
    },

    // The chart's data.labels
    labels: Array,

    // The chart's data.datasets
    datasets: {
      type: Array,
      //   required: true,
    },

    // The chart's options.
    options: Object,
  },
  methods: {
    // addData(myLineChart) {
    //   let zero = 0;
    //   var value = Math.floor(Math.random() * 100 + 1);
    //   myLineChart.data.labels.push(zero);
    //   myLineChart.data.labels.splice(0, 1);
    //   myLineChart.data.datasets[0].data.splice(0, 1);
    //   //   console.log(myLineChart.data.datasets[0].data);
    //   myLineChart.data.datasets[0].data.push(value);
    //   myLineChart.update();
    //   zero++;
    // },
  },
  mounted() {
    var zero = 0;
    function adddata() {
      var value = Math.floor(Math.random() * 100 + 1);
      myLineChart.data.labels.push(zero);
      myLineChart.data.labels.splice(0, 5);
      myLineChart.data.datasets[0].data.splice(0, 5);
      //   console.log(myLineChart.data.datasets[0].data);
      myLineChart.data.datasets[0].data.push(value);
      myLineChart.update();
      zero++;
    }
    setInterval(function () {
      adddata();
      //   console.log(myLineChart);
    }, 1000);

    var myLineChart = new Chart(this.$refs.myChart, {
      type: "line",
      data: {
        labels: [...Array(1000).keys()],
        datasets: [
          {
            label: "2018 Sales",
            data: fileData.ecg_vals,
            // data: [],
            borderColor: "red",
            hoverBorderColor: "red",
            tension: 0.4,
            borderWidth: 1,
            fill: false,
            pointRadius: 0.1,
          },
        ],
      },
      options: {
        showLine: true,
        scales: {
          yAxes: {
            display: true,
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 100,
            },
          },
        },
      },
    });
    myLineChart.update();
  },
};
</script>

<style scoped></style>
