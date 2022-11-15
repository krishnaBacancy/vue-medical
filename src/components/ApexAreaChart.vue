<template>
  <div>
    <div class="chart-wrapper">
      <apexChart
        type="area"
        width="600"
        :height="height"
        :options="options"
        :series="series"
      >
      </apexChart>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    chartLabel: { type: Array },
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
      type: Array,
    },
  },
  data() {
    return {
      options: {
        chart: {
          id: "vuechart-example",
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          horizontalAlign: "left",
        },
        xaxis: {
          categories: this.chartLabel,
        },
        // colors: ["#00897b"],
        colors: this.chartBgColor,
        tooltip: {
          theme: false,
        },
      },
      series: [
        {
          name: "series-1",
          data: this.dataOfChart,
        },
      ],
    };
  },
};
</script>

<style scoped>
div.chart-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
