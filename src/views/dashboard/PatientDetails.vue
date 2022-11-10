<template>
  <div style="background-color: #282934">
    <PageHeader title="Patient Details" pageIcon="mdi-account-box" />
    <br />
    <div class="white--text">
      <v-progress-circular
        indeterminate
        color="amber"
        v-if="loadingStatus"
      ></v-progress-circular>
      <div v-else>
        <div class="d-flex align-center">
          <v-img
            class="rounded-circle ml-4"
            src="https://picsum.photos/id/11/50/50"
            max-width="50"
            max-height="50"
          />
          <h3 class="mr-2 ml-4">
            {{
              getFullName(
                getSingleDeviceData[0]?.customerFirstName,
                getSingleDeviceData[0]?.customerLastName
              )
            }}
            - {{ getSingleDeviceData[0]?.macAddressFramed.toUpperCase() }}
          </h3>
          <v-spacer></v-spacer>
          <h3 class="mr-3">0073fa</h3>
          <h3 class="mr-3">114Hrs 45Min</h3>
          <v-spacer></v-spacer>
          <div class="d-flex align-center justify-center mr-7">
            <h3 class="mr-5">Device Status</h3>
            <v-btn outlined color="red" class="mr-2">. Live</v-btn>
          </div>
        </div>

        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex d-flex xs12 sm6 md6>
              <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
                <div class="d-flex">
                  <h3>ECG</h3>
                  <v-spacer></v-spacer>
                  <v-btn class="mr-3 export__btn" color="warning" outlined
                    >Export</v-btn
                  >
                </div>
                <div class="d-flex align-start mt-2">
                  <div class="grid-container">
                    <!-- <HighChartTest /> -->
                    <LineChart
                      :chart-data="ecgChartData"
                      :key="showEcgChart"
                      :minValue="Math.min(...ecgChartData) - 1000"
                      :maxValue="Math.max(...ecgChartData) + 1000"
                    />
                    <!-- <RealTimeChart :height="100" :datasets="ecgChartData" /> -->
                  </div>
                </div>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm6 md6>
              <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
                <div class="d-flex">
                  <h3>PPG</h3>
                  <v-spacer></v-spacer>
                  <v-btn class="mr-3 export__btn" color="warning" outlined
                    >Export</v-btn
                  >
                </div>
                <div class="d-flex align-start mt-2">
                  <div class="grid-container">
                    <RealTimeChart
                      :ppgDatasets="ppgChartData"
                      :minValue="Math.min(...ppgChartData) - 1000"
                      :maxValue="Math.max(...ppgChartData) + 1000"
                      :key="showPpgChart"
                    />
                  </div>
                </div>
              </v-card>
            </v-flex>
          </v-layout>

          <br />
          <v-layout row wrap>
            <v-flex d-flex xs12 sm12 md3>
              <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
                <div
                  class="d-flex justify-xs-start justify-sm-center align-center mt-2"
                >
                  <v-img
                    class="ml-10"
                    src="https://accu.live/images/doctor_dashboard/heartbeat.svg"
                    height="40"
                    contain
                  ></v-img>
                  <div class="mr-16">
                    <h1>74</h1>
                    <div class="d-flex" style="flex-direction: column">
                      <small>>120-30</small>
                      <small>C1</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm12 md3>
              <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
                <div class="d-flex align-center ml-3 mt-2">
                  <v-img
                    class=""
                    src="https://accu.live/images/doctor_dashboard/doc-lunghs.svg"
                    height="45"
                    contain
                  ></v-img>
                  <div class="mr-16">
                    <h1>16</h1>
                    <div class="d-flex" style="flex-direction: column">
                      <small>C1</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm12 md3>
              <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
                <div
                  class="d-flex justify-xs-start justify-sm-center align-center ml-3 mt-2"
                >
                  <v-img
                    class="mr-5"
                    src="https://accu.live/images/doctor_dashboard/temprature.svg"
                    height="50"
                    contain
                  ></v-img>
                  <div class="mr-16">
                    <h1>98.7</h1>
                    <div class="d-flex text-start flex-column">
                      <small>6 hours</small>
                      <small>ago</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm12 md3>
              <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
                <div
                  class="d-flex justify-xs-start justify-sm-center align-center ml-3 mt-2"
                >
                  <v-img
                    class="ml-2"
                    src="https://accu.live/images/doctor_dashboard/doc-step.svg"
                    height="50"
                    contain
                  ></v-img>
                  <div class="mr-16">
                    <h1>3000</h1>
                    <div class="d-flex" style="flex-direction: column">
                      <small>Steps</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex d-flex xs12 sm12 md12>
              <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
                <div
                  class="d-flex justify-xs-start justify-sm-center align-center ml-5"
                >
                  <div class="mr-3 ml-1">
                    <v-icon dark size="50"> mdi-human-male </v-icon>
                  </div>
                  <div>
                    <h1>Upright</h1>
                    <div class="d-flex" style="flex-direction: column">
                      <small>Posture</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex d-flex xs12 sm4 md4>
              <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
                <div class="d-flex text-start">
                  <div>
                    <h3>Oxygen Saturation</h3>
                    <small>00:0B:57:AC:66:DA</small>
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    <h3>Last Reading</h3>
                    <small>2 hour ago</small>
                  </div>
                </div>
                <div class="d-flex justify-center ml-5 align-center mt-5">
                  <v-img
                    class="mr-3"
                    src="https://accu.live/images/doctor_dashboard/doc-oxi.svg"
                    height="50"
                    contain
                  ></v-img>
                  <div class="mr-16 text-start">
                    <h1>98</h1>
                    <div class="d-flex" style="flex-direction: column">
                      <small>Streaming Mode</small>
                      <small>%SPO2</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm4 md4>
              <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
                <div class="d-flex text-start">
                  <div>
                    <h3>Blood Pressure</h3>
                    <small>No Device Paired</small>
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    <h3>Last Reading</h3>
                    <small>2 hour ago</small>
                  </div>
                </div>
                <div class="d-flex justify-center align-center ml-5 mt-5">
                  <v-img
                    src="https://accu.live/images/doctor_dashboard/oxi-meter.svg"
                    height="50"
                    contain
                  ></v-img>
                  <div class="mr-16 text-start">
                    <h1>118/77</h1>
                    <div class="d-flex" style="flex-direction: column">
                      <small>Manual Entry</small>
                      <small>mmHg</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm4 md4>
              <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
                <div class="d-flex text-start">
                  <div>
                    <h3>Weight</h3>
                    <small>No Device Paired</small>
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    <h3>Last Reading</h3>
                    <small>2 hour ago</small>
                  </div>
                </div>
                <div class="d-flex justify-center ml-5 mt-5">
                  <v-btn
                    class="mr-3"
                    color="success"
                    height="70"
                    width="70"
                    dark
                  >
                    <v-img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqhMFwNm_SkDfYGFa5g_7RXOrU-HUqthtqMQ&usqp=CAU"
                      width="70"
                      height="70"
                    ></v-img>
                  </v-btn>
                  <div class="text-start">
                    <h1>61.3 kg</h1>
                    <div class="d-flex" style="flex-direction: column">
                      <small>Manual Entry</small>
                      <small>%SPO2</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex d-flex xs12 sm12 md6>
              <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
                <div>
                  <div class="d-flex justify-center align-center">
                    <h3 class="d-flex align-center mt-2">
                      <span>
                        <v-img
                          class="ml-2"
                          src="https://accu.live/images/doctor_dashboard/temprature.svg"
                          height="40"
                          width="40"
                          contain
                        ></v-img>
                      </span>
                      <div
                        class="d-flex ml-5 text-start"
                        style="flex-direction: column"
                      >
                        <span>Body Temperature</span>
                        <span>00:0B:57:AC:66:DA</span>
                      </div>
                    </h3>
                    <v-spacer></v-spacer>
                    <v-btn class="mr-3 export__btn" color="warning" outlined
                      >Export</v-btn
                    >
                  </div>
                </div>
                <div class="grid-container">
                  <TestChart
                    :height="200"
                    :data-of-chart="[72, 115, 95, 130, 60, 116, 88]"
                    :label="['12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm']"
                  />
                </div>
              </v-card>
            </v-flex>

            <v-flex d-flex xs12 sm12 md6>
              <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
                <div>
                  <div class="d-flex justify-center align-center">
                    <h3 class="d-flex align-center mt-2">
                      <v-img
                        class="ml-2"
                        src="https://accu.live/images/doctor_dashboard/doc-lunghs.svg"
                        height="40"
                        width="40"
                        contain
                      ></v-img>
                      <div
                        class="d-flex ml-5 text-start"
                        style="flex-direction: column"
                      >
                        <span>Blood Oxygen</span>
                        <span>mmHg</span>
                      </div>
                    </h3>
                    <v-spacer></v-spacer>
                    <v-btn class="mr-3 export__btn" color="warning" outlined
                      >Export</v-btn
                    >
                  </div>
                </div>
                <div class="grid-container">
                  <AreaChart
                    :height="200"
                    :data-of-chart="[72, 115, 95, 130, 60, 116, 88]"
                    :label="['12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm']"
                  />
                </div>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex d-flex xs12 sm12 md6>
              <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
                <div>
                  <div class="d-flex justify-center align-center">
                    <h3 class="d-flex align-center mt-2">
                      <v-img
                        class="ml-2"
                        src="https://accu.live/images/doctor_dashboard/heartbeat.svg"
                        height="40"
                        width="40"
                        contain
                      ></v-img>
                      <div
                        class="d-flex ml-5 text-start"
                        style="flex-direction: column"
                      >
                        <span>Heart Rate</span>
                        <span>mmHg</span>
                      </div>
                    </h3>
                    <v-spacer></v-spacer>
                    <v-btn class="mr-3 export__btn" color="warning" outlined
                      >Export</v-btn
                    >
                  </div>
                </div>
                <div class="grid-container">
                  <TestChart
                    :height="200"
                    :data-of-chart="[72, 115, 95, 130, 60, 116, 88]"
                    :label="['12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm']"
                  />
                </div>
              </v-card>
            </v-flex>

            <v-flex d-flex xs12 sm12 md6>
              <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
                <div>
                  <div class="d-flex justify-center align-center">
                    <h3 class="d-flex align-center mt-2">
                      <span>
                        <div style="background-color: grey" class="mr-3 ml-2">
                          <v-icon dark size="40"> mdi-power-sleep </v-icon>
                        </div>
                      </span>
                      <div
                        class="d-flex ml-5 text-start"
                        style="flex-direction: column"
                      >
                        <span>Sleep</span>
                        <span>Hrs/Day</span>
                      </div>
                    </h3>
                    <v-spacer></v-spacer>
                    <div
                      class="rounded-circle sleep__div"
                      style="background-color: grey"
                    >
                      <span class="mr-3">W</span>
                      <span class="mr-3">M</span>
                      <span class="mr-3">6M</span>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn class="mr-3 export__btn" color="warning" outlined
                      >Export</v-btn
                    >
                  </div>
                </div>
                <div class="grid-container">
                  <AreaChart
                    :height="200"
                    :data-of-chart="[72, 115, 95, 130, 60, 116, 88]"
                    :label="['12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm']"
                  />
                </div>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import mqtt from "mqtt/dist/mqtt";
