<template>
  <div style="background-color: #282934">
    <PageHeader title="Patient Details" pageIcon="mdi-account-box" />
    <br />
    <div class="white--text" style="background-color: rgba(0, 0, 0, 0.5)">
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
            <v-img
              class="mt-1"
              src="@/assets/live.png"
              height="50"
              width="50"
              contain
              v-if="liveMessage === 'Online'"
            ></v-img>
            <v-img
              class="mt-1"
              src="@/assets/Oracle-Scheduler.jpg"
              height="50"
              width="50"
              contain
              v-if="liveMessage === 'offline'"
            ></v-img>
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
                    <LineChart :key="showEcgChart" :width="600" :height="250" />
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
                      :width="600"
                      :height="250"
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
              <v-card
                color="#282934"
                class="ml-2 mb-2 pa-2"
                dark
                style="width: 100%"
              >
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
                    <h1 class="success--text">74</h1>
                    <div class="d-flex" style="flex-direction: column">
                      <small>>120-30</small>
                      <small>C1</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm12 md3>
              <v-card
                dark
                color="#282934"
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex align-center ml-3 mt-2">
                  <v-img
                    class=""
                    src="https://accu.live/images/doctor_dashboard/doc-lunghs.svg"
                    height="45"
                    contain
                  ></v-img>
                  <div class="mr-16">
                    <h1 class="info--text">16</h1>
                    <div class="d-flex" style="flex-direction: column">
                      <small>C1</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm12 md3>
              <v-card
                color="#282934"
                dark
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
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
                    <h1 class="red--text">98.7</h1>
                    <div class="d-flex text-start flex-column">
                      <small>6 hours</small>
                      <small>ago</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm12 md3>
              <v-card
                color="#282934"
                dark
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
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
                    <h1 class="purple--text">3000</h1>
                    <div class="d-flex" style="flex-direction: column">
                      <small>Steps</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex d-flex xs12 sm4 md4>
              <v-card
                color="#282934"
                dark
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Oxygen Saturation</h3>
                    <small class="warning--text">00:0B:57:AC:66:DA</small>
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    <h3>Last Reading</h3>
                    <small class="grey--text">2 hour ago</small>
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
                    <h1 class="warning--text">98</h1>
                    <div class="d-flex" style="flex-direction: column">
                      <small>Streaming Mode</small>
                      <small>%SPO2</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm4 md4>
              <v-card
                color="#282934"
                dark
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Blood Pressure</h3>
                    <small class="warning--text">No Device Paired</small>
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    <h3>Last Reading</h3>
                    <small class="grey--text">2 hour ago</small>
                  </div>
                </div>
                <div class="d-flex justify-center align-center ml-5 mt-5">
                  <v-img
                    src="https://accu.live/images/doctor_dashboard/oxi-meter.svg"
                    height="50"
                    contain
                  ></v-img>
                  <div class="mr-16 text-start">
                    <h1 class="cyan--text">118/77</h1>
                    <div class="d-flex" style="flex-direction: column">
                      <small>Manual Entry</small>
                      <small>mmHg</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm4 md4>
              <v-card
                color="#282934"
                dark
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div class="d-flex text-start">
                  <div>
                    <h3>Map</h3>
                    <small class="red--text">Mean arterial pressure</small>
                  </div>
                  <v-spacer></v-spacer>
                  <div>
                    <h3>Last Reading</h3>
                    <small class="grey--text">2 hour ago</small>
                  </div>
                </div>
                <div class="d-flex justify-center mt-5">
                  <v-img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyqpbFKW78u7-eVk9xSUprI5H-Q2Y33gMQ3A&usqp=CAU"
                    width="70"
                    height="70"
                    contain
                    class="mt-3"
                  ></v-img>
                  <div class="text-start mr-16">
                    <h1 class="red--text">61.3 kg</h1>
                    <div class="d-flex" style="flex-direction: column">
                      <small>Manual Entry</small>
                      <small>mmHg</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <!--rr interval-->
            <v-flex d-flex xs12 sm12 md3>
              <v-card
                color="#282934"
                dark
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div
                  class="d-flex justify-xs-start justify-sm-center align-center ml-3 mt-2"
                >
                  <v-img
                    class="mr-5"
                    src="https://www.shutterstock.com/image-illustration/frequency-ectopic-junctional-impulse-higher-600w-1888283284.jpg"
                    height="50"
                    width="50"
                    contain
                  ></v-img>
                  <div class="mr-10">
                    <h1 class="red--text">R.R.</h1>
                    <div class="d-flex text-start flex-column">
                      <small>6 hours</small>
                      <small>ago</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>

            <!--pulse pressure-->
            <v-flex d-flex xs12 sm12 md3>
              <v-card
                color="#282934"
                dark
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div
                  class="d-flex justify-xs-start justify-sm-center align-center mt-2"
                >
                  <v-img
                    class="mr-5"
                    src="https://www.shutterstock.com/shutterstock/photos/1390281845/display_1500/stock-vector-pulse-icon-graphic-design-template-vector-isolated-1390281845.jpg"
                    height="50"
                    width="50"
                    contain
                  ></v-img>
                  <div class="mr-10">
                    <h1 class="red--text text-start">P.P.</h1>
                    <div class="d-flex text-start flex-column">
                      <small>6 hours</small>
                      <small>ago</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>

            <!--arrthymia-->
            <v-flex d-flex xs12 sm12 md3>
              <v-card
                color="#282934"
                dark
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div
                  class="d-flex justify-xs-start justify-sm-center align-center ml-3 mt-2"
                >
                  <v-img
                    class="mr-5"
                    src="https://www.shutterstock.com/image-photo/cardiology-diagnosis-treatment-prevention-myocardial-600w-1236688648.jpg"
                    height="50"
                    width="50"
                    contain
                  ></v-img>
                  <div class="mr-10">
                    <h1 class="red--text">Arrthymia</h1>
                    <div class="d-flex text-start flex-column">
                      <small>6 hours</small>
                      <small>ago</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>

            <!--Stroke Volume-->
            <v-flex d-flex xs12 sm12 md3>
              <v-card
                color="#282934"
                dark
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div
                  class="d-flex justify-xs-start justify-sm-center align-center ml-3 mt-2"
                >
                  <v-img
                    class="mr-5"
                    src="https://www.shutterstock.com/image-illustration/human-heart-anatomy-healthy-body-600w-91378037.jpg"
                    height="50"
                    width="50"
                    contain
                  ></v-img>
                  <div class="mr-10">
                    <h1 class="red--text">S.V.</h1>
                    <div class="d-flex text-start flex-column">
                      <small>6 hours</small>
                      <small>ago</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <!--Cardiac Output-->
            <v-flex d-flex xs12 sm12 md3>
              <v-card
                color="#282934"
                dark
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div
                  class="d-flex justify-xs-start justify-sm-center align-center ml-3 mt-2"
                >
                  <v-img
                    class="mr-5"
                    src="https://www.shutterstock.com/image-illustration/3d-illustration-cardiac-output-title-600w-1441779827.jpg"
                    height="50"
                    width="50"
                    contain
                  ></v-img>
                  <div class="mr-5">
                    <h1 class="red--text">C.O.</h1>
                    <div class="d-flex text-start flex-column">
                      <small>6 hours</small>
                      <small>ago</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>

            <!--Pulse transit time-->
            <v-flex d-flex xs12 sm12 md3>
              <v-card
                color="#282934"
                dark
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
                <div
                  class="d-flex justify-xs-start justify-sm-center align-center ml-3 mt-2"
                >
                  <v-img
                    class="mr-5"
                    src="https://www.shutterstock.com/image-vector/emergency-ekg-monitoring-blue-glowing-600w-2172529989.jpg"
                    height="50"
                    width="100"
                    contain
                  ></v-img>
                  <div class="mr-10">
                    <h1 class="red--text text-start">Ptt</h1>
                    <div class="d-flex text-start flex-column">
                      <small>6 hours</small>
                      <small>ago</small>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex d-flex xs12 sm12 md6>
              <v-card
                color="#282934"
                dark
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
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
                        <span class="warning--text">00:0B:57:AC:66:DA</span>
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
                    :chart-bg-color="'#fd5d5d'"
                  />
                </div>
              </v-card>
            </v-flex>

            <v-flex d-flex xs12 sm12 md6>
              <v-card
                color="#282934"
                dark
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
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
                        <span class="warning--text">mmHg</span>
                      </div>
                    </h3>
                    <v-spacer></v-spacer>
                    <v-btn class="mr-3 export__btn" color="warning" outlined
                      >Export</v-btn
                    >
                  </div>
                </div>
                <div class="grid-container">
                  <ApexAreaChart
                    :height="350"
                    :data-of-chart="[72, 115, 95, 130, 60, 116, 88]"
                    :chart-label="[
                      '12pm',
                      '1pm',
                      '2pm',
                      '3pm',
                      '4pm',
                      '5pm',
                      '6pm',
                    ]"
                    :chart-border-color="'#774af1'"
                    :chart-bg-color="['#7741f1']"
                  />
                </div>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex d-flex xs12 sm12 md6>
              <v-card
                color="#282934"
                dark
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
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
                        <span class="warning--text">mmHg</span>
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
                    :chart-bg-color="'cyan'"
                  />
                </div>
              </v-card>
            </v-flex>

            <v-flex d-flex xs12 sm12 md6>
              <v-card
                color="#282934"
                dark
                class="ml-2 mb-2 pa-2"
                style="width: 100%"
              >
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
                        <span class="warning--text">Hrs/Day</span>
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
                  <ApexAreaChart
                    :height="350"
                    :data-of-chart="[72, 115, 95, 130, 60, 116, 88]"
                    :chart-label="[
                      '12pm',
                      '1pm',
                      '2pm',
                      '3pm',
                      '4pm',
                      '5pm',
                      '6pm',
                    ]"
                    :chart-border-color="'cyan'"
                    :chart-bg-color="['cyan']"
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
import TestChart from "@/components/TestChart.vue";
import ApexAreaChart from "@/components/ApexAreaChart.vue";
export default {
  name: "PatientDetails",
  components: {
    LineChart,
    RealTimeChart,
    PageHeader,
    TestChart,
    ApexAreaChart,
  },
  data() {
    return {
      getDoctorId: localStorage.getItem("user_id"),
      ecgChartData: [],
      ppgChartData: [],
      showEcgChart: true,
      showPpgChart: true,
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
      liveMessage: "offline",
    };
  },
  computed: {
    ...mapGetters("doctors", [
      "loadingStatus",
      "getSingleDeviceData",
      "getMacAddress",
    ]),
  },
  unmounted() {
    this.client.close();
    console.log("Connection Closed");
  },
  created() {
    this.getSingleDevice(this.$route?.params?.id);
  },
  mounted() {
    this.createConnection();
    setTimeout(() => {
      this.getAlgoData();
      this.getBodyTempGraph();
      this.getBloodO2Grpah();
      this.getStepsGraph();
    }, 1000);
  },
  methods: {
    ...mapActions("doctors", ["getSingleDevice"]),
    ...mapActions("chartData", ["setEcgData", "setPpgData"]),
    ...mapActions("patientData", [
      "getPatientAlgoData",
      "getPatientBodyTempData",
      "getPatientBloodOxygenData",
      "getPatientStepsData",
    ]),
    getFullName(s1, s2) {
      return (
        s1?.charAt(0).toUpperCase() +
        s1?.slice(1) +
        " " +
        s2?.charAt(0).toUpperCase() +
        s2?.slice(1)
      );
    },
    getAlgoData() {
      const payload = {
        speedometerId: this.getMacAddress.toString().toUpperCase(),
        startDate: 1667301683000,
        endDate: 1669288883000,
      };
      this.getPatientAlgoData(payload);
    },
    getBodyTempGraph() {
      const payload = {
        speedometerId: this.getMacAddress.toString().toUpperCase(),
        agrFunction: "average",
        timePeriod: "1day",
        startDate: 1667301683000,
        endDate: 1669288883000,
      };
      this.getPatientBodyTempData(payload);
    },
    getBloodO2Grpah() {
      const payload = {
        speedometerId: this.getMacAddress.toString().toUpperCase(),
        agrFunction: "average",
        timePeriod: "1day",
        startDate: 1667301683000,
        endDate: 1669288883000,
      };
      this.getPatientBloodOxygenData(payload);
    },
    getStepsGraph() {
      const payload = {
        speedometerId: this.getMacAddress.toString().toUpperCase(),
        agrFunction: "average",
        timePeriod: "1day",
        startDate: 1667301683000,
        endDate: 1669288883000,
      };
      this.getPatientStepsData(payload);
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
      });
      this.client.on("error", (error) => {
        console.log("Connection failed", error);
      });
      this.client.on("message", (_, message) => {
        let data = JSON.parse(message);
        console.log("data--", JSON.parse(message));
        this.liveMessage = data?.message;
        this.ecgChartData = data?.ecg_vals;
        this.ppgChartData = data?.ppg_vals;
        this.setEcgData(this.ecgChartData);
        this.setPpgData(this.ppgChartData);
        this.showEcgChart = false;
        this.showPpgChart = false;
        this.$nextTick(() => {
          this.showEcgChart = true;
          this.showPpgChart = true;
        });
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

h1 {
  font-size: 2rem;
}
</style>
