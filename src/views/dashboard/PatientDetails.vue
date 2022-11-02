<template>
  <div>
    <h1>Patient Details</h1>
    <v-progress-circular
      indeterminate
      color="amber"
      v-if="loadingStatus"
    ></v-progress-circular>
    <div v-else>
      <div class="d-flex align-center">
        <v-img
          class="rounded-circle mr-4"
          src="https://picsum.photos/id/11/50/50"
          max-width="50"
          max-height="50"
        />
        <h3 class="mr-2">
          {{
            getFullName(
              getPatients[1]?.customerfirstName,
              getPatients[1]?.customerlastName
            )
          }}
          - {{ getPatients[1]?.mac_address_framed }}
        </h3>
        <v-spacer></v-spacer>
        <h3 class="mr-3">Floor - 2</h3>
        <h3 class="mr-3">Room - 205</h3>
        <h3 class="mr-3">0073fa</h3>
        <h3 class="mr-3">114Hrs 45Min</h3>
        <v-spacer></v-spacer>
        <h3>
          Device Status
          <v-switch
            v-model="deviceStatus"
            color="success"
            value="success"
            hide-details
          ></v-switch>
        </h3>
      </div>

      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex d-flex xs12 sm6 md6>
            <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
              <div class="d-flex">
                <h3>ECG</h3>
                <v-spacer></v-spacer>
                <v-btn class="mr-3" color="warning" outlined>Export</v-btn>
              </div>
              <div class="d-flex align-start">
                <div class="grid-container">
                  <!-- <HighChartTest /> -->
                  <LineChart :chart-data="tempData" />
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
                <v-btn class="mr-3" color="warning" outlined>Export</v-btn>
              </div>
              <div class="d-flex align-start">
                <div class="grid-container">
                  <RealTimeChart
                    :height="100"
                    :ppgDatasets="ppgTempData"
                    :minValue="Math.min(...ppgChartData)"
                    :maxValue="Math.max(...ppgChartData)"
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
              <div class="d-flex justify-xs-start justify-sm-center ml-3 mt-2">
                <v-btn class="mr-3" color="success" height="70" width="70" dark>
                  <v-icon dark> mdi-heart-pulse </v-icon>
                </v-btn>
                <div>
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
              <div class="d-flex justify-xs-start justify-sm-center ml-3 mt-2">
                <v-btn class="mr-3" color="success" height="70" width="70" dark>
                  <v-img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUPOPmV75QuVElVvma4Gx3eo-euDvi6lSzCA&usqp=CAU"
                    width="50"
                    height="50"
                  ></v-img>
                </v-btn>
                <div>
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
              <div class="d-flex justify-xs-start justify-sm-center ml-3 mt-2">
                <v-btn class="mr-3" color="success" height="70" width="70" dark>
                  <v-icon dark> mdi-coolant-temperature </v-icon>
                </v-btn>
                <div>
                  <h1>98.7</h1>
                  <div class="d-flex" style="flex-direction: column">
                    <small>6 hours</small>
                    <small>ago</small>
                  </div>
                </div>
              </div>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm12 md3>
            <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
              <div class="d-flex justify-xs-start justify-sm-center ml-3 mt-2">
                <v-btn class="mr-3" color="success" height="70" width="70" dark>
                  <v-icon dark> mdi-foot-print </v-icon>
                  <v-icon dark> mdi-foot-print </v-icon>
                </v-btn>
                <div>
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
              <div class="d-flex justify-xs-start justify-sm-center ml-5">
                <div style="background-color: pink" class="mr-3 ml-1">
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
              <div class="d-flex">
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
              <div class="d-flex justify-center ml-5 mt-5">
                <v-btn class="mr-3" color="success" height="70" width="70" dark>
                  <v-img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLwxalL1AdbOEGQZ0tcerGvRHCHF21XiAvn5scM4A&s"
                    width="70"
                    height="70"
                  ></v-img>
                </v-btn>
                <div>
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
              <div class="d-flex">
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
              <div class="d-flex justify-center ml-5 mt-5">
                <v-btn class="mr-3" color="success" height="70" width="70" dark>
                  <v-img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqhMFwNm_SkDfYGFa5g_7RXOrU-HUqthtqMQ&usqp=CAU"
                    width="70"
                    height="70"
                  ></v-img>
                </v-btn>
                <div>
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
              <div class="d-flex">
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
                <v-btn class="mr-3" color="success" height="70" width="70" dark>
                  <v-img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqhMFwNm_SkDfYGFa5g_7RXOrU-HUqthtqMQ&usqp=CAU"
                    width="70"
                    height="70"
                  ></v-img>
                </v-btn>
                <div>
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
                      <div style="background-color: #dc143c" class="mr-3 ml-1">
                        <v-icon dark size="50">
                          mdi-coolant-temperature
                        </v-icon>
                      </div>
                    </span>
                    <div class="d-flex" style="flex-direction: column">
                      <span>Body Temperature</span>
                      <span>00:0B:57:AC:66:DA</span>
                    </div>
                  </h3>
                  <v-spacer></v-spacer>
                  <v-btn class="mr-3" color="warning" outlined>Export</v-btn>
                </div>
              </div>
            </v-card>
          </v-flex>

          <v-flex d-flex xs12 sm12 md6>
            <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
              <div>
                <div class="d-flex justify-center align-center">
                  <h3 class="d-flex align-center mt-2">
                    <span>
                      <v-img
                        class="mr-3"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUPOPmV75QuVElVvma4Gx3eo-euDvi6lSzCA&usqp=CAU"
                        height="50"
                        width="50"
                      ></v-img>
                    </span>
                    <div class="d-flex" style="flex-direction: column">
                      <span>Blood Oxygen</span>
                      <span>mmHg</span>
                    </div>
                  </h3>
                  <v-spacer></v-spacer>
                  <v-btn class="mr-3" color="warning" outlined>Export</v-btn>
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
                      <div style="background-color: green" class="mr-3 ml-1">
                        <v-icon dark size="50"> mdi-heart-pulse </v-icon>
                      </div>
                    </span>
                    <div class="d-flex" style="flex-direction: column">
                      <span>Heart Rate</span>
                      <span>mmHg</span>
                    </div>
                  </h3>
                  <v-spacer></v-spacer>
                  <v-btn class="mr-3" color="warning" outlined>Export</v-btn>
                </div>
              </div>
            </v-card>
          </v-flex>

          <v-flex d-flex xs12 sm12 md6>
            <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
              <div>
                <div class="d-flex justify-center align-center">
                  <h3 class="d-flex align-center mt-2">
                    <span>
                      <div style="background-color: grey" class="mr-3 ml-1">
                        <v-icon dark size="50"> mdi-power-sleep </v-icon>
                      </div>
                    </span>
                    <div class="d-flex" style="flex-direction: column">
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
                  <v-btn class="mr-3" color="warning" outlined>Export</v-btn>
                </div>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import mqtt from "mqtt/dist/mqtt";
