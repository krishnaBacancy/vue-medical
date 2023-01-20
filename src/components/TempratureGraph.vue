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
  name: "temprature-chart",
  props: {
    tempratureData: { type: Array },
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
      tempratureChart: null,
      setIntervalMethod: null,
    };
  },
  watch: {
    tempratureData: {
      immediate: true,
      async handler(val) {
        if (val?.length && val.length > 0) {
          let buffer = JSON.parse(JSON.stringify(val));
          console.log("buffer", buffer);
          if (
            this.tempratureChart &&
            document.getElementById(`temp-chart-${this.macAddress}`)
          ) {
            console.log("chart exist");
            this.tempratureChart.render();
          } else {
            let ctx;
            if (document.getElementById(`temp-chart-${this.macAddress}`)) {
              ctx = document
                .getElementById(`temp-chart-${this.macAddress}`)
                ?.getContext("2d");
            } else {
              var canvas = document.createElement("canvas");
              canvas.id = `temp-chart-${this.macAddress}`;
              canvas.width = this.width;
              canvas.height = this.height;

              var body = document.getElementById(`temp-${this.macAddress}`);
              console.log("body", body);
              body?.appendChild(canvas);
              ctx = document
                .getElementById(`temp-chart-${this.macAddress}`)
                ?.getContext("2d");
            }
            console.log("ctx", ctx);
            if (this.tempratureChart != null) {
              this.tempratureChart?.destroy();
            }
            if (ctx) {
              this.tempratureChart = await new Chart(ctx, {
                type: "bar",
                data: {
                  labels: ["12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm"],
                  datasets: [
                    {
                      label: "Temprature",
                      data: buffer?.map((d) => Math.round(d["temp"])),
                      borderWidth: 1,
                      hoverBorderColor: "red",
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
              this.tempratureChart.render();
            }
          }
        }
      },
    },
  },
  destroyed() {
    if (this.tempratureChart) {
      this.tempratureChart?.destroy();
      this.tempratureChart = null;
    }
    if (document.getElementById("barCanvas")) {
      document.getElementById("barCanvas").innerHTML = null;
    }
  },
};
</script>
