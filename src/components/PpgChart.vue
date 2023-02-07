<template>
  <div></div>
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

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

export default {
  name: "ppg-chart",
  data() {
    return {
      myChart: null,
      displayedPpgData: 0,
      setIntervalMethod: null,
    };
  },
  props: {
    width: {
      type: Number,
      validator: (value) => value > 0,
    },
    height: {
      type: Number,
      validator: (value) => value > 0,
    },
    ppgDataFromProps: {
      type: Array,
    },
  },
  destroyed() {
    if (this.myChart) {
      this.myChart?.destroy();
    }
    clearInterval(this.setIntervalMethod);
  },
  watch: {
    ppgDataFromProps: {
      immediate: true,
      async handler(val) {
        if (val?.length && val.length > 0) {
          let buffer = JSON.parse(JSON.stringify(val));
          if (this.myChart) {
            clearInterval(this.setIntervalMethod);
            this.setIntervalMethod = setInterval(async () => {
              await this.adddatafromprops(buffer, 200);
              buffer.splice(0, 200);
              if (!buffer.length) {
                clearInterval(this.setIntervalMethod);
              }
            }, 1000);
            await this.adddatafromprops(buffer, 200);
            buffer.splice(0, 200);
          } else {
            var canvas = document.createElement("canvas");
            canvas.id = "myLineChart";
            canvas.width = this.width;
            canvas.height = this.height;
            canvas.style.backgroundColor = "#fff";

            var body = document.getElementById("ppgCanvas");
            body.appendChild(canvas);
            const ctx = document.getElementById("myLineChart").getContext("2d");
            this.myChart = new Chart(ctx, {
              type: "line",
              data: {
                labels: [...Array(1000).keys()],
                datasets: [
                  {
                    label: "ECG",
                    data: buffer.slice(0, 1000),
                    borderColor: "green",
                    borderWidth: 1,
                    hoverBorderColor: "red",
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
                  },
                },
                responsive: true,
                aspectRatio: 1.2,
                maintainAspectRatio: false,
                spanGaps: false,
                scales: {
                  y: {
                    suggestedMin: 0,
                    min: Math.min(...buffer.slice(0, 1000)) - 5000,
                    max: Math.max(...buffer.slice(0, 1000)) + 5000,
                    stacked: true,
                    offset: true,
                    ticks: {
                      // color: "#FFFFFF",
                    },
                  },
                  x: {
                    ticks: {
                      major: {
                        enabled: true,
                      },
                      color: "#FFFFFF",
                      displayFormats: 1,
                      maxRotation: 0,
                      minRotation: 0,
                      stepSize: 1,
                      minUnit: "second",
                      source: "data",
                      autoSkip: true,
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
            clearInterval(this.setIntervalMethod);
            buffer.splice(0, 1000);
            this.setIntervalMethod = setInterval(async () => {
              await this.adddatafromprops(buffer, 100);
              buffer.splice(0, 100);
              if (!buffer.length) {
                console.log("empty - 187");
                clearInterval(this.setIntervalMethod);
              }
            }, 1000);
            this.myChart?.update("none");
          }
        }
      },
    },
  },
  methods: {
    adddatafromprops(buffer, endIndex) {
      if (buffer.length) {
        for (let i = 0; i < endIndex; i++) {
          if (buffer[i]) {
            this.myChart?.data.labels.splice(0, 1);
            this.myChart?.data.datasets[0].data.splice(0, 1);
            this.myChart?.data.labels.push(
              this.myChart?.data.labels.length + i
            );
            this.myChart?.data.datasets[0].data.push(buffer[i]);
          }
        }
        this.myChart.options.scales.y.min =
          Math.min(...this.myChart?.data.datasets[0].data) - 5000;
        this.myChart.options.scales.y.max =
          Math.max(...this.myChart?.data.datasets[0].data) + 5000;
        this.myChart?.update("none");
      }
    },
  },
};
</script>
