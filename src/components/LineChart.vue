<template>
  <div style="width: 100%" class="main__div">
    <!-- <div
      style="overflow: hidden"
      :style="{
        width: [...Array(80).keys()].length * 10 + 'px',
      }"
    > -->
    <div style="overflow: hidden">
      <canvas
        ref="myChart"
        :width="width"
        :height="height"
        style="background-color: black"
      ></canvas>
    </div>
  </div>
</template>

<script>
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
// import moment from "moment";
import "chartjs-plugin-streaming";
import "chartjs-adapter-moment";
import { RealTimeScale, StreamingPlugin } from "chartjs-plugin-streaming";
import { mapGetters } from "vuex";
// import zoomPlugin from "chartjs-plugin-zoom";
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
  // zoomPlugin
);

export default {
  name: "monthly-sales-chart",
  props: {
    width: {
      type: Number,
      validator: (value) => value > 0,
    },
    height: {
      type: Number,
      validator: (value) => value > 0,
    },
    labels: Array,
    chartData: Array,
    datasets: {
      type: Array,
    },
    minValue: Number,
    maxValue: Number,
    options: Object,
  },
  watch: {
    getEcgChartData: {
      deep: true,
      handler(val) {
        console.log("ecgchartData--", val.length);
      },
    },
  },
  computed: {
    ...mapGetters("chartData", ["getEcgChartData", "getMinEcgData"]),
  },
  mounted() {
    let myChart;
    let zero = 0;
    function adddata() {
      // var value = Math.floor(Math.random() * 100 + 1);
      myChart?.data.labels.push(zero);
      myChart?.data.labels.splice(0, 10);
      myChart?.data.datasets[0].data.splice(0, 30);
      //   console.log(myLineChart.data.datasets[0].data);
      // myChart?.data.datasets[0].data.push(value);
      myChart?.update();
      zero++;
    }
    setInterval(function () {
      adddata();
    }, 1000);
    // const data = [];
    // let prev = 100;
    // for (let i = 0; i < 1000; i++) {
    //   prev += 5 - Math.random() * 10;
    //   data.push({ x: i, y: prev });
    // }

    myChart = new Chart(this.$refs.myChart, {
      type: "line",
      data: {
        labels: [...Array(2000).keys()],
        datasets: [
          {
            label: "ECG",
            // data: fileData.ecg_vals,
            // data: this.chartData,
            data: this.getEcgChartData,
            // data: [],
            borderColor: "red",
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
        interaction: {
          intersect: false,
        },
        plugins: {
          legend: {
            display: false,
          },
          streaming: {
            refresh: 100,
            duration: 20000,
            // ttl: 60000,
          },
        },
        responsive: true,
        aspectRatio: 1.2,
        maintainAspectRatio: false,
        spanGaps: false,
        scales: {
          y: {
            suggestedMin: 0,
            // min: this.minValue,
            // max: this.maxValue,
            // min: this.getMinEcgData - 30000,
            // max: this.getMinEcgData + 30000,
            min: Math.min(...this.getEcgChartData) + 110000,
            max: Math.max(...this.getEcgChartData) - 220000,
            // min: Math.min(...this.getEcgChartData),
            // max: Math.max(...this.getEcgChartData),
            stacked: true,
            offset: true,
            ticks: {
              color: "#FFFFFF",
            },
          },
          x: {
            // type: "realtime",
            // display: false,
            // realtime: {
            //   onRefresh: (chart) => {
            //     //eslint-disable-next-line
            //     chart.data.datasets.map((dataset) => {
            //       dataset.data.push({
            //         x: moment(),
            //         // x: [...Array(2000)].keys(),
            //         //eslint-disable-next-line
            //         // y: fileData.ecg_vals[index],
            //         y: this.chartData[index],
            //       });
            //       index = index + 10;
            //       chart.update();
            //     });
            //   },
            // },
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
              minUnit: "second",
              source: "data",
              autoSkip: true,
              // callback: function (value) {
              //   return moment(value, "HH:mm:ss").format("ss").concat("s");
              // },
            },
            time: {
              unit: "second",
              displayFormat: "h:mm",
            },
            grid: {
              display: false,
            },
            display: false,
          },
        },
      },
    });
    myChart.update();
  },
};
</script>

<style scoped>
.main__div:hover {
  overflow-x: hidden;
}
</style>
