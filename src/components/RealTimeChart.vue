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
        ref="myLineChart"
        :width="width"
        :height="height"
        style="background-color: black"
      ></canvas>
    </div>
  </div>
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
  name: "ppg-chart",
  data() {
    return {
      chartData: [],
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
  },
  computed: {
    ...mapGetters("chartData", ["getPpgChartData"]),
  },
  mounted() {
    var zero = 0;
    function adddata() {
      myLineChart?.data.labels.push(zero);
      myLineChart?.data.labels.splice(0, 10);
      myLineChart?.data.datasets[0].data.splice(0, 30);
      myLineChart.update();
      zero++;
    }
    setInterval(function () {
      adddata();
    }, 1000);

    var myLineChart = new Chart(this.$refs.myLineChart, {
      type: "line",
      data: {
        labels: [...Array(2000).keys()],
        datasets: [
          {
            label: "PPG",
            data: this.getPpgChartData,
            borderColor: "green",
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
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
        aspectRatio: 1.2,
        maintainAspectRatio: false,
        spanGaps: false,
        showLine: true,
        scales: {
          y: {
            suggestedMin: 0,
            stacked: true,
            offset: true,
            min: Math.min(...this.getPpgChartData) + 110000,
            max: Math.max(...this.getEcgChartData) - 220000,
          },
          x: {
            display: false,
            grid: {
              display: false,
            },
            ticks: {
              major: {
                enabled: true,
              },
              color: "#FFFFFF",
              displayFormats: 1,
              maxRotation: 0,
              minRotation: 0,
              stepSize: 1,
              minUnit: "millisecond",
              source: "data",
              autoSkip: true,
            },
          },
        },
      },
    });
    myLineChart.update();
  },
};
</script>

<style scoped>
.main__div:hover {
  overflow-x: hidden;
}
</style>
