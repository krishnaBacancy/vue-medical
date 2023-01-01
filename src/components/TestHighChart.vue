<template>
  <div class="chartElem">
    <div class="row">
      <vue-highcharts
        class="chart"
        :options="chartOptions"
        :updateArgs="updateArgs"
      ></vue-highcharts>
    </div>
  </div>
</template>

<script>
import VueHighcharts from "vue2-highcharts";
import Exporting from "highcharts/modules/exporting";
import Highcharts from "highcharts";
import { fileData } from "@/views/testData.js";

Exporting(Highcharts);
export default {
  components: {
    VueHighcharts,
  },
  data() {
    return {
      title: "",
      points: [10, 0, 8, 2, 6, 4, 5, 5],
      chartType: "line",
      seriesColor: "#6fcd98",
      colorInputIsSupported: null,
      animationDuration: 1000,
      updateArgs: [true, true, { duration: 1000 }],
      chartOptions: {
        chart: {
          type: "line",
        },
        title: {
          text: "Sin chart",
        },
        series: [
          {
            data: fileData.ecg_vals,
            color: "#6fcd98",
          },
        ],
      },
    };
  },
  // created() {
  //   let i = document.createElement("input");
  //   i.setAttribute("type", "color");
  //   i.type === "color"
  //     ? (this.colorInputIsSupported = true)
  //     : (this.colorInputIsSupported = false);
  // },
  watch: {
    title(newValue) {
      this.chartOptions.title.text = newValue;
    },
    points(newValue) {
      this.chartOptions.series[0].data = newValue;
    },
    chartType(newValue) {
      this.chartOptions.chart.type = newValue.toLowerCase();
    },
    seriesColor(newValue) {
      this.chartOptions.series[0].color = newValue.toLowerCase();
    },
    animationDuration(newValue) {
      this.updateArgs[2].duration = Number(newValue);
    },
  },
};
</script>

<style scoped>
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
#colorPicker {
  border: 0;
  padding: 0;
  margin: 0;
  width: 30px;
  height: 30px;
}
.numberInput {
  width: 30px;
}
</style>
