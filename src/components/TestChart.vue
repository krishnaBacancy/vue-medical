<template>
  <div style="width: 100%; overflow-x: auto">
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
        labels: this.label,
        datasets: [
          {
            data: this.dataOfChart,
            borderWidth: 1,
            fill: 1,
            barPercentage: 0.25,
            backgroundColor: this.chartBgColor,
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
