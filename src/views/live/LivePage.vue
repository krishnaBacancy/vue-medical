<template>
  <div style="width: 100%">
    <PageHeader
      title="Live"
      pageIcon="mdi-account-supervisor-circle"
      btnName="Back"
      color-name="success"
      btnIconName="mdi-arrow-left"
      @addNewPatient="goToPreviousPage"
    />
    <br />
    <v-container
      fluid
      grid-list-md
      style="background-color: rgba(0, 0, 0, 0.5)"
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

      <v-layout row wrap>
        <v-flex d-flex xs12 sm12 md6 v-for="i in 4" :key="i" :class="showGrid">
          <v-card
            color="#282934"
            class="ml-2 mt-2 mb-2 pa-2 white--text"
            style="width: 100%"
            @click.stop="openDialog(i)"
          >
            <div class="d-flex align-center">
              <div class="d-flex flex-column text-start">
                <h3 class="ml-10">John Doe</h3>
                <h3 class="ml-10 mt-2">Floor No.</h3>
                <h3 class="ml-10 mt-2">Room No.</h3>
                <h3 class="ml-10 mt-2">Mac Address</h3>
              </div>
              <v-spacer></v-spacer>
              <div style="width: 70%" class="mr-3">
                <LineChart :width="200" />
              </div>
            </div>

            <div class="d-flex mt-3">
              <v-card color="black" width="50%">
                <div class="d-flex align-center ml-2">
                  <v-img
                    class="mr-3"
                    src="https://accu.live/images/doctor_dashboard/heartbeat.svg"
                    height="22"
                    contain
                  ></v-img>
                  <div
                    class="d-flex mr-10 mt-1 mb-2"
                    style="flex-direction: column"
                  >
                    <h5 class="green--text">74</h5>
                    <small class="white--text">>120-30 C1</small>
                  </div>
                </div>
              </v-card>

              <v-card color="black" width="50%" class="ml-2">
                <div class="d-flex align-center ml-2">
                  <v-img
                    class="mr-3 mt-1"
                    src="https://accu.live/images/doctor_dashboard/doc-oxi.svg"
                    height="25"
                    contain
                  ></v-img>
                  <div class="d-flex mr-10 mt-1" style="flex-direction: column">
                    <h5 class="yellow--text">98</h5>
                    <small class="white--text">Good</small>
                  </div>
                </div>
              </v-card>
            </div>

            <div class="d-flex mt-3">
              <v-card color="black" width="50%">
                <div class="d-flex align-center ml-n5">
                  <v-img
                    class="mr-3"
                    src="https://accu.live/images/doctor_dashboard/doc-lunghs.svg"
                    height="25"
                    contain
                  ></v-img>
                  <div class="d-flex mr-16" style="flex-direction: column">
                    <h5 class="purple--text">16</h5>
                    <small class="white--text">C1</small>
                  </div>
                </div>
              </v-card>

              <v-card color="black" width="50%" class="ml-2">
                <div class="d-flex align-center ml-8">
                  <v-img
                    class="mr-3"
                    src="https://accu.live/images/doctor_dashboard/oxi-meter.svg"
                    height="25"
                    contain
                  ></v-img>
                  <div class="d-flex mr-10 mt-1" style="flex-direction: column">
                    <h5 class="cyan--text">120/85</h5>
                    <small class="white--text">6 hrs ago</small>
                  </div>
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
                <span class="text-h5 ml-3">Patient Name - {{ i }}</span>
              </v-card-title>

              <v-container>
                <div class="d-flex mt-3">
                  <v-card color="black" width="50%">
                    <div class="d-flex align-center ml-2">
                      <v-img
                        class="mr-3"
                        src="https://accu.live/images/doctor_dashboard/heartbeat.svg"
                        height="22"
                        contain
                      ></v-img>
                      <div
                        class="d-flex mr-10 mt-1 mb-2"
                        style="flex-direction: column"
                      >
                        <h5 class="green--text">74</h5>
                        <small class="white--text">>120-30 C1</small>
                      </div>
                    </div>
                  </v-card>

                  <v-card color="black" width="50%" class="ml-2">
                    <div class="d-flex align-center ml-2">
                      <v-img
                        class="mr-3 mt-1"
                        src="https://accu.live/images/doctor_dashboard/doc-oxi.svg"
                        height="25"
                        contain
                      ></v-img>
                      <div
                        class="d-flex mr-10 mt-1"
                        style="flex-direction: column"
                      >
                        <h5 class="yellow--text">98</h5>
                        <small class="white--text">Good</small>
                      </div>
                    </div>
                  </v-card>
                </div>

                <div class="d-flex mt-3">
                  <v-card color="black" width="50%">
                    <div class="d-flex align-center ml-n5">
                      <v-img
                        class="mr-3"
                        src="https://accu.live/images/doctor_dashboard/doc-lunghs.svg"
                        height="25"
                        contain
                      ></v-img>
                      <div class="d-flex mr-16" style="flex-direction: column">
                        <h5 class="purple--text">16</h5>
                        <small class="white--text">C1</small>
                      </div>
                    </div>
                  </v-card>

                  <v-card color="black" width="50%" class="ml-2">
                    <div class="d-flex align-center ml-8">
                      <v-img
                        class="mr-3"
                        src="https://accu.live/images/doctor_dashboard/oxi-meter.svg"
                        height="25"
                        contain
                      ></v-img>
                      <div
                        class="d-flex mr-10 mt-1"
                        style="flex-direction: column"
                      >
                        <h5 class="cyan--text">120/85</h5>
                        <small class="white--text">6 hrs ago</small>
                      </div>
                    </div>
                  </v-card>
                </div>
                <div class="d-flex mt-3">
                  <v-card color="black" width="25%">
                    <div class="d-flex align-center ml-2">
                      <v-img
                        class="mr-4"
                        src="https://accu.live/images/doctor_dashboard/temprature.svg"
                        height="25"
                        contain
                      ></v-img>
                      <div
                        class="d-flex mr-10 mt-1 mb-2"
                        style="flex-direction: column"
                      >
                        <h5 class="red--text">98.7<sup>F</sup></h5>
                        <small class="white--text">>120-30 C1</small>
                      </div>
                    </div>
                  </v-card>

                  <v-card color="black" width="25%" class="ml-2">
                    <div class="d-flex align-center ml-2 mt-1">
                      <v-img
                        class="mr-2"
                        src="https://accu.live/images/doctor_dashboard/doc-step.svg"
                        height="25"
                        contain
                      ></v-img>
                      <div
                        class="d-flex mr-10 mt-1"
                        style="flex-direction: column"
                      >
                        <h5 class="pink--text">10000</h5>
                        <small class="white--text">steps</small>
                      </div>
                    </div>
                  </v-card>

                  <v-card color="black" width="25%" class="ml-2">
                    <div class="d-flex align-center">
                      <v-img
                        class="mt-1"
                        src="https://accu.live/images/doctor_dashboard/heartbeat.svg"
                        height="18"
                        contain
                      ></v-img>
                      <div
                        class="d-flex mr-5 mt-1"
                        style="flex-direction: column"
                      >
                        <h5 class="green--text">74</h5>
                        <small class="white--text">>120-30 C1</small>
                      </div>
                    </div>
                  </v-card>

                  <v-card color="black" width="25%" class="ml-2">
                    <div class="d-flex align-center">
                      <v-img
                        class="mt-1"
                        src="https://accu.live/images/doctor_dashboard/heartbeat.svg"
                        height="18"
                        contain
                      ></v-img>
                      <div
                        class="d-flex mr-5 mt-1"
                        style="flex-direction: column"
                      >
                        <h5 class="green--text">74</h5>
                        <small class="white--text">>120-30 C1</small>
                      </div>
                    </div>
                  </v-card>
                </div>
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

<style scoped></style>
