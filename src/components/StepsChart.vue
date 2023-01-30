<template>
  <div></div>
</template>

<script>
import ApexCharts from "apexcharts";
export default {
  name: "StepsChart",
  data() {
    return {
      options: {
        series: [
          {
            name: "Steps",
            data: [],
          },
        ],
        chart: {
          type: "area",
          height: this.height,
          width: this.width,
          toolbar: {
            show: false,
          },
          // background: "#fff",
        },
        colors: this.chartBgColor,
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        xaxis: {
          categories: this.chartLabel,
          labels: {
            formatter: function () {
              return "";
            },
          },
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return Math.round(val);
            },
          },
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
        console.log("val.length", val.length);
        if (document.querySelector("#chart")?.innerHTML) {
          document.querySelector("#chart").innerHTML = null;
        }
        if (val.length && val.length > 0) {
          if (document.querySelector("#chart")) {
            this.myAreaChart = new ApexCharts(
              document.querySelector("#chart"),
              this.options
            );
            this.myAreaChart.render();
            this.myAreaChart.updateSeries([
              {
                data: this.dataOfChart?.map((d) => Math.round(d["step"])),
              },
            ]);
          }
        }
      },
    },
  },
  beforeDestroy() {
    if (document.querySelector("#chart")?.innerHTML) {
      document.querySelector("#chart").innerHTML = null;
    }
  },
  destroyed() {
    if (this.myAreaChart) {
      this.myAreaChart?.destroy();
      this.myAreaChart = null;
    }
  },
};
</script>
