<template>
  <div style="background-color: #282934; height: 100vh">
    <PageHeader title="Dashboard" pageIcon="mdi-home" />
    <br />
    <v-container fluid grid-list-md style="background-color: black">
      <v-progress-circular
        indeterminate
        color="amber"
        v-if="loadingStatus"
      ></v-progress-circular>

      <div v-else>
        <SearchBar />
        <v-layout row wrap>
          <v-flex
            d-flex
            xs12
            sm6
            md4
            lg3
            xl2
            v-for="patient in getPatients"
            :key="patient._id"
          >
            <v-card
              color="#282934"
              class="ml-2 mb-2 pa-2 white--text"
              style="width: 100%"
              @click="$router.push(`/patient-details/${patient._id}`)"
            >
              <div class="d-flex">
                <div class="d-flex justify-center align-center">
                  <v-icon class="ml-2 white--text">mdi-account</v-icon>
                  <h3 class="ml-2">
                    {{
                      patient?.customerfirstName.charAt(0).toUpperCase() +
                      patient?.customerfirstName.slice(1) +
                      " " +
                      patient?.customerlastName.charAt(0).toUpperCase() +
                      patient?.customerlastName.slice(1)
                    }}
                  </h3>
                </div>
                <v-spacer></v-spacer>
                <v-icon color="green" size="50">mdi-circle-small</v-icon>
              </div>

              <div class="d-flex mt-1" style="font-size: 12px">
                <div class="d-flex ml-2 justify-center align-center">
                  <v-icon class="white--text">mdi-floor-plan</v-icon>
                  <span style="color: orange" class="ml-1">Floor - 1 </span>
                </div>
                <v-spacer></v-spacer>
                <div class="d-flex mr-9 justify-center align-center">
                  <v-icon class="white--text">mdi-bed</v-icon>
                  <span style="color: orange" class="ml-1">Room - 1 </span>
                </div>
              </div>

              <div class="d-flex mt-1" style="font-size: 12px">
                <div class="d-flex ml-2 justify-center align-center">
                  <v-icon class="white--text">mdi-slot-machine</v-icon>
                  <span class="ml-1">{{
                    patient?.mac_address_framed.toUpperCase()
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
                  height="50"
                  color="black"
                  style="width: 50%"
                >
                  <div class="d-flex align-center ml-2">
                    <v-img
                      class="mr-3 mt-2"
                      src="https://accu.live/images/doctor_dashboard/heartbeat.svg"
                      height="20"
                      contain
                    ></v-img>
                    <div
                      class="d-flex mr-7 mt-1"
                      style="flex-direction: column"
                    >
                      <h5 class="green--text">74</h5>
                      <small class="white--text">>120-30 c1</small>
                    </div>
                  </div>
                </v-card>

                <v-card
                  class="elevation-1 ml-3"
                  color="black"
                  style="width: 50%"
                  height="50"
                >
                  <div class="d-flex align-center ml-2">
                    <v-img
                      class="mr-3 mt-2"
                      src="https://accu.live/images/doctor_dashboard/doc-oxi.svg"
                      height="25"
                      contain
                    ></v-img>
                    <div
                      class="d-flex ml-2 mr-15 mt-2"
                      style="flex-direction: column"
                    >
                      <h5 class="yellow--text">98</h5>
                      <small class="white--text">Good</small>
                    </div>
                  </div>
                </v-card>
              </div>

              <div class="mt-5 d-flex">
                <v-card class="elevation-1" height="50" color="black">
                  <div class="d-flex align-center ml-3">
                    <v-img
                      class="mr-8"
                      src="https://accu.live/images/doctor_dashboard/doc-lunghs.svg"
                      height="50"
                      contain
                    ></v-img>
                    <div class="d-flex mr-16" style="flex-direction: column">
                      <h5 class="purple--text">16</h5>
                      <small class="white--text">C1</small>
                    </div>
                  </div>
                </v-card>

                <v-card
                  class="elevation-1 ml-3"
                  color="black"
                  style="width: 50%"
                  height="50"
                >
                  <div class="d-flex align-center ml-1">
                    <v-img
                      class="ml-2"
                      src="https://accu.live/images/doctor_dashboard/oxi-meter.svg"
                      height="25"
                      contain
                    ></v-img>
                    <div
                      class="d-flex ml-2 mr-12"
                      style="flex-direction: column"
                    >
                      <h5 class="cyan--text">120/85</h5>
                      <small class="white--text">6 hours ago</small>
                    </div>
                  </div>
                </v-card>
              </div>

              <div class="mt-5 d-flex">
                <v-card
                  class="elevation-1"
                  height="50"
                  color="black"
                  style="width: 50%"
                >
                  <div class="d-flex align-center ml-3">
                    <v-img
                      class="mr-5"
                      src="https://accu.live/images/doctor_dashboard/temprature.svg"
                      height="30"
                      contain
                    ></v-img>
                    <div class="d-flex mr-8" style="flex-direction: column">
                      <h5 class="red--text">98.7<sup>F</sup></h5>
                      <small class="white--text">>120-30 C1</small>
                    </div>
                  </div>
                </v-card>

                <v-card
                  class="elevation-1 ml-3"
                  color="black"
                  style="width: 50%"
                  height="50"
                >
                  <div class="d-flex align-center ml-1">
                    <v-img
                      class="ml-2 mt-1"
                      src="https://accu.live/images/doctor_dashboard/doc-step.svg"
                      height="40"
                      contain
                    ></v-img>
                    <div
                      class="d-flex ml-5 mr-16 mt-1"
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

      <div v-if="getPatients.length === 0" class="white--text display-1">
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
    };
  },
  computed: {
    ...mapGetters("doctors", ["getPatients", "loadingStatus"]),
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
.grid-container {
  /* display: grid; */
  display: flex;
  flex-direction: row;
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
  cursor: pointer;
  background-color: lightgrey;
  border: 1px solid rgba(0, 0, 0, 0.8);
  width: 50%;
  /* padding: 10px; */
  /* font-size: 30px; */
  /* text-align: center; */
  /* min-width: 600px; */
}
.grid-item:hover {
  scale: 1.05;
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
