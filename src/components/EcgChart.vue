<template>
  <div></div>
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

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

export default {
  name: "ecg-chart",
  props: {
    width: {
      type: Number,
      validator: (value) => value > 0,
    },
    height: {
      type: Number,
      validator: (value) => value > 0,
    },
    ecgDataFromProps: {
      type: Array,
    },
    macAddress: {
      type: String,
    },
  },
  data() {
    return {
      displayedECGdata: 0,
      myChart: null,
      setIntervalMethod: null,
    };
  },
  watch: {
    ecgDataFromProps: {
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
                console.log("empty buffer");
                clearInterval(this.setIntervalMethod);
              }
            }, 1000);
            await this.adddatafromprops(buffer, 200);
            buffer.splice(0, 200);
          } else {
            let ctx;
            if (document.getElementById(`ecg-chart-${this.macAddress}`)) {
              ctx = document
                .getElementById(`ecg-chart-${this.macAddress}`)
                .getContext("2d");
            } else {
              var canvas = document.createElement("canvas");
              canvas.id = `ecg-chart-${this.macAddress}`;
              canvas.width = this.width;
              canvas.height = this.height;
              canvas.style.backgroundColor = "#fff";

              var body = document.getElementById(this.macAddress);
              body.appendChild(canvas);
              ctx = document
                .getElementById(`ecg-chart-${this.macAddress}`)
                .getContext("2d");
            }

            this.myChart = new Chart(ctx, {
              type: "line",
              data: {
                labels: [...Array(1000).keys()],
                datasets: [
                  {
                    label: "ECG",
                    data: buffer.slice(0, 1000),
                    borderColor: "red",
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
                    display: this.$route.path === "/live-device" ? false : true,
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
        } else {
          // console.log("clear interval");
          // clearInterval(this.setIntervalMethod);
        }
      },
    },
  },
  destroyed() {
    if (this.myChart) {
      this.myChart.destroy();
      console.log("destroyed");
    }
    clearInterval(this.setIntervalMethod);
  },
  methods: {
    adddatafromprops(buffer, endIndex) {
      console.log("inside add data method");
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
