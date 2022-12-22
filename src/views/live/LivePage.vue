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
        <v-flex d-flex xs12 sm12 md6 v-for="i in 4" :key="i" :class="showGrid">
          <v-card
            color="#282934"
            class="ml-2 mr-2 mt-2 mb-2 pa-2 white--text"
            style="width: 100%; border-radius: 20px"
            @click.stop="openDialog(i)"
          >
            <div class="d-flex align-center">
              <div class="d-flex flex-column text-start">
                <h3 class="ml-5">John Doe</h3>
                <h5 class="ml-5 mt-2 grey--text second__heading">Floor No.</h5>
                <h5 class="ml-5 mt-2 grey--text second__heading">Room No.</h5>
                <h5 class="ml-5 mt-2 grey--text second__heading">
                  Mac Address
                </h5>
              </div>
              <v-spacer></v-spacer>
              <div style="width: 70%" class="mr-3">
                <LineChart :width="200" />
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
            v-model="dialog[i]"
            max-width="800px"
            dark
            overlay-color="white"
            :retain-focus="false"
          >
            <v-card>
              <v-card-title>
                <span class="text-h5 ml-3 font-weight-bold"
                  >Patient Name - {{ i }}</span
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
                <v-btn color="blue" text @click="closeDialog(i)">
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
import LineChart from "@/components/LineChart.vue";
import PageHeader from "@/layouts/PageHeader.vue";

export default {
  name: "LivePage",
  components: {
    PageHeader,
    LineChart,
  },
  data() {
    return {
      gridNumber: 6,
      dialog: {},
    };
  },
  computed: {
    showGrid() {
      return `lg${this.gridNumber}`;
    },
    mobile() {
      return this.$vuetify.breakpoint.lgAndUp;
    },
  },
  methods: {
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
