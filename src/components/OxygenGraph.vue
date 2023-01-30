<template>
  <div></div>
</template>

<script>
import ApexCharts from "apexcharts";
export default {
  name: "OxygenGraph",
  data() {
    return {
      options: {
        series: [
          {
            name: "Blood Oxygen",
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
        },
        colors: this.chartBgColor,
        xaxis: {
          categories: this.chartLabel,
          labels: {
            formatter: function () {
              return "";
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
      oxygenChart: null,
    };
  },
  props: {
    chartId: {
      type: String,
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
        if (document.querySelector("#Oxygenchart")?.innerHTML) {
          document.querySelector("#Oxygenchart").innerHTML = null;
        }
        if (val.length && val.length > 0) {
          if (document.querySelector("#Oxygenchart")) {
            this.oxygenChart = new ApexCharts(
              document.querySelector("#Oxygenchart"),
              this.options
            );
            this.oxygenChart.render();
            this.oxygenChart.updateSeries([
              {
                data: val?.map((d) => Math.round(d["spo2"])),
              },
            ]);
          }
        }
      },
    },
  },
  beforeDestroy() {
    if (document.querySelector("#Oxygenchart")?.innerHTML) {
      document.querySelector("#Oxygenchart").innerHTML = null;
    }
  },
  destroyed() {
    if (this.oxygenChart) {
      this.oxygenChart.destroy();
      this.oxygenChart = null;
    }
  },
};
</script>
