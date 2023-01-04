<template>
  <div style="width: 100%" class="main__div">
    <div style="overflow: hidden">
      <canvas
        id="myChart"
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
import "chartjs-plugin-streaming";
import "chartjs-adapter-moment";
import { RealTimeScale, StreamingPlugin } from "chartjs-plugin-streaming";
import { mapGetters, mapActions } from "vuex";

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
  },
  computed: {
    ...mapGetters("chartData", ["getEcgChartData"]),
  },
  data() {
    return {
      displayedECGdata: 0,
      myRealtimeChart: {},
    };
  },
  destroyed() {
    clearInterval(this.adddata({}));
    this.clearEcgData();
  },
  mounted() {
    // console.log(
    //   'document.getElementById("myChart")',
    //   document.getElementById("myChart")
    // );
    const ctx = document.getElementById("myChart").getContext("2d");
    this.myRealtimeChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [...Array(1000).keys()],
        datasets: [
          {
            label: "ECG",
            data: this.getEcgChartData.slice(0, 1000),
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
            min: Math.min(...this.getEcgChartData) - 50000,
            max: Math.max(...this.getEcgChartData) + 50000,
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
    this.displayedECGdata = 1000;
    // console.log("---my chart from mounted", this.myRealtimeChart);
    this.myRealtimeChart?.update("none");
    setInterval(() => {
      this.adddata(this.myRealtimeChart);
    }, 1000);
  },
  methods: {
    ...mapActions("chartData", ["clearEcgData"]),
    adddata(myChart) {
      if (this.getEcgChartData.length) {
        let endIndex = this.displayedECGdata + 20;
        for (let i = this.displayedECGdata; i < endIndex; i++) {
          myChart?.data.labels.push(i + 1);
          myChart?.data.datasets[0].data.push(this.getEcgChartData[i]);
          this.displayedECGdata += 1;
        }
        myChart?.data.labels.splice(0, 20);
        myChart?.data.datasets[0].data.splice(0, 20);
        // console.log("myChart?.data.labels.length", myChart?.data.labels.length);
      }
      // myChart?.data.labels.push(myChart?.data.labels.length + 1);
      // myChart?.data.labels.push(myChart?.data.labels.length + 2);
      // myChart?.data.datasets[0].data.push(data1);
      // myChart?.data.datasets[0].data.push(data2);
      // console.log("myChart", myChart);
      myChart?.update("none");
    },
  },
};
</script>

<style scoped>
.main__div:hover {
  overflow-x: hidden;
}
</style>
