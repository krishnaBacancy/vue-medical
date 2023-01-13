<template>
  <div style="width: 100%">
    <PageHeader
      title="Live"
      pageIcon="mdi-arrow-left"
      @goBack="$router.go(-1)"
    />
    <br />
    <v-container
      fluid
      grid-list-md
      style="background-color: rgba(0, 0, 0, 0.5); border-radius: 20px"
      class="mb-4"
    >
      <div class="white--text d-flex ml-5" v-if="mobile">
        <h3>Filter</h3>
        <v-icon class="ml-4" color="white" @click="gridNumber = 4"
          >mdi-tally-mark-3</v-icon
        >
        <v-icon class="ml-2" color="white" @click="gridNumber = 6"
          >mdi-tally-mark-2</v-icon
        >
        <v-icon class="ml-2" color="white" @click="gridNumber = 12"
          >mdi-tally-mark-1</v-icon
        >
      </div>

      <v-layout row wrap class="mt-4">
        <v-flex
          d-flex
          xs12
          sm12
          md6
          v-for="device in liveDevices"
          :key="device.id"
          :class="showGrid"
        >
          <v-card
            color="#282934"
            class="ml-2 mr-2 mt-2 mb-2 pa-2 white--text"
            style="width: 100%; border-radius: 20px"
            @click.stop="openDialog(device.id)"
          >
            <div class="d-flex align-center">
              <div class="d-flex flex-column text-start">
                <h3 class="ml-5">{{ device.fullName }}</h3>
                <h5 class="ml-5 mt-2 grey--text second__heading">Floor No.</h5>
                <h5 class="ml-5 mt-2 grey--text second__heading">Room No.</h5>
                <h5 class="ml-5 mt-2 grey--text second__heading">
                  {{ device.macAddressFramed }}
                </h5>
              </div>
              <v-spacer></v-spacer>
              <div style="width: 70%" class="mr-3">
                <div :id="device.macAddressFramed" style="overflow: hidden">
                  <ecg-chart
                    v-if="device.showEcgChart"
                    :ecgDataFromProps="device.ecgValues"
                    :macAddress="device.macAddressFramed"
                    :key="device.showEcgChart"
                    :width="600"
                    :height="165"
                  />
                </div>
              </div>
            </div>

            <div class="d-flex mt-3">
              <v-card color="black" width="50%" height="70">
                <div class="d-flex align-center">
                  <v-flex>
                    <v-img
                      class="mt-2 ml-2"
                      src="@/assets/heartbeat.svg"
                      height="40"
                      width="40"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs12>
                    <div class="d-flex flex-column text-start mt-2 ml-2">
                      <h5 class="green--text">74</h5>
                      <small class="white--text">>120-30 C1</small>
                    </div>
                  </v-flex>
                </div>
              </v-card>

              <v-card color="black" width="50%" height="70" class="ml-2">
                <div class="d-flex align-center">
                  <v-flex>
                    <v-img
                      class="mt-2 ml-2"
                      src="@/assets/oxygen.svg"
                      height="40"
                      width="40"
                      contain
                    ></v-img>
                  </v-flex>
                  <v-flex xs12>
                    <div class="d-flex flex-column text-start ml-2 mt-2">
                      <h5 class="yellow--text">98</h5>
                      <small class="white--text">Good</small>
                    </div>
                  </v-flex>
                </div>
              </v-card>
            </div>
          </v-card>
          <v-dialog
            v-model="dialog[device.id]"
            max-width="800px"
            dark
            overlay-color="white"
            :retain-focus="false"
          >
            <v-card>
              <v-card-title>
                <span class="text-h5 ml-3 font-weight-bold"
                  >Patient Name - {{ device.fullName }}</span
                >
              </v-card-title>

              <v-container>
                <v-row>
                  <v-col cols="12" sm="4" md="4">
                    <v-card color="black" width="100%" height="65">
                      <div class="d-flex align-center mt-1">
                        <v-flex>
                          <v-img
                            class="mt-2 ml-3"
                            src="@/assets/heartbeat.svg"
                            height="40"
                            width="40"
                            contain
                          ></v-img>
                        </v-flex>
                        <v-flex xs12>
                          <div class="d-flex flex-column text-start mt-2 ml-4">
                            <h5 class="green--text">74</h5>
                            <small class="white--text">>120-30 C1</small>
                          </div>
                        </v-flex>
                      </div>
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="4" md="4">
                    <v-card color="black" width="100%" height="65">
                      <div class="d-flex align-center mt-1">
                        <v-flex>
                          <v-img
                            class="mt-2 ml-3"
                            src="@/assets/oxygen.svg"
                            height="40"
                            width="40"
                            contain
                          ></v-img>
                        </v-flex>
                        <v-flex xs12>
                          <div class="d-flex flex-column text-start ml-4 mt-2">
                            <h5 class="yellow--text">98</h5>
                            <small class="white--text">Good</small>
                          </div>
                        </v-flex>
                      </div>
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="4" md="4">
                    <v-card color="black" width="100%" height="65">
                      <div class="d-flex align-center mt-1">
                        <v-flex>
                          <v-img
                            class="mt-2 ml-3"
                            src="@/assets/bloodPressure.svg"
                            height="40"
                            width="40"
                            contain
                          ></v-img>
                        </v-flex>
                        <v-flex xs12>
                          <div class="d-flex flex-column text-start ml-4 mt-2">
                            <h5 class="cyan--text">120/85</h5>
                            <small class="white--text">6 hrs ago</small>
                          </div>
                        </v-flex>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row class="mt-0 mt-sm-0 mt-md-3">
                  <v-col cols="12" sm="6" md="3" class="mt-2 mt-sm-3 mt-md-0">
                    <v-card color="black" width="100%" height="65">
                      <div class="d-flex align-center mt-1">
                        <v-flex>
                          <v-img
                            class="mt-2 ml-3"
                            src="@/assets/temprature.svg"
                            height="40"
                            width="40"
                            contain
                          ></v-img>
                        </v-flex>
                        <v-flex xs12>
                          <div class="d-flex flex-column text-start ml-4 mt-2">
                            <h5 class="red--text">98.7<sup>F</sup></h5>
                            <small class="white--text">>120-30 C1</small>
                          </div>
                        </v-flex>
                      </div>
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="6" md="3" class="mt-sm-3 mt-md-0">
                    <v-card color="black" width="100%" height="65">
                      <div class="d-flex align-center mt-1">
                        <v-flex>
                          <v-img
                            class="ml-3 mt-2"
                            src="@/assets/steps.svg"
                            height="40"
                            width="40"
                            contain
                          ></v-img>
                        </v-flex>
                        <v-flex xs12>
                          <div class="d-flex flex-column text-start ml-4 mt-2">
                            <h5 class="pink--text">10000</h5>
                            <small class="white--text">steps</small>
                          </div>
                        </v-flex>
                      </div>
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="6" md="3" class="mt-sm-n1 mt-0 mt-md-0">
                    <v-card color="black" width="100%" height="65">
                      <div class="d-flex align-center mt-1">
                        <v-flex>
                          <v-img
                            class="mt-2 ml-3"
                            src="@/assets/heartbeat.svg"
                            height="40"
                            width="40"
                            contain
                          ></v-img>
                        </v-flex>
                        <v-flex xs12>
                          <div class="d-flex flex-column text-start ml-4 mt-2">
                            <h5 class="green--text">83</h5>
                            <small class="white--text">C1</small>
                          </div>
                        </v-flex>
                      </div>
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="6" md="3" class="mt-sm-n1 mt-0 mt-md-0">
                    <v-card color="black" width="100%" height="65">
                      <div class="d-flex align-center mt-1">
                        <v-flex>
                          <v-img
                            class="mt-2 ml-3"
                            src="@/assets/Group 507.svg"
                            height="40"
                            width="40"
                            contain
                          ></v-img>
                        </v-flex>
                        <v-flex xs12>
                          <div class="d-flex flex-column text-start ml-4 mt-2">
                            <h5 class="green--text">92</h5>
                            <small class="white--text">PRV</small>
                          </div>
                        </v-flex>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row class="mt-0 mt-sm-0 mt-md-3">
                  <v-col cols="12" sm="6" md="3" class="mt-2 mt-sm-3 mt-md-0">
                    <v-card color="black" width="100%" height="65">
                      <div class="d-flex align-center mt-1">
                        <v-flex>
                          <v-img
                            class="mt-2 ml-3"
                            src="@/assets/Group 508.svg"
                            height="40"
                            width="40"
                            contain
                          ></v-img>
                        </v-flex>
                        <v-flex xs12>
                          <div class="d-flex flex-column text-start ml-4 mt-2">
                            <h5 class="red--text">0.67</h5>
                            <small class="white--text">RR</small>
                          </div>
                        </v-flex>
                      </div>
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="6" md="3" class="mt-sm-3 mt-md-0">
                    <v-card color="black" width="100%" height="65">
                      <div class="d-flex align-center mt-1">
                        <v-flex>
                          <v-img
                            class="ml-3 mt-2"
                            src="@/assets/Group 507.svg"
                            height="40"
                            width="40"
                            contain
                          ></v-img>
                        </v-flex>
                        <v-flex xs12>
                          <div class="d-flex flex-column text-start ml-4 mt-2">
                            <h5 class="pink--text">39.17</h5>
                            <small class="white--text">PP</small>
                          </div>
                        </v-flex>
                      </div>
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="6" md="3" class="mt-sm-n1 mt-0 mt-md-0">
                    <v-card color="black" width="100%" height="65">
                      <div class="d-flex align-center mt-1">
                        <v-flex>
                          <v-img
                            class="mt-2 ml-3"
                            src="@/assets/Group 506.svg"
                            height="40"
                            width="40"
                            contain
                          ></v-img>
                        </v-flex>
                        <v-flex xs12>
                          <div class="d-flex flex-column text-start ml-4 mt-2">
                            <h5 class="green--text">Normal</h5>
                            <small class="white--text">Arr</small>
                          </div>
                        </v-flex>
                      </div>
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="6" md="3" class="mt-sm-n1 mt-0 mt-md-0">
                    <v-card color="black" width="100%" height="65">
                      <div class="d-flex align-center mt-1">
                        <v-flex>
                          <v-img
                            class="mt-2 ml-3"
                            src="@/assets/Group 505.svg"
                            height="40"
                            width="40"
                            contain
                          ></v-img>
                        </v-flex>
                        <v-flex xs12>
                          <div class="d-flex flex-column text-start ml-4 mt-2">
                            <h5 class="green--text">67.1</h5>
                            <small class="white--text">SV</small>
                          </div>
                        </v-flex>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>

                <v-row class="mt-0 mt-sm-0 mt-md-3">
                  <v-col cols="12" sm="6" md="4" class="mt-2 mt-sm-3 mt-md-0">
                    <v-card color="black" width="100%" height="65">
                      <div class="d-flex align-center mt-1">
                        <v-flex>
                          <v-img
                            class="mt-2 ml-3"
                            src="@/assets/Group 504.svg"
                            height="40"
                            width="40"
                            contain
                          ></v-img>
                        </v-flex>
                        <v-flex xs12>
                          <div class="d-flex flex-column text-start ml-4 mt-2">
                            <h5 class="red--text">5.97</h5>
                            <small class="white--text">CO</small>
                          </div>
                        </v-flex>
                      </div>
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="6" md="4" class="mt-sm-3 mt-md-0">
                    <v-card color="black" width="100%" height="65">
                      <div class="d-flex align-center mt-1">
                        <v-flex>
                          <v-img
                            class="ml-3 mt-2"
                            src="@/assets/Group 503.svg"
                            height="40"
                            width="40"
                            contain
                          ></v-img>
                        </v-flex>
                        <v-flex xs12>
                          <div class="d-flex flex-column text-start ml-4 mt-2">
                            <h5 class="pink--text">0.29</h5>
                            <small class="white--text">PTT</small>
                          </div>
                        </v-flex>
                      </div>
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="6" md="4" class="mt-sm-3 mt-md-0">
                    <v-card color="black" width="100%" height="65">
                      <div class="d-flex align-center mt-1">
                        <v-flex>
                          <v-img
                            class="ml-3 mt-2"
                            src="@/assets/Group 509.svg"
                            height="40"
                            width="40"
                            contain
                          ></v-img>
                        </v-flex>
                        <v-flex xs12>
                          <div class="d-flex flex-column text-start ml-4 mt-2">
                            <h5 class="success--text">95.51</h5>
                            <small class="white--text">MAP</small>
                          </div>
                        </v-flex>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue" text @click="closeDialog(device.id)">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PageHeader from "@/layouts/PageHeader.vue";
