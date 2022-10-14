<template>
  <div style="width: 100%; overflow-x: auto">
    <!-- <div
      :style="{
        width: [...Array(80).keys()].length * 10 + 'px',
      }"
      style="overflow: hidden"
    > -->
    <div style="overflow: hidden">
      <!-- <canvas ref="myChart" style="background-color: black"></canvas> -->
      <canvas id="myChart12" style="background-color: black"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart } from "chart.js";
import { fileData } from "@/views/testData";

export default {
  data() {
    return {
      myData: [],
    };
  },
  mounted() {
    var dat = {
      labels: [...Array(900).keys()],
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: fileData.ecg_vals,
          borderColor: "red",
          hoverBorderColor: "red",
          tension: 0.4,
          borderWidth: 1,
          fill: false,
          pointRadius: 0.1,
        },
      ],
    };
    let options = {
      animation: false,
      //Boolean - If we want to override with a hard coded scale
      scaleOverride: true,
      //** Required if scaleOverride is true **
      //Number - The number of steps in a hard coded scale
      scaleSteps: 10,
      //Number - The value jump in the hard coded scale
      scaleStepWidth: 10,
      //Number - The scale starting value
      scaleStartValue: 0,
    };

    let canvas = document.getElementById("myChart12");
    let ctx = canvas.getContext("2d");

    var myLineChart = new Chart(ctx, {
      type: "line",
      data: dat,
      options,
    });

    if (myLineChart != null) {
      myLineChart.destroy();
    }

    setInterval(function () {
      //   setData(dat.datasets[0].data);
      //   setLabels(dat.labels);
      if (Chart.getChart("myChart12")) {
        Chart.getChart("myChart12").destroy();
      }
      new Chart(ctx, {
        type: "line",
        data: dat,
        options,
      });
      Chart.getChart("myChart12").update();
      //   if (myChart != null) {
      //     myChart.destroy();
      //   }
    }, 500);

    myLineChart.update();
  },
};
</script>

<style scoped></style>
