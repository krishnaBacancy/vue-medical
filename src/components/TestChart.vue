<script>
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  BarController,
} from "chart.js";

Chart.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  BarController
);

export default {
  name: "BarChart",
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
  destroyed() {
    if (this.barChart) {
      this.barChart?.destroy();
    }
  },
  watch: {
    dataOfChart: {
      immediate: true,
      async handler(val) {
        if (val.length && val.length > 0) {
          if (this.barChart) {
            console.log("hell0", document.getElementById(this.chartId));
            // this.barChart.clear();
            // this.barChart.destroy();
          } else {
            let ctx;
            // if (document.getElementById(this.chartId)) {
            //   ctx = document.getElementById(this.chartId)?.getContext("2d");
            // } else {
            // }
            var canvas = document.createElement("canvas");
            canvas.id = this.chartId;
            canvas.width = this.width;
            canvas.height = this.height;

            var body = document.getElementById("barCanvas");
            body?.appendChild(canvas);
            ctx = document.getElementById(this.chartId)?.getContext("2d");
            console.log("ctx--", ctx);

            this.barChart = new Chart(ctx, {
              type: "bar",
              data: {
                labels: this.label,
                datasets: [
                  {
                    label: "ECG",
                    data: this.dataOfChart?.map((d) => Math.round(d["temp"])),
                    borderWidth: 1,
                    hoverBorderColor: "red",
                    fill: 1,
                    barPercentage: 0.25,
                    categoryPercentage: 1,
                    backgroundColor: this.chartBgColor,
                  },
                ],
              },
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    display: false,
                  },
                },
              },
            });
          }
        }
      },
    },
  },
  data() {
    return {
      barChart: null,
    };
  },
};
</script>
