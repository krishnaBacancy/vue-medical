<template>
  <div style="width: 100%" class="main__div">
    <div style="overflow: hidden; width: 101%">
      <!-- <div style="overflow: hidden"> -->
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
  data() {
    return {
      ecgData: [],
    };
  },
  // watch: {
  //   chartData: {
  //     deep: true,
  //     // handler(val) {
  //     //   // this.ecgData = val;
  //     //   // console.log("chartData---", val);
  //     // },
  //   },
  // },
  mounted() {
    var zero = 0;
    function adddata() {
      var value = Math.floor(Math.random() * 100 + 1);
      myChart?.data.labels.push(zero);
      myChart?.data.labels.splice(0, 10);
      myChart?.data.datasets[0].data.splice(0, 30);
      //   console.log(myLineChart.data.datasets[0].data);
      myChart?.data.datasets[0].data.push(value);
      myChart.update();
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

    var index = 0;

    // const totalDuration = 10000;
    // const delayBetweenPoints = totalDuration / data.length;
    // const previousY = (ctx) =>
    //   ctx.index === 0
    //     ? ctx.chart.scales.y.getPixelForValue(100)
    //     : ctx.chart
    //         .getDatasetMeta(ctx.datasetIndex)
    //         .data[ctx.index - 1].getProps(["y"], true).y;

    const myChart = new Chart(this.$refs.myChart, {
      type: "line",
      data: {
        labels: [...Array(2000).keys()],
        datasets: [
          {
            label: "ECG",
            // data: fileData.ecg_vals,
            data: this.chartData,
            // data: this.ecgData,
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
        // transitions: {
        //   zoom: {
        //     animation: {
        //       duration: 1000,
        //       easing: "easeInCirc",
        //     },
        //   },
        // },
        plugins: {
          streaming: {
            refresh: 1000,
          },
          // zoom: {
          //   zoom: {
          //     wheel: {
          //       enabled: true,
          //     },
          //     mode: "x",
          //   },
          //   // limits: {
          //   //   // y: { min: 0, max: 100000 },
          //   //   x: { min: 0, max: 30 },
          //   // },
          // },
        },
        // animation: {
        //   x: {
        //     type: "number",
        //     easing: "linear",
        //     duration: delayBetweenPoints,
        //     from: NaN, // the point is initially skipped
        //     delay(ctx) {
        //       if (ctx.type !== "data" || ctx.xStarted) {
        //         return 0;
        //       }
        //       ctx.xStarted = true;
        //       return ctx.index * delayBetweenPoints;
        //     },
        //   },
        //   y: {
        //     type: "number",
        //     easing: "linear",
        //     duration: delayBetweenPoints,
        //     from: previousY,
        //     delay(ctx) {
        //       if (ctx.type !== "data" || ctx.yStarted) {
        //         return 0;
        //       }
        //       ctx.yStarted = true;
        //       return ctx.index * delayBetweenPoints;
        //     },
        //   },
        // },
        layout: {
          padding: {
            // bottom: -20,
          },
        },
        responsive: true,
        aspectRatio: 1.2,
        maintainAspectRatio: false,
        spanGaps: false,
        scales: {
          y: {
            suggestedMin: 0,
            min: this.minValue,
            max: this.maxValue,
            // min: Math.min(...fileData.ecg_vals),
            // max: Math.max(...fileData.ecg_vals),
            // suggestedMax: 1000000,
            stacked: true,
            offset: true,
            grid: {
              // color: "green",
              // display: false,
            },
            ticks: {
              color: "#FFFFFF",
            },
            // display: false,
          },
          x: {
            // min: 0,
            // max: fileData.ecg_vals.length + fileData.ecg_vals.length,
            // type: "realtime",
            display: false,
            realtime: {
              onRefresh: (chart) => {
                // console.log("chart--", chart);
                // chart.data.datasets = fileData.ecg_vals;
                // let dummyData = fileData.ecg_vals;
                // let values;
                // for (let elements of dummyData.values()) {
                //   values = elements;
                // }
                //eslint-disable-next-line
                chart.data.datasets.map((dataset) => {
                  // dataset.data = fileData.ecg_vals;
                  // console.log("dataset--", dataset.data);
                  dataset.data.push({
                    // x: moment(),
                    x: [...Array(2000)].keys(),
                    // y: [Math.random() * 100],
                    //eslint-disable-next-line
                    y: fileData.ecg_vals[index],
                    // y: this.chartData[index],
                  });
                  index = index + 10;
                  chart.update();
                  // console.log("data--", dataset.data);
                });
              },
            },
            // distribution: "linear",
            // realtime: {
            //   onRefresh: function (chart) {
            //     chart.data.datasets[0].data.push({
            //       x: moment(),
            //       // y: Math.random(),
            //     });
            //   },
            // delay: 3000,
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
              minUnit: "millisecond",
              source: "data",
              autoSkip: true,
              // callback: function (value) {
              //   return moment(value, "HH:mm:ss").format("ss").concat("s");
              //   // return moment(value, "HH:mm:ss:SSS").format("SSS").concat("ms");
              // },
            },
            time: {
              unit: "millisecond",
              displayFormat: "h:mm",
            },
            grid: {
              display: false,
            },
            // offset: true,
            // max: 70,
            // display: false,
          },
          // xAxes: {
          //   // type: "time",
          //   position: "bottom",
          //   time: {
          //     displayFormats: {
          //       years: "YYYY",
          //     },
          //     unit: "year",
          //   },
          // },
          // yAxes: {
          //   display: true,
          //   ticks: {
          //     stepSize: 20,
          //     // beginAtZero: true,
          //     // steps: 10,
          //     // stepValue: 5,
          //     // min: 0,
          //     // max: 100000,
          //     // precision: 0,
          //   },
          // },
        },
      },
    });
    myChart.update();
  },
};
</script>

<style scoped>
.main__div:hover {
  overflow-x: auto;
}
</style>
