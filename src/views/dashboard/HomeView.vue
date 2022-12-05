<template>
  <div style="background-color: #282934">
    <PageHeader title="Dashboard" pageIcon="mdi-home" />
    <br />
    <v-container
      fluid
      grid-list-md
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <v-progress-circular
        indeterminate
        color="amber"
        v-if="loadingStatus"
      ></v-progress-circular>

      <div v-else>
        <div class="d-flex align-center">
          <SearchBar />
          <div class="white--text d-flex mr-5" v-if="mobile">
            <h3>Filter</h3>
            <v-icon class="ml-4" color="white" @click="gridNumber = 3"
              >mdi-view-grid</v-icon
            >
            <v-icon class="ml-2" color="white" @click="gridNumber = 4"
              >mdi-tally-mark-3</v-icon
            >
            <v-icon class="ml-2" color="white" @click="gridNumber = 6"
              >mdi-tally-mark-2</v-icon
            >
          </div>
        </div>
        <v-layout row wrap>
          <v-flex
            d-flex
            xs12
            sm6
            md4
            :class="showGrid"
            v-for="patient in filteredPatients"
            :key="patient.id"
          >
            <v-card
              color="#282934"
              class="ml-2 mb-2 pa-2 white--text"
              style="width: 100%"
              @click="$router.push(`/patient-details/${patient?.id}`)"
            >
              <div class="d-flex">
                <div class="d-flex justify-center align-center">
                  <v-icon class="ml-2 white--text">mdi-account</v-icon>
                  <h3 class="ml-2">
                    {{ patient?.firstName + " " + patient?.lastName }}
                  </h3>
                </div>
                <v-spacer></v-spacer>
                <v-icon
                  color="warning"
                  size="50"
                  v-if="realTimeMessage === 'Offline'"
                  >mdi-circle-small</v-icon
                >
                <v-img
                  src="@/assets/live.png"
                  height="50"
                  width="50"
                  contain
                  v-if="realTimeMessage === 'Online'"
                ></v-img>
              </div>

              <div class="d-flex mt-1" style="font-size: 12px">
                <div class="d-flex ml-2 justify-center align-center">
                  <v-icon class="white--text">mdi-floor-plan</v-icon>
                  <span style="color: orange" class="ml-1">Floor - 1 </span>
                </div>
                <v-spacer></v-spacer>
                <div class="d-flex mr-8 justify-center align-center">
                  <v-icon class="white--text">mdi-bed</v-icon>
                  <span style="color: orange" class="ml-1">Room - 1 </span>
                </div>
              </div>

              <div class="d-flex mt-1" style="font-size: 12px">
                <div class="d-flex ml-2 justify-center align-center">
                  <v-icon class="white--text">mdi-slot-machine</v-icon>
                  <span class="ml-1">{{
                    patient?.macAddressFramed.toUpperCase()
                  }}</span>
                </div>
                <v-spacer></v-spacer>
                <div class="d-flex mr-3 justify-center align-center">
                  <v-icon class="white--text">mdi-battery</v-icon>
                  <span class="ml-1">114Hrs 45 Min</span>
                </div>
              </div>

              <div class="mt-5 d-flex">
                <v-card
                  class="elevation-1"
                  height="60"
                  color="black"
                  style="width: 50%"
                >
                  <div class="d-flex align-center ml-2">
                    <v-img
                      class="mr-3 mt-2"
                      src="@/assets/heartbeat.svg"
                      height="40"
                      width="40"
                      contain
                    ></v-img>
                    <div
                      class="d-flex mr-10 mt-1"
                      style="flex-direction: column"
                    >
                      <h5 class="green--text">74</h5>
                      <small class="white--text">>120-30 C1</small>
                    </div>
                  </div>
                </v-card>

                <v-card
                  class="elevation-1 ml-3"
                  color="black"
                  style="width: 50%"
                  height="60"
                >
                  <div class="d-flex align-center ml-2 mt-1">
                    <v-img
                      class="ml-n5 mt-2"
                      src="@/assets/oxygen.svg"
                      height="40"
                      width="40"
                      contain
                    ></v-img>
                    <div
                      class="d-flex ml-2 mr-9 mt-2"
                      style="flex-direction: column"
                    >
                      <h5 class="yellow--text">98</h5>
                      <small class="white--text">Good</small>
                    </div>
                  </div>
                </v-card>
              </div>

              <div class="mt-5 d-flex">
                <v-card
                  class="elevation-1"
                  height="60"
                  color="black"
                  style="width: 48%"
                >
                  <div class="d-flex align-center ml-3 mt-3">
                    <v-img
                      class="ml-n5"
                      src="@/assets/lungs.svg"
                      height="40"
                      width="40"
                      contain
                    ></v-img>
                    <div
                      class="d-flex ml-2 mr-13"
                      style="flex-direction: column"
                    >
                      <h5 class="purple--text">16</h5>
                      <small class="white--text">C1</small>
                    </div>
                  </div>
                </v-card>

                <v-card
                  class="elevation-1 ml-3"
                  color="black"
                  style="width: 50%"
                  height="60"
                >
                  <div class="d-flex align-center mt-3 ml-n1">
                    <v-img
                      class="ml-n2"
                      src="@/assets/bloodPressure.svg"
                      height="40"
                      width="40"
                      contain
                    ></v-img>
                    <div class="d-flex mr-7" style="flex-direction: column">
                      <h5 class="cyan--text">120/85</h5>
                      <small class="white--text">6 hrs ago</small>
                    </div>
                  </div>
                </v-card>
              </div>

              <div class="mt-5 d-flex">
                <v-card
                  class="elevation-1"
                  height="60"
                  color="black"
                  style="width: 50%"
                >
                  <div class="d-flex align-center ml-3 mt-1">
                    <v-img
                      class="mr-5 ml-n1"
                      src="@/assets/temprature.svg"
                      height="40"
                      width="40"
                      contain
                    ></v-img>
                    <div class="d-flex mr-10" style="flex-direction: column">
                      <h5 class="red--text">98.7<sup>F</sup></h5>
                      <small class="white--text">>120-30 C1</small>
                    </div>
                  </div>
                </v-card>

                <v-card
                  class="elevation-1 ml-3"
                  color="black"
                  style="width: 50%"
                  height="60"
                >
                  <div class="d-flex align-center ml-3 mt-2">
                    <v-img
                      class="mt-1"
                      src="@/assets/steps.svg"
                      height="40"
                      width="40"
                      contain
                    ></v-img>
                    <div
                      class="d-flex ml-5 mr-11 mt-1"
                      style="flex-direction: column"
                    >
                      <h5 class="pink--text">10000</h5>
                      <small class="white--text">Steps</small>
                    </div>
                  </div>
                </v-card>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </div>

      <div
        v-if="!$store.state.doctors.deviceData"
        class="white--text display-1"
      >
        No Patients to display...
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SearchBar from "@/components/SearchBar.vue";
import PageHeader from "@/layouts/PageHeader.vue";
export default {
  name: "HomeView",
  data() {
    return {
      getDoctorId: localStorage.getItem("user_id"),
      gridNumber: 3,
      realTimeMessage: "Offline",
    };
  },
  computed: {
    ...mapGetters("doctors", ["loadingStatus", "filteredPatients"]),
    showGrid() {
      return `lg${this.gridNumber}`;
    },
    mobile() {
      return this.$vuetify.breakpoint.lgAndUp;
    },
  },
  methods: {
    ...mapActions("doctors", ["getPatientsForDoctor"]),
    getFullName(s1, s2) {
      return s1 + " " + s2;
    },
    onClick(path) {
      this.$router.push(path);
    },
  },
  mounted() {
    if (this.getDoctorId) {
      this.getPatientsForDoctor(this.getDoctorId);
    }
  },
  components: { SearchBar, PageHeader },
};
</script>

<style scoped>
small {
  font-size: 10px;
}
</style>
