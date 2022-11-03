<template>
  <v-container fluid grid-list-md>
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
          v-for="patient in getPatients"
          :key="patient._id"
        >
          <v-card
            dark
            class="ml-2 mb-2 pa-2"
            style="width: 100%"
            @click="$router.push(`/patient-details/${patient._id}`)"
          >
            <div class="d-flex">
              <div class="d-flex justify-center align-center">
                <v-icon class="ml-2">mdi-account</v-icon>
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
                <v-icon>mdi-floor-plan</v-icon>
                <span style="color: orange" class="ml-1">Floor - 1 </span>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex mr-2 justify-center align-center">
                <v-icon>mdi-bed</v-icon>
                <span style="color: orange" class="ml-1">Room - 1 </span>
              </div>
            </div>

            <div class="d-flex mt-1" style="font-size: 12px">
              <div class="d-flex ml-2 justify-center align-center">
                <v-icon>mdi-slot-machine</v-icon>
                <span class="ml-1">{{ patient?.mac_address_framed }}</span>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex mr-2 justify-center align-center">
                <v-icon>mdi-battery</v-icon>
                <span class="ml-1">114Hrs 45 Min</span>
              </div>
            </div>

            <div class="mt-5 d-flex">
              <v-card class="elevation-1" color="black" style="width: 50%">
                <div class="d-flex align-center ml-9">
                  <div style="background-color: green">
                    <v-icon color="green">mdi-heart-pulse</v-icon>
                  </div>
                  <div class="d-flex ml-3" style="flex-direction: column">
                    <h5>74</h5>
                    <small>>120-30 c1</small>
                  </div>
                </div>
              </v-card>

              <v-card class="elevation-1 ml-3" color="black" style="width: 50%">
                <div class="d-flex align-center ml-1">
                  <v-img
                    class="mr-3"
                    src="https://accu.live/images/doctor_dashboard/doc-oxi.svg"
                    height="25"
                    contain
                  ></v-img>
                  <div class="d-flex ml-2 mr-16" style="flex-direction: column">
                    <h5>98</h5>
                    <small>Good</small>
                  </div>
                </div>
              </v-card>
            </div>

            <div class="mt-5 d-flex">
              <v-card class="elevation-1" color="black" style="width: 50%">
                <div class="d-flex align-center ml-1">
                  <v-img
                    src="https://accu.live/images/doctor_dashboard/doc-lunghs.svg"
                    height="30"
                    width="30"
                    contain
                  ></v-img>
                  <div class="d-flex mr-16" style="flex-direction: column">
                    <h5>16</h5>
                    <small>C1</small>
                  </div>
                </div>
              </v-card>

              <v-card class="elevation-1 ml-3" color="black" style="width: 50%">
                <div class="d-flex align-center ml-1">
                  <v-img
                    class="ml-2"
                    src="https://accu.live/images/doctor_dashboard/oxi-meter.svg"
                    height="25"
                    contain
                  ></v-img>
                  <div class="d-flex ml-2 mr-12" style="flex-direction: column">
                    <h5>120/85</h5>
                    <small>6 hours ago</small>
                  </div>
                </div>
              </v-card>
            </div>

            <div class="mt-5 d-flex">
              <v-card class="elevation-1" color="black" style="width: 50%">
                <div class="d-flex align-center ml-1">
                  <div class="ml-5">
                    <v-img
                      src="https://accu.live/images/doctor_dashboard/temprature.svg"
                      width="25"
                      contain
                    ></v-img>
                  </div>
                  <div class="d-flex ml-3" style="flex-direction: column">
                    <h5>98.7<sup>F</sup></h5>
                    <small>>120-30 C1</small>
                  </div>
                </div>
              </v-card>

              <v-card class="elevation-1 ml-3" color="black" style="width: 50%">
                <div class="d-flex align-center ml-3">
                  <div style="background-color: purple">
                    <v-img
                      src="https://accu.live/images/doctor_dashboard/doc-step.svg"
                      width="25"
                      contain
                    ></v-img>
                  </div>
                  <div class="d-flex ml-3" style="flex-direction: column">
                    <h5>98</h5>
                    <small>Good</small>
                  </div>
                </div>
              </v-card>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SearchBar from "@/components/SearchBar.vue";
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
  components: { SearchBar },
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
