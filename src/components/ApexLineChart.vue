<template>
  <div>
    <apexChart
      ref="realtimeChart1"
      width="500"
      type="line"
      :options="chartOptions"
      :series="series"
    ></apexChart>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

let lastDate = 0;
let data = [];
const TICKINTERVAL = 86400000;
const XAXISRANGE = 777600000;
// const ARRAYLENGTH = XAXISRANGE / TICKINTERVAL + 1;

// function getDayWiseTimeSeries(baseval, count, yrange) {
//   var i = 0;
//   while (i < count) {
//     var x = baseval;
//     var y =
//       Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

//     data.push({
//       x,
//       y,
//     });
//     lastDate = baseval;
//     baseval += TICKINTERVAL;
//     i++;
//   }
// }

// getDayWiseTimeSeries(new Date("11 Feb 2017 GMT").getTime(), 10, {
//   min: 10,
//   max: 90,
// });

// function getNewSeries(baseval, yrange) {
//   var newDate = baseval + TICKINTERVAL;
//   lastDate = newDate;
//   for (let i = 0; i < data.length - 10; i++) {
//     // IMPORTANT
//     // we reset the x and y of the data which is out of drawing area
//     // to prevent memory leaks
//     data[i].x = newDate - XAXISRANGE - TICKINTERVAL;
//     data[i].y = 0;
//   }
//   data.push({
//     x: newDate,
//     // y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min,
//     y: this.getEcgChartData,
//   });
// }

function resetData() {
  data = data.slice(data.length - 10, data.length);
}

export default {
  name: "ApexLineChart",
  computed: {
    ...mapGetters("chartData", ["getEcgChartData"]),
  },
  data() {
    return {
      series: [
        {
          data: data.slice(),
          //   data: this.getEcgChartData?.slice(),
        },
      ],
      chartOptions: {
        chart: {
          id: "realtime",
          height: 350,
          type: "line",
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Dynamic Updating Chart",
          align: "left",
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: "datetime",
          range: XAXISRANGE,
        },
        yaxis: {
          max: 100,
        },
        legend: {
          show: false,
        },
      },
    };
  },
  mounted() {
    this.intervals1();
  },
  methods: {
    intervals1: function () {
      var me = this;
      window.setInterval(function () {
        me.getNewSeries(lastDate, {
          min: 10,
          max: 90,
        });
        console.log("chart--", this.getEcgChartData);
        me.$refs.realtimeChart1?.updateSeries([
          {
            data: data,
            // data: this.getEcgChartData,
          },
        ]);
      }, 1000);

      // every 60 seconds, we reset the data to prevent memory leaks
      window.setInterval(function () {
        resetData();
        me.$refs.realtimeChart1?.updateSeries(
          [
            {
              data,
              //   data: this.getEcgChartData,
            },
          ],
          false,
          true
        );
      }, 60000);
    },
    getNewSeries(baseval, yrange) {
      let newDate = baseval + TICKINTERVAL;
      lastDate = newDate;
      for (let i = 0; i < data.length - 10; i++) {
        // IMPORTANT
        // we reset the x and y of the data which is out of drawing area
        // to prevent memory leaks
        data[i].x = newDate - XAXISRANGE - TICKINTERVAL;
        data[i].y = 0;
      }
      data.push({
        x: newDate,
        y:
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
          yrange.min,
        // y: this.getEcgChartData,
      });
    },
  },
};
</script>
