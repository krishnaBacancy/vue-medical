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
    </div>
  </div>
</template>

<script>
import { Chart } from "chart.js";
import moment from "moment";
import "chartjs-plugin-streaming";
import "chartjs-adapter-moment";
import { RealTimeScale, StreamingPlugin } from "chartjs-plugin-streaming";
import { fileData } from "@/views/testData";
// import { fileData } from "@/views/testData";
Chart.register(StreamingPlugin, RealTimeScale);

export default {
  name: "monthly-sales-chart",
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
  mounted() {
    const data = [];
    let prev = 100;
    for (let i = 0; i < 1000; i++) {
      prev += 5 - Math.random() * 10;
      data.push({ x: i, y: prev });
    }

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
        labels: [...Array(900).keys()],
        datasets: [
          {
            label: "2018 Sales",
            // data: fileData.ecg_vals,
            data: [],
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
        elements: {
          line: {
            tension: 0.5,
          },
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
            type: "realtime",
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
                chart.data.datasets.map((dataset, idx) => {
                  // dataset.data = fileData.ecg_vals;
                  // console.log("dataset--", dataset.data);
                  dataset.data.push({
                    x: moment(),
                    // y: [Math.random() * 100],
                    //eslint-disable-next-line
                    y: fileData.ecg_vals[idx],
                  });
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
              color: "#FFFFFF",
              displayFormats: 1,
              maxRotation: 0,
              minRotation: 0,
              stepSize: 1,
              maxTicksLimit: 30,
              minUnit: "second",
              source: "data",
              autoSkip: true,
              callback: function (value) {
                return moment(value, "HH:mm:ss").format("ss").concat("s");
              },
            },
            time: {
              unit: "second",
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

<style scoped></style>