import LineChart from "../../components/LineChart.vue";
import RealTimeChart from "@/components/RealTimeChart.vue";
// import HighChartTest from "@/components/HighChartTest.vue";
// import CustomCard from "@/components/CustomCard.vue";
export default {
  name: "PatientDetails",
  components: {
    LineChart,
    RealTimeChart,
    // HighChartTest,
  },
  data() {
    return {
      getDoctorId: localStorage.getItem("user_id"),
      deviceStatus: false,
      ecgChartData: [],
      ppgChartData: [],
      tempData: [],
      ppgTempData: [],
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
    ...mapGetters("doctors", ["getPatients", "loadingStatus"]),
  },
  mounted() {
    this.createConnection();
    this.getPatientsForDoctor(this.getDoctorId);
  },
  watch: {
    ecgChartData: {
      deep: true,
      handler(val) {
        this.tempData = val;
      },
    },
    ppgChartData: {
      deep: true,
      handler(val) {
        this.ppgTempData = val;
      },
    },
  },
  methods: {
    ...mapActions("doctors", ["getPatientsForDoctor"]),
    getFullName(s1, s2) {
      return s1 + " " + s2;
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
          `BMSFSEV/${this.getPatients[1]?.mac_address_framed}/sTOf`
        );
        // this.client.subscribe(
        //   `BacAccuLive/${this.getPatients[0]?.mac_address_framed}/ctoa`
        // );
        // console.log("hello", this.client);
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
        // this.receiveNews = this.receiveNews.concat(message);
        let data = JSON.parse(message);
        // console.log(`Message -- ${message}`);
        console.log("data--", JSON.parse(message));
        // setTimeout(() => {
        // console.log("data12121--", data);
        this.ecgChartData = data?.ecg_vals;
        this.ppgChartData = data?.ppg_vals;
        // }, 5000);
        console.log("ppg--", this.ppgChartData);
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
</style>
