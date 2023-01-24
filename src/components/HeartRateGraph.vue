<template>
  <div></div>
</template>
<script>
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  BarController,
} from "chart.js";

Chart.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  BarController
);

export default {
  name: "HeartRateChart",
  props: {
    heartrateData: { type: Array },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    chartBgColor: {
      type: String,
    },
    macAddress: {
      type: String,
    },
  },
  data() {
    return {
      HeartRateChart: null,
      setIntervalMethod: null,
    };
  },
  watch: {
    heartrateData: {
      immediate: true,
      async handler(val) {
        if (val?.length && val.length > 0) {
          let buffer = JSON.parse(JSON.stringify(val));
          console.log("buffer", buffer);
          if (
            this.HeartRateChart &&
            document.getElementById(`heartRate-chart-${this.macAddress}`)
          ) {
            console.log("chart exist");
          } else {
            if (
              document.getElementById(`heartRate-${this.macAddress}`)?.innerHTML
            ) {
              document.getElementById(
                `heartRate-${this.macAddress}`
              ).innerHTML = null;
            }
            let ctx;
            // if (document.getElementById(`heartRate-chart-${this.macAddress}`)) {
            //   ctx = document
            //     .getElementById(`heartRate-chart-${this.macAddress}`)
            //     ?.getContext("2d");
            // } else {
            var canvas = document.createElement("canvas");
            canvas.id = `heartRate-chart-${this.macAddress}`;
            canvas.width = this.width;
            canvas.height = this.height;

            var body = document.getElementById(`heartRate-${this.macAddress}`);
            console.log("body", body);
            body?.appendChild(canvas);
            ctx = document
              .getElementById(`heartRate-chart-${this.macAddress}`)
              ?.getContext("2d");
            // }
            console.log("ctx", ctx);
            if (ctx) {
              this.HeartRateChart = await new Chart(ctx, {
                type: "bar",
                data: {
                  labels: ["12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm"],
                  datasets: [
                    {
                      label: "HeartRate",
                      data: buffer?.map((d) => Math.round(d["temp"])),
                      borderWidth: 1,
                      hoverBorderColor: "green",
                      fill: 1,
                      barPercentage: 0.25,
                      categoryPercentage: 1,
                      backgroundColor: this.chartBgColor,
                    },
                  ],
                },
                options: {
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        title: function () {
                          return "";
                        },
                      },
                    },
                  },
                  scales: {
                    x: {
                      display: false,
                    },
                  },
                },
              });
              this.HeartRateChart.render();
            }
          }
        }
      },
    },
  },
  destroyed() {
    if (this.HeartRateChart) {
      this.HeartRateChart?.destroy();
      this.HeartRateChart = null;
    }
  },
};
</script>
