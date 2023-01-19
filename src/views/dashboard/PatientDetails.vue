<template>
  <div>
    <PageHeader
      title="Patient Details"
      pageIcon="mdi-arrow-left"
      @goBack="$router.go(-1)"
    />
    <br />
    <div class="patient-details-wrapper">
      <v-progress-circular
        indeterminate
        color="amber"
        v-if="loadingStatus"
      ></v-progress-circular>
      <div v-else class="patient-header">
        <div class="d-flex align-center text-nowrap flex-wrap">
          <div class="user-pic-header mr-auto">
            <img
              class="rounded-circle user-image"
              src="https://picsum.photos/id/11/50/50"
              max-width="80"
              max-height="80"
            />
            <h3
              class="ml-5"
              :style="{
                fontSize: $vuetify.breakpoint.smAndDown ? '20px' : '26px',
              }"
            >
              {{
                getFullName(
                  getSingleDeviceData[0]?.customerFirstName,
                  getSingleDeviceData[0]?.customerLastName
                )
              }}
            </h3>
            <button class="btn-orange mr-4">
              <v-icon>mdi-cog</v-icon>
            </button>
          </div>
          <div class="d-flex flex-wrap mr-auto">
            <div class="item">
              <img src="@/assets/floor.svg" height="20" width="20" contain />
              <h3
                class="ml-3 font-weight-regular"
                :style="{
                  fontSize: $vuetify.breakpoint.smAndDown ? '16px' : '20px',
                }"
              >
                Floor - 1
              </h3>
            </div>
            <div class="item">
              <img src="@/assets/rooms.svg" height="20" width="20" contain />
              <h3
                class="ml-3 font-weight-regular"
                :style="{
                  fontSize: $vuetify.breakpoint.smAndDown ? '16px' : '20px',
                }"
              >
                Room - 1
              </h3>
            </div>
            <div class="item">
              <img
                src="@/assets/macAddress.svg"
                height="20"
                width="20"
                contain
              />
              <h3
                class="ml-3 font-weight-regular"
                :style="{
                  fontSize: $vuetify.breakpoint.smAndDown ? '16px' : '20px',
                }"
              >
                {{ getSingleDeviceData[0]?.macAddressFramed.toUpperCase() }}
              </h3>
            </div>
            <div class="item">
              <img src="@/assets/battery.svg" height="20" width="20" contain />
              <h3
                class="ml-3 font-weight-regular"
                :style="{
                  fontSize: $vuetify.breakpoint.smAndDown ? '16px' : '20px',
                }"
              >
                {{
                  getSingleDeviceData[0]?.batdata
                    ? getSingleDeviceData[0]?.batdata.bat_vals
                    : "100"
                }}
                %
              </h3>
            </div>
          </div>
          <div class="d-flex align-center device-status-row">
            <h3
              class="mr-5 font-weight-medium green--text"
              style="font-size: 20px"
            >
              Device Status
            </h3>
            <v-switch
              v-model="pushNotification"
              color="success"
              value="true"
              inset
            ></v-switch>
            <!-- <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-img
                  v-on="on"
                  v-bind="attrs"
                  class="mt-2"
                  src="@/assets/Live1.png"
                  height="50"
                  width="50"
                  contain
                  v-if="liveMessage === 'Online'"
                ></v-img>
              </template>
              <span>Live Mode</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-img
                  v-bind="attrs"
                  v-on="on"
                  class="mt-2"
                  src="@/assets/Scheduler.png"
                  height="50"
                  width="50"
                  contain
                  v-if="liveMessage === 'Offline'"
                ></v-img>
              </template>
              <span>Scheduler Mode</span>
            </v-tooltip> -->
          </div>
        </div>

        <div class="d-flex mt-6 justify-md-space-around">
          <!-- <div class="ml-6">
            <v-select
              :items="aggregateValues"
              filled
              dense
              label="Aggregate"
              v-model="selectedAggregate"
            ></v-select>
          </div> -->
          <div class="ml-6">
            <v-select
              :items="timePeriodValues"
              v-model="selectedTimePeriod"
              filled
              label="Time Period"
              dense
            ></v-select>
          </div>
          <div>
            <v-menu
              v-model="startDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
              max-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="Select Date"
                  readonly
                  hide-details
                  :value="startDateValue"
                  @focus="focusStartDate"
                  filled
                  dense
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="en-in"
                v-model="startDateValue"
                no-title
                @input="startDateMenu = false"
                :max="new Date().toISOString().slice(0, 10)"
              ></v-date-picker>
            </v-menu>
          </div>
          <!-- <div class="ml-6">
            <v-menu
              v-model="endDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
              max-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="End Date"
                  readonly
                  hide-details
                  :value="endDateValue"
                  @focus="focusEndDate"
                  filled
                  dense
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="en-in"
                v-model="endDateValue"
                no-title
                :min="startDateValue"
                :max="new Date().toISOString().slice(0, 10)"
                @input="endDateMenu = false"
              ></v-date-picker>
            </v-menu>
          </div> -->
        </div>

        <v-layout row wrap class="mt-8">
          <v-flex d-flex xs12 sm12 md6 class="mb-5">
            <div class="d-flex align-center w-100">
              <h3>ECG</h3>
              <v-spacer></v-spacer>
              <v-btn class="export__btn" color="warning" outlined>Export</v-btn>
            </div>
            <div>
              <div class="d-flex align-start mt-2">
                <div
                  :id="getSingleDeviceData[0]?.macAddressFramed.toUpperCase()"
                  class="grid-container w-100"
                >
                  <!-- <LineChart
                      :key="showEcgChart"
                      :width="834.24"
                      :height="299.53"
                    /> -->
                  <ecg-chart
                    :ecgDataFromProps="ecgChartData"
                    :macAddress="
                      getSingleDeviceData[0]?.macAddressFramed.toUpperCase()
                    "
                    :key="showEcgChart"
                    v-if="showEcgChart"
                    :width="834.24"
                    :height="299.53"
                  />
                </div>
              </div>
            </div>
          </v-flex>
          <v-flex d-flex xs12 sm12 md6 class="mb-5">
            <div class="d-flex w-100">
              <h3>PPG</h3>
              <v-spacer></v-spacer>
              <v-btn class="export__btn" color="warning" outlined>Export</v-btn>
            </div>
            <div>
              <div class="d-flex align-start mt-2">
                <div class="grid-container w-100">
                  <ppg-chart
                    :width="834.24"
                    :height="299.53"
                    :key="showPpgChart"
                    v-if="showPpgChart"
                    :ppgDataFromProps="ppgChartData"
                  />
                </div>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </div>
      <v-layout row wrap>
        <v-flex d-flex xs6 sm6 md4 column5>
          <div class="mini-light-box">
            <img
              src="@/assets/heartbeat.svg"
              height="70"
              width="70"
              contain
              class="mini-icon"
            />
            <div class="mini-content">
              <h4 class="mini-title text-success">
                {{ getAlgoData?.hr ? getAlgoData.hr : "Loading..." }}
                <!-- {{
                  getAlgoData?.hrv ? Math.round(getAlgoData.hrv) : "Loading..."
                }} -->
              </h4>
              <small>>120 &lt; 30 C1</small>
            </div>
            <!-- <div v-if="!$vuetify.breakpoint.smOnly">
              <h3 class="font-weight-medium">Last Reading</h3>
              <small class="grey--text">2 hour ago</small>
            </div> -->
          </div>
        </v-flex>
        <v-flex d-flex xs6 sm6 md4 column5>
          <div class="mini-light-box">
            <img
              src="@/assets/lungs.svg"
              height="70"
              width="70"
              contain
              class="mini-icon"
            />
            <div class="mini-content">
              <h4 data-v-7ae0f2dc="" class="mini-title text-purple">16</h4>
              <small>C1</small>
            </div>
          </div>
        </v-flex>
        <v-flex d-flex xs6 sm6 md4 column5>
          <div class="mini-light-box">
            <img
              src="@/assets/temprature.svg"
              height="70"
              width="70"
              contain
              class="mini-icon"
            />
            <div class="mini-content">
              <h4 data-v-7ae0f2dc="" class="mini-title text-danger">98.7</h4>
              <small>2 hours ago</small>
            </div>
          </div>
        </v-flex>
        <v-flex d-flex xs6 sm6 md4 column5>
          <div class="mini-light-box">
            <img
              src="@/assets/steps.svg"
              height="70"
              width="70"
              contain
              class="mini-icon"
            />
            <div class="mini-content">
              <h4 data-v-7ae0f2dc="" class="mini-title text-pink">3000</h4>
              <small>Steps</small>
            </div>
          </div>
        </v-flex>
        <v-flex d-flex sm12 md4 column5>
          <div class="mini-light-box">
            <img
              src="@/assets/Man.svg"
              height="70"
              width="70"
              contain
              class="mini-icon"
            />
            <div class="mini-content">
              <h4 data-v-7ae0f2dc="" class="mini-title text-brown">3000</h4>
              <small>Posture</small>
            </div>
          </div>
        </v-flex>
        <div class="w-100"></div>
        <v-flex d-flex sm12 lg4>
          <div class="mini-light-box">
            <div class="min-light-header">
              <div class="left">
                <h3>Oxygen Saturation</h3>
                <small class="warning--text">00:0B:57:AC:66:DA</small>
              </div>
              <div class="right">
                <div v-if="!$vuetify.breakpoint.smOnly">
                  <h3 class="font-weight-medium">Last Reading</h3>
                  <small class="grey--text">2 hour ago</small>
                </div>
              </div>
            </div>
            <div class="d-flex justify-center align-center mt-5">
              <v-flex>
                <v-img
                  src="@/assets/oxygen.svg"
                  height="70"
                  width="70"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs12>
                <div class="text-medium">
                  <h1 class="text-warning">
                    {{
                      getBloodOxygenGraphData[0]?.avgspo2
                        ? Math.round(getBloodOxygenGraphData[0]?.avgspo2)
                        : "Loading..."
                    }}
                    <span class="unit">%SPO2</span>
                  </h1>
                  <div class="d-flex flex-column">
                    <small>Streaming Mode</small>
                  </div>
                </div>
              </v-flex>
            </div>
          </div>
        </v-flex>
        <v-flex d-flex sm12 lg4>
          <div class="mini-light-box">
            <div class="min-light-header">
              <div class="left">
                <h3>Temperature</h3>
                <small class="warning--text">00:0B:57:AC:66:DA</small>
              </div>
              <div class="right">
                <div v-if="!$vuetify.breakpoint.smOnly">
                  <h3 class="font-weight-medium">Last Reading</h3>
                  <small class="grey--text">2 hour ago</small>
                </div>
              </div>
            </div>
            <div class="d-flex justify-center align-center mt-5">
              <v-flex>
                <v-img
                  src="@/assets/bloodPressure.svg"
                  height="70"
                  width="70"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs12>
                <div class="text-medium">
                  <h1 class="text-info">
                    {{
                      getAlgoData?.bp
                        ? Math.round(getAlgoData?.bp)
                        : "Loading..."
                    }}
                    /
                    {{
                      getAlgoData?.dbp ? Math.round(getAlgoData?.dbp) : "..."
                    }}
                    <span class="unit">mmHg</span>
                  </h1>
                  <div class="d-flex flex-column">
                    <small>Manual Entry</small>
                  </div>
                </div>
              </v-flex>
            </div>
          </div>
        </v-flex>
        <v-flex d-flex sm12 lg4>
          <div class="mini-light-box">
            <div class="min-light-header">
              <div class="left">
                <h3 cl>Weight</h3>
                <small class="warning--text">No Device Paired</small>
              </div>
              <div class="right">
                <div v-if="!$vuetify.breakpoint.smOnly">
                  <h3 class="font-weight-medium">Last Reading</h3>
                  <small class="grey--text">2 hour ago</small>
                </div>
              </div>
            </div>
            <div class="d-flex justify-center align-center mt-5">
              <v-flex>
                <v-img
                  src="@/assets/weight.svg"
                  height="70"
                  width="70"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs12>
                <div class="text-medium">
                  <h1 class="text-danger">
                    {{
                      getAlgoData?.prv
                        ? Math.round(getAlgoData.prv)
                        : "Loading..."
                    }}
                    <span class="unit">%SPO2</span>
                  </h1>
                  <div class="d-flex flex-column">
                    <small>Streaming Mode</small>
                  </div>
                </div>
              </v-flex>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm12 md6>
          <div class="mini-light-box">
            <div class="w-100 d-flex justify-center align-center">
              <h3 class="d-flex align-center">
                <span>
                  <v-img
                    src="@/assets/temprature.svg"
                    height="50"
                    width="50"
                    contain
                  ></v-img>
                </span>
                <div class="d-flex ml-5 text-start flex-column">
                  <span>Body Temperature</span>
                  <span class="warning--text" style="font-size: 16px"
                    >00:0B:57:AC:66:DA</span
                  >
                </div>
              </h3>
              <v-spacer></v-spacer>
              <v-btn class="export__btn" color="warning" outlined>Export</v-btn>
            </div>
            <div class="grid-container w-100">
              <TestChart
                v-if="getBodyTempGraphData"
                :height="286"
                :width="623"
                :data-of-chart="getBodyTempGraphData"
                :chart-id="'temperatureGraph'"
                :label="['12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm']"
                :chart-bg-color="'#fd5d5d'"
              />
            </div>
          </div>
        </v-flex>

        <v-flex d-flex xs12 sm12 md6>
          <div class="mini-light-box">
            <div class="w-100 d-flex justify-center align-center">
              <h3 class="d-flex align-center">
                <v-img
                  src="@/assets/lungs.svg"
                  height="50"
                  width="50"
                  contain
                ></v-img>
                <div class="d-flex ml-5 text-start flex-column">
                  <span>Blood Oxygen</span>
                  <span class="warning--text" style="font-size: 16px"
                    >mmHg</span
                  >
                </div>
              </h3>
              <v-spacer></v-spacer>
              <v-btn class="export__btn" color="warning" outlined>Export</v-btn>
            </div>
            <div class="grid-container w-100">
              <!-- <ApexAreaChart
                    :height="366"
                    :width="770"
                    :data-of-chart="getBloodOxygenGraphData"
                    :chart-id="'OxygenGraph'"
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
                  /> -->
            </div>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm12 md6>
          <div class="mini-light-box">
            <div class="w-100 d-flex justify-center align-center">
              <h3 class="d-flex align-center">
                <v-img
                  src="@/assets/heartbeat.svg"
                  height="50"
                  width="50"
                  contain
                ></v-img>
                <div class="d-flex ml-5 text-start flex-column">
                  <span>Heart Rate</span>
                  <span class="warning--text" style="font-size: 16px"
                    >00:0B:57:AC:66:DA</span
                  >
                </div>
              </h3>
              <v-spacer></v-spacer>
              <v-btn class="export__btn" color="warning" outlined>Export</v-btn>
            </div>
            <div class="grid-container w-100">
              <!-- <TestChart
                    :height="286"
                    :width="623"
                    :data-of-chart="[72, 115, 95, 130, 60, 116, 88]"
                    :label="['12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm']"
                    :chart-bg-color="'cyan'"
                  /> -->
            </div>
          </div>
        </v-flex>

        <v-flex d-flex xs12 sm12 md6>
          <div class="mini-light-box">
            <div class="w-100 d-flex justify-center align-center">
              <h3 class="d-flex align-center">
                <span>
                  <v-img
                    src="@/assets/sleep.svg"
                    height="50"
                    width="50"
                    contain
                  ></v-img>
                </span>
                <div class="d-flex ml-5 text-start flex-column">
                  <span>Sleep</span>
                  <span class="warning--text" style="font-size: 16px"
                    >Hrs/Day</span
                  >
                </div>
              </h3>
              <v-spacer></v-spacer>
              <div
                class="rounded-pill mr-4 sleep__block ml-auto"
                style="background-color: #f6f2f2"
              >
                <span class="btn-sm active">W</span>
                <span class="btn-sm">M</span>
                <span class="btn-sm">6M</span>
              </div>
              <v-btn class="export__btn" color="warning" outlined>Export</v-btn>
            </div>
            <div class="grid-container w-100">
              <ApexAreaChart
                v-if="getPatientSteps"
                :height="366"
                :width="770"
                :data-of-chart="getPatientSteps"
                :chart-id="'stepsGraph'"
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
          </div>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import mqtt from "mqtt/dist/mqtt";
