<template>
  <div class="home">
    <v-app>
      <v-main>
        <!-- <div>
      <h1 v-if="isLoading">Loading..</h1>
    </div> -->
        <div class="grid-container">
          <!-- <CustomCard class="grid-item">
        <ChartCoponent
          type=""
          id="chart1"
          title="# of Votes"
          :labels="['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']"
          :data="[12, 19, 3, 5, 6, 3]"
          :background-color="'rgba(153, 102, 255, 0.2)'"
          :border-color="'rgba(153, 102, 255, 1)'"
        ></ChartCoponent>
      </CustomCard> -->
          <!-- <CustomCard class="grid-item">
        <ChartCoponent
          type="line"
          id="chart2"
          title="# of Votes"
          :labels="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]"
          :data="[64, 61, 64, 62, 64, 60, 58, 59, 53, 54, 61, 60, 55, 60]"
          :background-color="'lightblue'"
          :border-color="'rgba(153, 102, 255, 1)'"
        ></ChartCoponent>
      </CustomCard> -->
          <!-- <CustomCard class="grid-item">
        <ChartCoponent
          type="line"
          id="chart3"
          title="# of Votes"
          :labels="date"
          :data="challenge"
          :background-color="'lightblue'"
          :border-color="'rgba(153, 102, 255, 1)'"
        ></ChartCoponent>
      </CustomCard> -->
          <!-- <CustomCard class="grid-item">
        <ChartCoponent
          v-if="!isLoading"
          type="line"
          id="chart5"
          title="Title"
          :labels="apiDatesData"
          :data="apiData"
          :background-color="'lightblue'"
          :border-color="'blue'"
        ></ChartCoponent>
      </CustomCard> -->
          <!-- <CustomCard class="grid-item">
        <ChartCoponent
          v-if="!isLoading"
          type="line"
          id="chart6"
          title=""
          :labels="testDataY"
          :data="testDataX"
          :background-color="'lightgreen'"
          :border-color="'red'"
        ></ChartCoponent>
      </CustomCard> -->
          <!-- <CustomCard class="grid-item"> -->
          <!-- :labels="[...Array(60).keys()]" -->
          <!-- :data="testFileData -->
          <!-- :data="[...Array(60).keys()]" -->
          <!-- :labels="testFileData" -->
          <ChartCoponent
            type="line"
            :height="200"
            id="chart7"
            title="test"
            :labels="[...Array(60).keys()]"
            :data="testFileData"
          ></ChartCoponent>
          <!-- </CustomCard> -->
          <CustomCard class="grid-item">
            <!-- <TestChart /> -->
            <LineChart />
          </CustomCard>
          <!-- <CustomCard class="grid-item">
        <TestRealChart />
      </CustomCard> -->
          <CustomCard class="grid-item">
            <real-time-chart />
          </CustomCard>
        </div>
      </v-main>
    </v-app>
  </div>
</template>

<script>
// @ is an alias to /src
// import chart from "@/api/chart";
import ChartCoponent from "@/components/ChartComponent.vue";
// import axios from "axios";
import { fileData } from "./testData";
// import TestChart from "../components/TestChart.vue";
import LineChart from "../components/LineChart.vue";
import CustomCard from "@/components/CustomCard.vue";
// import TestRealChart from "@/components/TestRealChart.vue";
import RealTimeChart from "@/components/RealTimeChart.vue";
export default {
  name: "HomeView",
  components: {
    ChartCoponent,
    // TestChart,
    LineChart,
    CustomCard,
    // TestRealChart,
    RealTimeChart,
  },
  data() {
    return {
      date: [
        1600934100.0, 1602009600.0, 1602747060.0, 1603050158.390939,
        1603305573.992575,
      ],
      challenge: [19.0, 29.5, 20.5, 10.52, 12.4],
      resultData: [],
      datesData: [],
      isLoading: false,
      apiData: [],
      apiDatesData: [],
      geeksApiDates: [],
      geeksApiData: [],
      testDataX: [],
      testDataY: [],
      testFileData: fileData.ecg_vals,
    };
  },
  methods: {
    // setData() {
    //   console.log("file--", fileData.ecg_vals);
    // },
    // async getData() {
    //   try {
    //     this.isLoading = true;
    //     let { data } = await axios.get(
    //       "https://api.wirespec.dev/wirespec/stackoverflow/fetchchartdataforvuejs"
    //     );
    //     // console.log("data--", data);
    //     this.datesData = data.date;
    //     this.resultData = data.challenge;
    //     console.log("data==", this.resultData);
    //     this.isLoading = false;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // async getApiData() {
    //   try {
    //     this.isLoading = true;
    //     let { data } = await chart.chartApi();
    //     // console.log("apidata--", data);
    //     this.apiDatesData = data.date;
    //     this.apiData = data.challenge;
    //     console.log("dataaaaaa--", fileData);
    //     console.log();
    //     this.isLoading = false;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // async getGeeksData() {
    //   try {
    //     let {
    //       data: { data },
    //     } = await chart.geeksApi();
    //     // console.log("geeks--", data);
    //     for (let i = 0; i < data.length; i++) {
    //       this.geeksApiDates.push(data[i].Year);
    //       this.geeksApiData.push(data[i].Population);
    //     }
    //     console.log("geeks", this.geeksApiData);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // async getTestData() {
    //   try {
    //     this.isLoading = true;
    //     let { data } = await chart.testApi();
    //     data = data.slice(0, 40);
    //     for (const val of data) {
    //       this.testDataX.push(val.id);
    //       this.testDataY.push(val.postId);
    //     }
    //     this.isLoading = false;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
  mounted() {
    // this.getData();
    // this.setData();
    // this.getApiData();
    // this.getTestData();
    // this.getGeeksData();
  },
};
</script>

<style scoped>
.grid-container {
  /* display: grid; */
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  /* height: 300px; */
  /* column-gap: 50px; */
  /* grid-gap: 2rem; */
  /* grid-template-columns: auto auto auto; */
  /* padding: 10px; */
  /* margin-left: auto; */
  /* margin-right: auto; */
  /* max-width: 600px; */
}
.grid-item {
  background-color: lightgrey;
  margin: auto;
  border: 1px solid rgba(0, 0, 0, 0.8);
  width: 700px;
  /* padding: 10px; */
  /* font-size: 30px; */
  /* text-align: center; */
  /* min-width: 600px; */
}

@media all and (max-width: 800px) {
  .grid-container {
    /* When on medium sized screens, we center it by evenly distributing empty space around items */
    justify-content: flex-start;
  }
}
@media all and (max-width: 500px) {
  .grid-container {
    /* On small screens, we are no longer using row direction but column */
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
}
</style>
