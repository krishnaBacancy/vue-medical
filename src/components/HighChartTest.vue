<template>
  <div>
    <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartOptions: {
        series: [
          {
            type: "column",
            data: [1, 2, 3],
          },
        ],
        exporting: {
          showTable: true,
        },
      },
    };
  },
};
</script>
