<template>
  <div style="width: 100%" class="main__div">
    <div style="overflow: hidden; width: 101%">
      <!-- <div style="overflow: hidden"> -->
      <canvas
        ref="myLineChart"
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
      handler() {
        // console.log("value--", val);
        // console.log("ppg--", this.ppgDatasets);
        // console.log("datasets--", this.datasets);
        // console.log("chartData--", this.chartData);
      },
    },
  },
  mounted() {
    var zero = 0;
    function adddata() {
      var value = Math.floor(Math.random() * 100 + 1);
      myLineChart?.data.labels.push(zero);
      myLineChart?.data.labels.splice(0, 10);
      myLineChart?.data.datasets[0].data.splice(0, 30);
      //   console.log(myLineChart.data.datasets[0].data);
      myLineChart?.data.datasets[0].data.push(value);
      myLineChart.update();
      zero++;
    }
    setInterval(function () {
      adddata();
      //   console.log(myLineChart);
    }, 1000);

    const data = [];
    let prev = 100;
    for (let i = 0; i < 1000; i++) {
      prev += 5 - Math.random() * 10;
      data.push({ x: i, y: prev });
    }

    var myLineChart = new Chart(this.$refs.myLineChart, {
      type: "line",
      data: {
        labels: [...Array(2000).keys()],
        datasets: [
          {
            label: "PPG",
            // data: fileData.ppg_vals,
            data: this.ppgDatasets,
            borderColor: "green",
            hoverBorderColor: "red",
            tension: 0.4,
            borderWidth: 3,
            fill: false,
            pointRadius: 0.1,
            categoryPercentage: 1.5,
          },
        ],
      },
      options: {
        elements: {
          line: {
            tension: 0.5,
          },
        },
        responsive: true,
        aspectRatio: 1.2,
        maintainAspectRatio: false,
        spanGaps: false,
        showLine: true,
        scales: {
          // yAxes: {
          //   display: false,
          //   ticks: {
          //     beginAtZero: true,
          //     //   min: 0,
          //     //   max: 100,
          //   },
          // },
          y: {
            suggestedMin: 0,
            // min: Math.min(...fileData.ecg_vals),
            // max: Math.max(...fileData.ecg_vals),
            min: this.minValue,
            max: this.maxValue,
            stacked: true,
            offset: true,
          },
          x: {
            display: false,
            grid: {
              display: false,
            },
            ticks: {
              major: {
                enabled: true,
              },
              color: "#FFFFFF",
              displayFormats: 1,
              maxRotation: 0,
              minRotation: 0,
              stepSize: 1,
              // maxTicksLimit: 10,
              minUnit: "millisecond",
              source: "data",
              autoSkip: true,
              // callback: function (value) {
              //   return moment(value, "HH:mm:ss").format("ss").concat("s");
              //   // return moment(value, "HH:mm:ss:SSS").format("SSS").concat("ms");
              // },
            },
          },
        },
      },
    });
    myLineChart.update();
    // this.createChart();
  },
};
</script>

<style scoped>
.main__div:hover {
  overflow-x: hidden;
}
</style>
