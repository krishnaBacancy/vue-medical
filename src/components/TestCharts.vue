<template>
  <div style="width: 100%" class="main__div">
    <div id="ecgCanvas" style="overflow: hidden">
      <!-- <canvas
        id="myChart"
        ref="myChart"
        :width="width"
        :height="height"
        style="background-color: black"
      ></canvas> -->
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
import "chartjs-plugin-streaming";
import "chartjs-adapter-moment";
import { RealTimeScale, StreamingPlugin } from "chartjs-plugin-streaming";
import { mapActions } from "vuex";

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
  name: "test-charts",
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
        // console.log("-----val", val);
        if (val?.length && val.length > 0) {
          console.log("inside watch");
          let buffer = JSON.parse(JSON.stringify(val));
          console.log("this.myChart from watch", this.myChart);
          if (this.myChart) {
            console.log("inside if");
            clearInterval(this.setIntervalMethod);
            this.setIntervalMethod = setInterval(async () => {
              console.log("buffer length", buffer.length);
              console.log("inside set interval");
              await this.adddatafromprops(buffer, 200);
              buffer.splice(0, 200);
              this.myChart.options.scales.y.min = Math.min(...buffer) - 5000;
              this.myChart.options.scales.y.max = Math.max(...buffer) + 5000;
              if (!buffer.length) {
                console.log("hii empty");
                clearInterval(this.setIntervalMethod);
              }
            }, 1000);
            console.log("hello");
            await this.adddatafromprops(buffer, 200);
            buffer.splice(0, 200);
          } else {
            console.log("inside else");
            var canvas = document.createElement("canvas");
            canvas.id = "myChart";
            canvas.width = this.width;
            canvas.height = this.height;
            canvas.style.backgroundColor = "black";

            var body = document.getElementById("ecgCanvas");
            body.appendChild(canvas);
            const ctx = document.getElementById("myChart").getContext("2d");
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
                    // min: this.getMinEcgData - 30000,
                    // max: this.getMinEcgData + 30000,
                    // min: Math.min(...buffer),
                    // max: Math.max(...buffer),
                    stacked: true,
                    offset: true,
                    ticks: {
                      color: "#FFFFFF",
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
            buffer.splice(0, 1000);
            clearInterval(this.setIntervalMethod);
            this.myChart.options.scales.y.min = Math.min(...buffer) - 5000;
            this.myChart.options.scales.y.max = Math.max(...buffer) + 5000;
            this.setIntervalMethod = setInterval(async () => {
              console.log("inside else set interval");
              console.log("buffer length", buffer.length);
              await this.adddatafromprops(buffer, 100);
              buffer.splice(0, 100);
              if (!buffer.length) {
                console.log("empty - 187");
                clearInterval(this.setIntervalMethod);
              }
            }, 1000);
            // this.displayedECGdata = 1000;
            // this.removeDisplayedEcgData(1000);
            // console.log("---my chart from mounted", this.myChart);
            this.myChart?.update("none");
          }
        } else {
          console.log("clear interval");
          clearInterval(this.setIntervalMethod);
        }
      },
    },
  },
  mounted() {
    console.log(
      'document.getElementById("myChart")',
      document.getElementById("myChart")
    );
  },
  methods: {
    ...mapActions("chartData", ["removeDisplayedEcgData"]),
    adddatafromprops(buffer, endIndex) {
      console.log("inside add data method");
      if (buffer.length) {
        // let endIndex = this.displayedECGdata + 20;
        for (let i = 0; i < endIndex; i++) {
          this.myChart?.data.labels.push(this.myChart?.data.labels.length + i);
          this.myChart?.data.datasets[0].data.push(buffer[i]);
          // this.displayedECGdata += 1;
        }
        this.myChart?.data.labels.splice(0, endIndex);
        this.myChart?.data.datasets[0].data.splice(0, endIndex);
        // this.removeDisplayedEcgData(20);
        // this.displayedECGdata =
        //   this.displayedECGdata - 20 < 0 ? 0 : this.displayedECGdata - 20;
        // console.log("myChart?.data.labels.length", myChart?.data.labels.length);
        // console.log("myChart", this.myChart);
        this.myChart?.update("none");
      }
    },
  },
};
</script>