import { mapActions, mapGetters } from "vuex";
import mqtt from "mqtt/dist/mqtt";
import EcgChart from "@/components/EcgChart.vue";

export default {
  name: "LivePage",
  components: {
    PageHeader,
    EcgChart,
  },
  data() {
    return {
      getDoctorId: localStorage.getItem("user_id"),
      gridNumber: 6,
      dialog: {},
      liveDevices: [],
      socketConnections: {},
      socketConnection: null,
      allDeviceEcgData: [],
      connection: {
        clean: true,
        connectTimeout: 30 * 1000,
        reconnectTimeout: 4000,
        keepAlive: 120,
        clientId: "lens_3DtlcZfxvR0idKzXQ90Vzm69vAM",
        username: "MYsmO5Oc7O6DKkS8",
        password: "ufUPnVWbLoMwwFaL",
        useSSL: true,
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
      subscribeSuccess: false,
      connecting: false,
      retryTimes: 0,
    };
  },
  computed: {
    ...mapGetters("doctors", ["getPatients"]),
    showGrid() {
      return `lg${this.gridNumber}`;
    },
    mobile() {
      return this.$vuetify.breakpoint.lgAndUp;
    },
  },
  watch: {
    getPatients: {
      async handler(devices) {
        console.log("watch called");
        // this.liveDevices = val.filter((device) => device.online === 0);
        this.liveDevices = devices
          .filter((device) => {
            return (
              device.macAddressFramed === "E51BBA6BE987" ||
              device.macAddressFramed === "F1DDE98E9F16"
            );
          })
          .map((device) => {
            device.showEcgChart = false;
            device.allEcgValues = [];
            return device;
          });
        const { ...options } = this.connection;
        const connectUrl = `wss://accu.live/ws/`;
        let connection = await mqtt.connect(connectUrl, options);
        this.socketConnection = connection;
        for (let i = 0; i < this.liveDevices.length; i++) {
          const element = this.liveDevices[i];
          if (this.socketConnection.on) {
            this.socketConnection.on("connect", () => {
              this.connecting = false;
              console.log("Connection succeeded!");
              this.subscribeSuccess = true;
              this.socketConnection.subscribe(
                `BMSFSEV/${element.macAddressFramed.toUpperCase()}/sTOf`
              );
            });
          }
        }

        if (this.socketConnection.on) {
          // this.socketConnection.on("reconnect", this.handleOnReConnect);
          this.socketConnection.on("error", (error) => {
            console.log("Connection failed", error);
          });
          this.socketConnection.on("message", async (_, message) => {
            // this.showEcgChart = true;
            // this.showPpgChart = true;
            // this.ecgChartData = [];
            // this.ppgChartData = [];
            let data = await JSON.parse(message);
            // if (data?.msg === 17) {
            //   this.displayAlgoData();
            // }
            console.log("data--", JSON.parse(message));
            if (data?.ecg_vals || data?.ppg_vals) {
              this.liveDevices = this.liveDevices.map((device) => {
                if (device.macAddressFramed === data.mac_address_framed) {
                  device.showEcgChart = true;
                  device["ecgValues"] = data?.ecg_vals;
                  device["allEcgValues"].push(data?.ecg_vals);
                  return device;
                }
                return device;
              });
            }
            // }
          });
        }

        /** working code when connectio  single device */
        // this.socketConnections[this.liveDevices[3].macAddressFramed] =
        //   connection;
        // if (this.socketConnections[this.liveDevices[3].macAddressFramed].on) {
        //   this.socketConnections[this.liveDevices[3].macAddressFramed].on(
        //     "connect",
        //     () => {
        //       this.connecting = false;
        //       console.log("Connection succeeded!");
        //       this.subscribeSuccess = true;
        //       this.socketConnections[
        //         this.liveDevices[3].macAddressFramed
        //       ].subscribe(
        //         `BMSFSEV/${this.liveDevices[3].macAddressFramed.toUpperCase()}/sTOf`
        //       );
        //     }
        //   );
        //   this.socketConnections[this.liveDevices[3].macAddressFramed].on(
        //     "reconnect",
        //     this.handleOnReConnect
        //   );
        //   this.socketConnections[this.liveDevices[3].macAddressFramed].on(
        //     "error",
        //     (error) => {
        //       console.log("Connection failed", error);
        //     }
        //   );
        //   this.socketConnections[this.liveDevices[3].macAddressFramed].on(
        //     "message",
        //     async (_, message) => {
        //       // this.showEcgChart = true;
        //       // this.showPpgChart = true;
        //       // this.ecgChartData = [];
        //       // this.ppgChartData = [];
        //       let data = await JSON.parse(message);
        //       // if (data?.msg === 17) {
        //       //   this.displayAlgoData();
        //       // }
        //       console.log("data--", data);
        //       if (data?.ecg_vals || data?.ppg_vals) {
        //         console.log(
        //           "this.liveDevices[data.mac_address_framed]",
        //           this.liveDevices[3]
        //         );
        //         // this.liveDevices[3]["ecgValues"] = data?.ecg_vals;
        //         // this.$nextTick(() => {
        //         //   this.liveDevices[3]["showEcgChart"] = true;
        //         // });
        //         this.liveDevices = this.liveDevices.map((device) => {
        //           if (device.macAddressFramed === data.mac_address_framed) {
        //             device.showEcgChart = true;
        //             device["ecgValues"] = data?.ecg_vals;
        //             return device;
        //           }
        //           return device;
        //         });
        //       }
        //       // this.liveMessage = data?.message;
        //       // if (this.liveMessage == "Online") {
        //       // this.tempStartTime = data?.start_time;
        //       // this.startTime = new Date(this.tempStartTime).toLocaleString(
        //       //   undefined,
        //       //   { timeZone: "Asia/Kolkata" }
        //       // );
        //       // console.log("set data from parent", data?.ecg_vals);
        //       // if (data?.ecg_vals || data?.ppg_vals) {
        //       //   // this.showEcgChart = false;
        //       //   // this.showPpgChart = false;
        //       //   this.$nextTick(() => {
        //       //     this.showEcgChart = true;
        //       //     this.showPpgChart = true;
        //       //   });
        //       //   this.ecgChartData = data?.ecg_vals;
        //       //   this.ppgChartData = data?.ppg_vals;
        //       //   await this.setEcgData(this.ecgChartData);
        //       //   await this.setPpgData(this.ppgChartData);
        //       // }
        //       // }
        //     }
        //   );
        // }
      },
    },
  },
  mounted() {
    if (this.getDoctorId) {
      this.getPatientsForDoctor(this.getDoctorId);
    }
  },
  destroyed() {
    if (this.socketConnection.connected) {
      try {
        this.socketConnection.end(false, () => {
          this.initData();
          console.log("Successfully disconnected!");
        });
      } catch (error) {
        console.log("Disconnect failed", error.toString());
      }
    }
  },
  methods: {
    ...mapActions("doctors", ["getPatientsForDoctor"]),
    // handleOnReConnect() {
    //   this.retryTimes += 1;
    //   if (this.retryTimes > 5) {
    //     try {
    //       this.socketConnection.end();
    //       this.initData();
    //       console.log("Connection maxReconnectTimes limit, stop retry");
    //     } catch (error) {
    //       console.log("error---", error.toString());
    //     }
    //   }
    // },
    initData() {
      this.socketConnection = {
        connected: false,
      };
      this.retryTimes = 0;
      this.connecting = false;
      this.subscribeSuccess = false;
    },
    goToPreviousPage() {
      this.$router.go(-1);
    },
    closeDialog(id) {
      this.$set(this.dialog, id, false);
    },
    openDialog(id) {
      this.$set(this.dialog, id, true);
    },
  },
};
</script>

<style scoped>
h5 {
  font-size: 20px;
}
h3 {
  font-size: 20px;
}
.second__heading {
  font-size: 18px;
}
@media only screen and (max-width: 530px) {
  h3 {
    font-size: 18px;
  }
  .second__heading {
    font-size: 16px;
  }
}
</style>
