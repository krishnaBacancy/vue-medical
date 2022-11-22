<template>
  <div style="width: 100%; overflow-x: auto">
    <!-- <div
      :style="{
        width: [...Array(80).keys()].length * 10 + 'px',
      }"
      style="overflow: hidden"
    > -->
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
      style="background-color: #282934"
    />
    <!-- </div> -->
  </div>
</template>

<script>
import { Bar } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
} from "chart.js";
// import { fileData } from "@/views/testData";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale);

export default {
  name: "BarChart",
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    label: { type: Array },
    dataOfChart: { type: Array },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
    chartBgColor: {
      type: String,
    },
  },
  data() {
    return {
      chartData: {
        // labels: [...Array(60).keys()],
        // labels: ["12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm"],
        labels: this.label,
        datasets: [
          {
            // data: fileData.ecg_vals,
            // data: ["72", "115", "95", "130", "60", "116", "88"],
            data: this.dataOfChart,
            // borderColor: "red",
            // hoverBorderColor: "pink",
            // tension: 0.4,
            borderWidth: 1,
            fill: 1,
            barPercentage: 0.25,
            backgroundColor: this.chartBgColor,
            // pointRadius: 0.1,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
  },
};
</script>