import LineChart from "../../components/LineChart.vue";
import RealTimeChart from "@/components/RealTimeChart.vue";
import PageHeader from "@/layouts/PageHeader.vue";
// import ChartComponent from "@/components/ChartComponent.vue";
import TestChart from "@/components/TestChart.vue";
import AreaChart from "@/components/AreaChart.vue";
export default {
  name: "PatientDetails",
  components: {
    LineChart,
    RealTimeChart,
    PageHeader,
    TestChart,
    AreaChart,
  },
  data() {
    return {
      tempTitle: ["12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm"],
      getDoctorId: localStorage.getItem("user_id"),
      ecgChartData: [],
      ppgChartData: [],
      tempData: [],
      showEcgChart: true,
      showPpgChart: true,
      ppgTempData: [],
      minEcgValue: null,
      minPpgValue: null,
      connection: {
        host: "194.233.69.96",
        port: 15675,
        options: {
          clean: true,
          connectTimeout: 4000,
          clientId: "lens_WR4qeFgdTx5dZOLyNTFKZrVauCv",
          username: "MYsmO5Oc7O6DKkS8",
          password: "ufUPnVWbLoMwwFaL",
        },
        // endpoint: "/BMSFSEV/+/sTOf",
        clean: true, // Reserved session
        connectTimeout: 4000, // Time out
        reconnectPeriod: 4000, // Reconnection interval
        // Certification Information
        clientId: "lens_WR4qeFgdTx5dZOLyNTFKZrVauCv",
        username: "MYsmO5Oc7O6DKkS8",
        password: "ufUPnVWbLoMwwFaL",
      },
      subscription: {
        topic: "BMSFSEV/C9F7BF309DC9/sTOf",
        qos: 0,
      },
      publish: {
        topic: "BMSFSEV//sTOf",
        qos: 0,
        payload: '{ "msg": "Hello, I am browser." }',
      },
      receiveNews: "",
      qosList: [
        { label: 0, value: 0 },
        { label: 1, value: 1 },
        { label: 2, value: 2 },
      ],
      client: {
        connected: false,
      },
      subscribeSuccess: false,
    };
  },
  computed: {
    ...mapGetters("doctors", [
      "getPatients",
      "loadingStatus",
      "getSingleDeviceData",
    ]),
  },
  unmounted() {
    this.client.close();
    console.log("Connection Closed");
  },
  mounted() {
    this.getSingleDevice(this.$route?.params?.id);
    this.createConnection();
  },
  // watch: {
  //   ecgChartData: {
  //     deep: true,
  //     handler(val) {
  //       this.tempData = val;
  //       console.log("Value of ecg--", val);
  //     },
  //   },
  //   ppgChartData: {
  //     deep: true,
  //     handler(val) {
  //       this.ppgTempData = val;
  //     },
  //   },
  // },
  methods: {
    ...mapActions("doctors", ["getPatientsForDoctor", "getSingleDevice"]),
    getFullName(s1, s2) {
      return (
        s1.charAt(0).toUpperCase() +
        s1.slice(1) +
        " " +
        s2.charAt(0).toUpperCase() +
        s2.slice(1)
      );
    },
    createConnection() {
      const { host, port, options } = this.connection;
      const connectUrl = `mqtt://${host}:${port}/ws`;
      try {
        this.client = mqtt.connect(connectUrl, options);
      } catch (error) {
        console.log("mqtt.connect error", error);
      }
      this.client.on("connect", () => {
        console.log("Connection succeeded!");
        this.client.subscribe(
          `BMSFSEV/${this.getSingleDeviceData[0]?.macAddressFramed.toUpperCase()}/sTOf`
        );
        // this.client.subscribe(
        //   `BacAccuLive/${this.getPatients[0]?.mac_address_framed}/ctoa`
        // );
        console.log("hello", this.client);
        // this.client.subscribe(this.subscription.topic, () => {
        //   // if (!err) {
        //   this.client.publish(this.subscription.topic);
        //   // }
        // });
      });
      this.client.on("error", (error) => {
        console.log("Connection failed", error);
      });
      this.client.on("message", (_, message) => {
        console.log("hi");
        // this.receiveNews = this.receiveNews.concat(message);
        let data = JSON.parse(message);
        // console.log(`Message -- ${message}`);
        console.log("data--", JSON.parse(message));
        // setTimeout(() => {
        // console.log("data12121--", data);
        this.ecgChartData = data?.ecg_vals;
        this.ppgChartData = data?.ppg_vals;
        let sumEcgData = 0;
        for (let i = 0; i < this.ecgChartData.length; i++) {
          sumEcgData += parseInt(this.ecgChartData[i], 10);
        }
        let ecgAvgMin = sumEcgData / this.ecgChartData.length;
        this.minEcgValue = ecgAvgMin;

        let sumPpgData = 0;
        for (let i = 0; i < this.ppgChartData.length; i++) {
          sumPpgData += parseInt(this.ppgChartData[i], 10);
        }
        let ppgAvgMin = sumPpgData / this.ppgChartData.length;
        this.minPpgValue = ppgAvgMin;
        this.showEcgChart = false;
        this.showPpgChart = false;
        this.$nextTick(() => {
          this.showEcgChart = true;
          this.showPpgChart = true;
        });
        // }, 5000);
        console.log("ppg--", this.ppgChartData);
        console.log("ecg--", this.ecgChartData);
        this.client.end();
      });
    },
  },
};
</script>

<style scoped>
.sleep__div {
  display: flex;
  height: 40px;
  align-items: center;
  padding: 10px;
}
.grid-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: start;
  max-width: 100%;
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
.export__btn:hover {
  background-color: orange;
  color: white !important;
}
</style>
