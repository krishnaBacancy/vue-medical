<template>
  <div style="width: 100%; overflow-x: auto">
    <LineChart
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
import { Line as LineChart } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler
);

export default {
  name: "AreaChart",
  components: { LineChart },
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
    chartBorderColor: {
      type: String,
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
            borderColor: this.chartBorderColor,
            tension: 0.4,
            borderWidth: 1,
            fill: true,
            backgroundColor: this.chartBgColor,
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
};
</script>
