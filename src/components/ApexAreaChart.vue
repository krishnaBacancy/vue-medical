<template>
  <div id="chart"></div>
</template>

<script>
import ApexCharts from "apexcharts";
export default {
  name: "ApexChart",
  data() {
    return {
      options: {
        series: [
          {
            data: [],
          },
        ],
        chart: {
          type: "area",
          height: this.height,
          width: this.width,
        },
        colors: this.chartBgColor,
        xaxis: {
          categories: this.chartLabel,
        },
        theme: {
          mode: "dark",
          palette: "palette1",
          monochrome: {
            enabled: false,
            shadeTo: "dark",
            shadeIntensity: 0.65,
          },
        },
        plotOptions: {
          area: {
            horizontal: false,
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
        },
      },
      myAreaChart: null,
    };
  },
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
  watch: {
    dataOfChart: {
      immediate: true,
      async handler(val) {
        if (val.length && val.length > 0) {
          if (!this.myAreaChart) {
            document.getElementById("chart").innerHTML = "";
            this.myAreaChart = new ApexCharts(
              document.querySelector("#chart"),
              this.options
            );
            this.myAreaChart.render();
            this.myAreaChart.updateSeries([
              {
                // data: [36, 27],
                data: this.dataOfChart?.map((d) => Math.round(d["avgspo2"])),
              },
            ]);
          } else {
            console.log("hello");
          }
        }
      },
    },
  },
};
</script>
