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
          redrawOnParentResize: true,
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
        colors: this.chartBgColor,
        responsive: [
          {
            breakpoint: 1000,
            options: {
              plotOptions: {
                area: {
                  horizontal: false,
                },
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        theme: {
          mode: "dark",
          palette: "palette1",
          monochrome: {
            enabled: false,
            color: "#7741f1",
            shadeTo: "dark",
            shadeIntensity: 0.65,
          },
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
