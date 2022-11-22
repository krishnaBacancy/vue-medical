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
import "chartjs-plugin-streaming";
import "chartjs-adapter-moment";
import { RealTimeScale, StreamingPlugin } from "chartjs-plugin-streaming";
import { mapGetters } from "vuex";

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
  },
  computed: {
    ...mapGetters("chartData", ["getEcgChartData", "getMinEcgData"]),
  },
  mounted() {
    let myChart;
    let zero = 0;
    function adddata() {
      myChart?.data.labels.push(zero);
      myChart?.data.labels.splice(0, 10);
      myChart?.data.datasets[0].data.splice(0, 30);
      myChart?.update();
      zero++;
    }
    setInterval(function () {
      adddata();
    }, 1000);

    myChart = new Chart(this.$refs.myChart, {
      type: "line",
      data: {
        labels: [...Array(2000).keys()],
        datasets: [
          {
            label: "ECG",
            data: this.getEcgChartData,
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
            min: Math.min(...this.getEcgChartData) + 110000,
            max: Math.max(...this.getEcgChartData) - 220000,
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
    myChart.update();
  },
};
</script>

<style scoped>
.main__div:hover {
  overflow-x: hidden;
}
</style>