import PageHeader from "@/layouts/PageHeader.vue";
import ApexAreaChart from "@/components/ApexAreaChart.vue";
import EcgChart from "@/components/EcgChart.vue";
import PpgChart from "@/components/PpgChart.vue";
// import HeartRateGraph from "@/components/HeartRateGraph.vue";
// import OxygenGraph from "@/components/OxygenGraph.vue";
// import TempratureGraph from "@/components/TempratureGraph.vue";
import moment from "moment";
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
export default {
  name: "PatientDetails",
  components: {
    PageHeader,
    ApexAreaChart,
    EcgChart,
    PpgChart,
    // HeartRateGraph,
    // OxygenGraph,
    // TempratureGraph,
  },
  data() {
    return {
      pushNotification: true,
      getDoctorId: localStorage.getItem("user_id"),
      aggregateValues: ["average", "minimum", "maximum"],
      selectedAggregate: "average",
      timePeriodValues: ["1hour", "1day", "7days", "30days"],
      timePeriodAddValue: {
        "1hour": 0,
        "1day": 1,
        "7days": 7,
        "30days": 30,
      },
      selectedTimePeriod: "7days",
      ecgChartData: [],
      ppgChartData: [],
      startDateMenu: false,
      endDateMenu: false,
      startDateValue: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10),
      endDateValue: null,
      tempStartTime: null,
      startTime: null,
      showEcgChart: false,
      showPpgChart: false,
      connection: {
        protocol: "mqtt",
        host: "194.233.69.96",
        port: 15675,
        endpoint: "ws",
        clean: true,
        connectTimeout: 30 * 1000,
        reconnectTimeout: 4000,
        keepAlive: 120,
        clientId: "lens_3DtlcZfxvR0idKzXQ90Vzm69vAM",
        username: "MYsmO5Oc7O6DKkS8",
        password: "ufUPnVWbLoMwwFaL",
        useSSL: true,
        reconnect: true,
        // options: {
        //   // clean: true,
        //   connectTimeout: 4000,
        //   // reconnectPeriod: 2000,
        //   // keepAlive: 120,
        //   clientId: "lens_3DtlcZfxvR0idKzXQ90Vzm69vAM",
        //   username: "MYsmO5Oc7O6DKkS8",
        //   password: "ufUPnVWbLoMwwFaL",
        // },
        // clean: true, // Reserved session
        // connectTimeout: 4000, // Time out
        // reconnectPeriod: 4000, // Reconnection interval
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
      qosList: [0, 1, 2],
      client: {
        connected: false,
      },
      subscribeSuccess: false,
      connecting: false,
      retryTimes: 0,
      liveMessage: "Offline",
    };
  },
  computed: {
    ...mapGetters("doctors", [
      "loadingStatus",
      "getSingleDeviceData",
      "getMacAddress",
    ]),
    ...mapGetters("patientData", [
      "getAlgoData",
      "getBloodOxygenGraphData",
      "getBodyTempGraphData",
      "getPatientSteps",
    ]),
    selectAllFilters() {
      return (
        this.selectedAggregate ||
        this.selectedTimePeriod ||
        this.startDateValue ||
        this.endDateValue
      );
    },
    lastSaved() {
      return moment(this.getAlgoData.createdAt).startOf("minutes").fromNow();
    },
  },
  destroyed() {
    if (this.client.connected) {
      try {
        this.client.end(false, () => {
          this.initData();
          console.log("Successfully disconnected!");
        });
      } catch (error) {
        console.log("Disconnect failed", error.toString());
      }
    }
  },
  created() {
    this.getSingleDevice(this.$route?.params?.id);
    this.createConnection();
  },
  watch: {
    // selectAllFilters(newVal, oldVal) {
    //   if (newVal || oldVal) {
    //     this.getBodyTempGraph();
    //     this.getBloodO2Grpah();
    //     this.getStepsGraph();
    //     this.getHeartRateGraph();
    //   }
    // },
    getMacAddress(val) {
      if (
        val &&
        this.startDateValue &&
        this.endDateValue &&
        this.selectedTimePeriod
      ) {
        this.displayAlgoData();
        this.getBodyTempGraph();
        this.getBloodO2Grpah();
        this.getStepsGraph();
        this.getHeartRateGraph();
      }
    },
    startDateValue: {
      immediate: true,
      handler() {
        // this.selectedFilters["endDate"]
        this.endDateValue = new Date(this.startDateValue)
          .addDays(this.timePeriodAddValue[this.selectedTimePeriod])
          .toISOString()
          .slice(0, 10);
        if (
          this.getMacAddress.length &&
          this.startDateValue &&
          this.endDateValue &&
          this.selectedTimePeriod
        ) {
          this.getBodyTempGraph();
          this.getBloodO2Grpah();
          this.getStepsGraph();
          this.getHeartRateGraph();
        }
      },
    },
    selectedTimePeriod: {
      handler() {
        this.endDateValue = new Date(this.startDateValue)
          .addDays(this.timePeriodAddValue[this.selectedTimePeriod])
          .toISOString()
          .slice(0, 10);
        if (
          this.getMacAddress &&
          this.startDateValue &&
          this.endDateValue &&
          this.selectedTimePeriod
        ) {
          this.getBodyTempGraph();
          this.getBloodO2Grpah();
          this.getStepsGraph();
          this.getHeartRateGraph();
        }
      },
    },
  },
  methods: {
    ...mapActions("doctors", ["getSingleDevice"]),
    ...mapActions("chartData", [
      "setEcgData",
      "setPpgData",
      "setSchedulerData",
    ]),
    ...mapActions("patientData", [
      "getPatientAlgoData",
      "getPatientBodyTempData",
      "getPatientBloodOxygenData",
      "getPatientStepsData",
      "getPatientHeartRateData",
    ]),
    focusStartDate() {
      setTimeout(() => {
        if (!this.startDateMenu) {
          this.startDateMenu = true;
        }
      }, 200);
    },
    focusEndDate() {
      setTimeout(() => {
        if (!this.endDateMenu) {
          this.endDateMenu = true;
        }
      }, 200);
    },
    initData() {
      this.client = {
        connected: false,
      };
      this.retryTimes = 0;
      this.connecting = false;
      this.subscribeSuccess = false;
    },
    getFullName(s1, s2) {
      return (
        s1?.charAt(0).toUpperCase() +
        s1?.slice(1) +
        " " +
        s2?.charAt(0).toUpperCase() +
        s2?.slice(1)
      );
    },
    displayAlgoData() {
      const payload = {
        mac_address_framed: this.getMacAddress.toString().toUpperCase(),
      };
      this.getPatientAlgoData(payload);
    },
    getBodyTempGraph() {
      const payload = {
        speedometerId: this.getMacAddress.toString().toUpperCase(),
        agrFunction: this.selectedAggregate,
        timePeriod: this.selectedTimePeriod,
        startDate: Date.parse(this.startDateValue),
        endDate: Date.parse(this.endDateValue),
      };
      this.getPatientBodyTempData(payload);
      setTimeout(() => {
        this.getPatientBodyTempData(payload);
      }, 5000);
    },
    getBloodO2Grpah() {
      const payload = {
        speedometerId: this.getMacAddress.toString().toUpperCase(),
        agrFunction: this.selectedAggregate,
        timePeriod: this.selectedTimePeriod,
        startDate: Date.parse(this.startDateValue),
        endDate: Date.parse(this.endDateValue),
      };
      this.getPatientBloodOxygenData(payload);
    },
    getStepsGraph() {
      const payload = {
        speedometerId: this.getMacAddress.toString().toUpperCase(),
        agrFunction: this.selectedAggregate,
        timePeriod: this.selectedTimePeriod,
        startDate: Date.parse(this.startDateValue),
        endDate: Date.parse(this.endDateValue),
      };
      this.getPatientStepsData(payload);
    },
    getHeartRateGraph() {
      const payload = {
        speedometerId: this.getMacAddress.toString().toUpperCase(),
        agrFunction: this.selectedAggregate,
        timePeriod: this.selectedTimePeriod,
        startDate: Date.parse(this.startDateValue),
        endDate: Date.parse(this.endDateValue),
      };
      this.getPatientHeartRateData(payload);
    },
    handleOnReConnect() {
      // return new Promise((resolve) => {
      //   this.client.end(true, {}, () => {
      //     this.client.reconnect();
      //     resolve();
      //   });
      // });
      this.retryTimes += 1;
      if (this.retryTimes > 5) {
        try {
          this.client.end();
          this.initData();
          console.log("Connection maxReconnectTimes limit, stop retry");
        } catch (error) {
          console.log("error---", error.toString());
        }
      }
    },
    createConnection() {
      try {
        this.connecting = true;
        const { protocol, host, port, endpoint, ...options } = this.connection;
        // const connectUrl = `${protocol}://${host}:${port}/${endpoint}`;
        const connectUrl = `wss://accu.live/ws/`;
        this.client = mqtt.connect(connectUrl, options);
        console.log(
          "url--",
          connectUrl,
          options,
          protocol,
          host,
          port,
          endpoint
        );
        if (this.client.on) {
          this.client.on("connect", () => {
            this.connecting = false;
            console.log("Connection succeeded!");
            this.subscribeSuccess = true;
            this.client.subscribe(
              `BMSFSEV/${this.getSingleDeviceData[0]?.macAddressFramed.toUpperCase()}/sTOf`
            );
          });
          this.client.on("reconnect", this.handleOnReConnect);
          this.client.on("error", (error) => {
            console.log("Connection failed", error);
          });
          this.client.on("message", async (_, message) => {
            this.showEcgChart = true;
            this.showPpgChart = true;
            this.ecgChartData = [];
            this.ppgChartData = [];
            let data = await JSON.parse(message);
            if (data?.msg === 17) {
              this.displayAlgoData();
            }
            console.log("data--", JSON.parse(message));
            this.liveMessage = data?.message;
            // if (this.liveMessage == "Online") {
            this.tempStartTime = data?.start_time;
            this.startTime = new Date(this.tempStartTime).toLocaleString(
              undefined,
              { timeZone: "Asia/Kolkata" }
            );
            console.log("set data from parent", data?.ecg_vals);
            if (data?.ecg_vals || data?.ppg_vals) {
              // this.showEcgChart = false;
              // this.showPpgChart = false;
              this.$nextTick(() => {
                this.showEcgChart = true;
                this.showPpgChart = true;
              });
              this.ecgChartData = data?.ecg_vals;
              this.ppgChartData = data?.ppg_vals;
              await this.setEcgData(this.ecgChartData);
              await this.setPpgData(this.ppgChartData);
            }
            // }
          });
        }
      } catch (error) {
        this.connecting = false;
        console.log("mqtt.connect error", error);
      }
    },
  },
};
</script>

