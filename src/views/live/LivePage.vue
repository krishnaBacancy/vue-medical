<template>
  <div style="width: 100%">
    <PageHeader
      class="mb-8"
      title="Live"
      pageIcon="mdi-arrow-left"
      @goBack="$router.go(-1)"
    />
    <div class="btn-group" v-if="mobile">
      <h3>Filter</h3>
      <v-icon
        class="ml-4"
        color="#333"
        @click="gridNumber = 4"
        :class="{ active: gridNumber === 4 }"
        >mdi-tally-mark-3</v-icon
      >
      <v-icon
        class="ml-2"
        color="#333"
        @click="gridNumber = 6"
        :class="{ active: gridNumber === 6 }"
        >mdi-tally-mark-2</v-icon
      >
      <v-icon
        class="ml-2"
        color="#333"
        @click="gridNumber = 12"
        :class="{ active: gridNumber === 12 }"
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
          class="card-theme"
          style="width: 100%; border-radius: 20px"
          @click="$router.push(`/patient-details/${device?.id}`)"
        >
          <div class="d-flex align-center w-100">
            <div class="d-flex flex-column text-start w-100">
              <h3 class="text-capitalize">{{ device.fullName }}</h3>
              <h5 class="mt-2 grey--text second__heading font-weight-regular">
                Floor No.
              </h5>
              <h5 class="mt-2 grey--text second__heading font-weight-regular">
                Room No.
              </h5>
              <h5 class="mt-2 grey--text second__heading font-weight-regular">
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

          <v-row>
            <v-col cols="12" sm="6" md="6" lg="6" xl="4">
              <v-card class="d-flex align-center pa-2 mt-4">
                <v-flex>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-img
                        v-on="on"
                        v-bind="attrs"
                        src="@/assets/heartbeat.svg"
                        height="40"
                        width="40"
                        contain
                      ></v-img>
                    </template>
                    <span>Heart Rate</span>
                  </v-tooltip>
                </v-flex>
                <v-flex xs12>
                  <div class="d-flex flex-column text-start ml-2 lh-1">
                    <h5 class="green--text">
                      {{ device?.algodata ? device.algodata?.hr : "--" }}
                    </h5>
                    <small class="">BPM</small>
                  </div>
                </v-flex>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6" xl="4">
              <v-card class="d-flex align-center pa-2 mt-4">
                <v-flex>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-img
                        v-on="on"
                        v-bind="attrs"
                        src="@/assets/oxygen.svg"
                        height="40"
                        width="40"
                        contain
                      ></v-img>
                    </template>
                    <span>Oxygen</span>
                  </v-tooltip>
                </v-flex>
                <v-flex xs12>
                  <div class="d-flex flex-column text-start ml-2 lh-1">
                    <h5 class="yellow--text">
                      {{
                        device?.algodata?.spo2
                          ? Math.round(device.algodata?.spo2)
                          : device?.deviceAlgoData?.spo2
                      }}
                    </h5>
                    <small class="">%</small>
                  </div>
                </v-flex>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6" xl="4">
              <v-card class="d-flex align-center pa-2 mt-4">
                <v-flex>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-img
                        v-on="on"
                        v-bind="attrs"
                        src="@/assets/temprature.svg"
                        height="40"
                        width="40"
                        contain
                      ></v-img>
                    </template>
                    <span>Temperature</span>
                  </v-tooltip>
                </v-flex>
                <v-flex xs12>
                  <div class="d-flex flex-column text-start ml-2 lh-1">
                    <h5 class="text-danger">
                      {{
                        device?.algodata?.temp
                          ? Math.round(device.algodata?.temp)
                          : "--"
                      }}
                    </h5>
                    <small class="">°C</small>
                  </div>
                </v-flex>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-flex>
    </v-layout>
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
      liveDevices: [],
      socketConnection: null,
      connection: {
        clean: true,
        connectTimeout: 30 * 1000,
        reconnectTimeout: 4000,
        keepAlive: 120,
        clientId: "lens_3DtlcZfxvR0idKzXQ90Vzm69vAM",
        username: "MYsmO5Oc7O6DKkS8",
        password: "ufUPnVWbLoMwwFaL",
        useSSL: true,
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
        this.liveDevices = devices
          .filter((device) => device.isOnline === 1)
          .map((device) => {
            device.showEcgChart = false;
            device.allEcgValues = [];
            device.deviceAlgoData = device.algodata;
            return device;
          });
        // this.liveDevices = devices
        //   .filter((device) => {
        //     return (
        //       device.macAddressFramed === "C9F7BF309DC9" ||
        //       device.macAddressFramed === "F1DDE98E9F16" ||
        //       device.macAddressFramed === "F0B6FAE23614"
        //     );
        //   })
        //   .map((device) => {
        //     device.showEcgChart = false;
        //     device.allEcgValues = [];
        //     return device;
        //   });
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
            let data = await JSON.parse(message);
            if (data?.msg === 17) {
              this.liveDevices = this.liveDevices.map((device) => {
                if (device.macAddressFramed === data.mac_address_framed) {
                  device["algodata"] = data;
                  return device;
                }
                return device;
              });
            }
            console.log("data--", JSON.parse(message));
            if (data?.ecg_vals) {
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
          });
        }
      },
    },
  },
  mounted() {
    if (this.getDoctorId) {
      this.getPatientsForDoctor(this.getDoctorId);
    }
  },
  destroyed() {
    if (this.socketConnection) {
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
  },
};
</script>

<style scoped>
h5 {
  font-size: 22px;
}
h3 {
  font-size: 20px;
}
.second__heading {
  font-size: 18px;
}
.card-theme {
  margin-top: 10px;
  padding: 20px;
}
.btn-group {
  display: flex;
  align-items: center;
  padding: 8px 5px;
  border-radius: 12px;
  margin-left: 5px;
}
.btn-group .v-icon--link {
  border-radius: 5px;
  width: 30px;
  height: 30px;
}
.btn-group .v-icon--link.active {
  background: linear-gradient(45deg, #f58220, #e53985);
  color: #fff !important;
}
@media only screen and (max-width: 530px) {
  h3 {
    font-size: 18px;
  }
  .second__heading {
    font-size: 16px;
  }
}
.lh-1 {
  line-height: 1.2;
}
</style>
