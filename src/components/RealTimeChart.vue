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
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
} from "chart.js";
import "chartjs-plugin-streaming";
import "chartjs-adapter-moment";
import { RealTimeScale, StreamingPlugin } from "chartjs-plugin-streaming";
import { fileData } from "@/views/testData";
// import { fileData } from "@/views/testData";
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  StreamingPlugin,
  RealTimeScale,
  CategoryScale
);

export default {
  name: "sales-chart",
  data() {
    return {
      chartData: [],
    };
  },
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
    minValue: Number,
    maxValue: Number,
    // The chart's data.labels
    labels: Array,

    // The chart's data.datasets
    ppgDatasets: {
      type: Array,
      //   required: true,
    },

    // The chart's options.
    options: Object,
  },
  watch: {
    ppgDatasets: {
      // This will let Vue know to look inside the array
      deep: true,
      // immediate: true,

      // We have to move our method to a handler field
      handler(val) {
        console.log("value--", val);
        // console.log("datasets--", this.datasets);
        // console.log("chartData--", this.chartData);
      },
    },
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
    createChart() {
      console.log("ppgDataaaa-", this.ppgDatasets);
      var zero = 0;
      function adddata() {
        var value = Math.floor(Math.random() * 100 + 1);
        myLineChart?.data.labels.push(zero);
        myLineChart?.data.labels.splice(0, 5);
        myLineChart?.data.datasets[0].data.splice(0, 5);
        //   console.log(myLineChart.data.datasets[0].data);
        myLineChart?.data.datasets[0].data.push(value);
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
          labels: [...Array(2000).keys()],
          datasets: [
            {
              label: "2018 Sales",
              data: fileData.ppg_vals,
              // data: this.ppgDatasets,
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
              display: false,
              ticks: {
                beginAtZero: true,
                //   min: 0,
                //   max: 100,
              },
            },
            y: {
              min: Math.min(...fileData.ecg_vals),
              max: Math.max(...fileData.ecg_vals),
              // min: this.minValue,
              // max: this.maxValue,
            },
            x: {
              display: false,
            },
          },
        },
      });
      myLineChart.update();
    },
  },
  updated() {
    var dat = this.$props;
    console.log("updated", dat);
    if (dat.datasets.length > 0) {
      this.createChart();
    }
  },
  mounted() {
    this.createChart();
  },
};
</script>

<style scoped></style>