<style scoped>
.sleep__block {
  display: flex;
  height: 40px;
  align-items: center;
  padding: 10px;
}
.grid-container w-100 {
  display: flex;
  flex-flow: row wrap;
  justify-content: start;
  max-width: 100%;
}
.export__btn:hover {
  background-color: orange;
  color: white !important;
}

h1 {
  font-size: 40px;
}

.div {
  border-radius: 10px;
}
small {
  font-size: 16px;
}
h3 {
  font-size: 22px;
}
.user-image {
  width: 80px;
  height: 80px;
}
.user-pic-header {
  display: flex;
  align-items: center;
}
@media only screen and (max-width: 780px) {
  small {
    font-size: 14px;
  }
  h3 {
    font-size: 20px;
  }
}
.patient-header {
  background-color: #f6f2f2;
  padding: 30px;
  border-radius: 26px;
  margin-bottom: 30px;
}
.patient-details-wrapper {
}
.btn-orange {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 50%;
  margin-left: 20px;
  background-color: #f58220;
}
.btn-orange .v-icon {
  color: #fff;
}
.mini-title {
  font-size: 36px;
}
.text-success {
  color: #29dca1;
}
.mini-light-box {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  text-align: left;
  box-shadow: 0px 8px 16px #00000014;
  border: 1px solid #e9e9e9;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 30px;
}
.mini-content {
  margin-left: 20px;
}
.mini-icon {
  height: 90px;
  width: auto;
}
@media (min-width: 1800px) {
  .column5 {
    flex-basis: auto;
    flex-grow: 1;
    max-width: 100%;
  }
}
.mini-content small {
  font-size: 20px;
  font-weight: 400;
}
.min-light-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.text-small {
  margin-left: 20px;
  font-weight: 500;
}
.min-light-header .right {
  text-align: right;
}
.text-medium {
  margin-left: 20px;
}
.text-medium small {
  font-size: 20px;
  font-weight: 500;
}
.text-medium .unit {
  color: #7f7f7f;
  font-size: 16px;
  font-weight: 400;
}
.text-medium h1 {
  line-height: 1.3;
  display: flex;
  flex-wrap: wrap;
}
.btn-sm {
  color: #7f7f7f;
  font-weight: 500;
  padding: 8px;
  cursor: pointer;
}
.btn-sm.active {
  color: #f58220;
}
.text-nowrap {
  white-space: nowrap;
}
.item {
  display: flex;
  padding-right: 30px;
  padding-top: 15px;
  align-items: center;
  padding-bottom: 5px;
  flex-grow: 1;
}
@media (max-width: 991px) {
  .user-image {
    width: 58px;
    height: 58px;
  }
}
@media (max-width: 767px) {
  .patient-header {
    padding: 15px;
  }
  .mini-icon {
    height: 50px;
  }
  .mini-light-box {
    padding: 16px;
  }
  .mini-title {
    font-size: 28px;
  }
  .mini-content {
    line-height: 1.3;
    margin-left: 10px;
  }
  .mini-content small {
    font-size: 12px;
  }
  .user-image {
    width: 45px;
    height: 45px;
  }
  .user-pic-header {
    width: 100%;
  }
  .user-pic-header h3 {
    margin-right: auto;
  }
}
@media (max-width: 575px) {
  .item {
    width: 50%;
  }
  .device-status-row {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
