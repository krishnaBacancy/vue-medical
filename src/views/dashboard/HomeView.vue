<template>
  <div style="background-color: #282934">
    <PageHeader title="Dashboard" pageIcon="mdi-home" />
    <br />
    <v-container
      fluid
      grid-list-md
      style="background-color: rgb(31, 32, 38); border-radius: 20px"
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
            <v-icon class="me-2" color="white">mdi-filter</v-icon>
            <h3 class="font-weight-regular">Filter</h3>
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
              color="#2B2934"
              class="white--text main__card"
              style="width: 100%"
              @click="$router.push(`/patient-details/${patient?.id}`)"
            >
              <div class="d-flex">
                <div class="d-flex justify-center align-center">
                  <v-flex>
                    <v-img
                      src="@/assets/User.svg"
                      width="35"
                      height="35"
                      contain
                      class="ml-1"
                    ></v-img>
                  </v-flex>
                  <h3 class="ml-2 font-weight-regular">
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
                  <v-img
                    src="@/assets/floor.svg"
                    width="29"
                    height="29"
                    contain
                    class="icon__image"
                  ></v-img>
                  <span style="color: orange" class="ml-2">Floor - 1 </span>
                </div>
                <v-spacer></v-spacer>
                <div class="d-flex mr-11 justify-center align-center">
                  <v-img
                    src="@/assets/rooms.svg"
                    width="29"
                    height="29"
                    class="icon__image"
                  ></v-img>
                  <span style="color: orange" class="ml-2">Room - 1 </span>
                </div>
              </div>

              <div class="d-flex mt-2" style="font-size: 12px">
                <div class="d-flex ml-2 justify-center align-center">
                  <v-img
                    src="@/assets/macAddress.svg"
                    width="29"
                    height="29"
                    class="icon__image"
                  ></v-img>
                  <span class="ml-2">{{
                    patient?.macAddressFramed.toUpperCase()
                  }}</span>
                </div>
                <v-spacer></v-spacer>
                <div class="d-flex mr-4 justify-center align-center">
                  <v-img
                    src="@/assets/battery.svg"
                    width="29"
                    height="29"
                    class="icon__image"
                  ></v-img>
                  <span class="ml-2">114Hrs 45 Min</span>
                </div>
              </div>

              <div class="mt-5 d-flex">
                <v-card
                  class="elevation-1 card__div"
                  height="60"
                  color="black"
                  style="width: 50%"
                >
                  <div class="d-flex align-center">
                    <v-flex>
                      <v-img
                        class="ml-2 mt-2"
                        src="@/assets/heartbeat.svg"
                        height="39"
                        width="39"
                        contain
                      ></v-img>
                    </v-flex>
                    <v-flex xs12>
                      <div class="d-flex mt-1 text-start ml-1 flex-column">
                        <h5 class="green--text">74</h5>
                        <small class="white--text">>120-30</small>
                      </div>
                    </v-flex>
                  </div>
                </v-card>

                <v-card
                  class="elevation-1 ml-3 card__div"
                  color="black"
                  style="width: 50%"
                  height="60"
                >
                  <div class="d-flex align-center">
                    <v-flex>
                      <v-img
                        class="ml-2 mt-2"
                        src="@/assets/oxygen.svg"
                        height="39"
                        width="39"
                        contain
                      ></v-img>
                    </v-flex>
                    <v-flex xs12>
                      <div class="d-flex text-start mt-1 flex-column ml-1">
                        <h5 class="yellow--text">98</h5>
                        <small class="white--text">Good</small>
                      </div>
                    </v-flex>
                  </div>
                </v-card>
              </div>

              <div class="mt-5 d-flex">
                <v-card
                  class="elevation-1 card__div"
                  height="60"
                  color="black"
                  style="width: 50%"
                >
                  <div class="d-flex align-center">
                    <v-flex>
                      <v-img
                        class="ml-2 mt-2"
                        src="@/assets/lungs.svg"
                        height="39"
                        width="39"
                        contain
                      ></v-img>
                    </v-flex>
                    <v-flex xs12>
                      <div class="d-flex ml-1 mt-1 text-start flex-column">
                        <h5 class="purple--text">16</h5>
                        <small class="white--text">C1</small>
                      </div>
                    </v-flex>
                  </div>
                </v-card>

                <v-card
                  class="elevation-1 ml-3 card__div"
                  color="black"
                  style="width: 50%"
                  height="60"
                >
                  <div class="d-flex align-center">
                    <v-flex>
                      <v-img
                        class="ml-2 mt-2"
                        src="@/assets/bloodPressure.svg"
                        height="39"
                        width="39"
                        contain
                      ></v-img>
                    </v-flex>
                    <v-flex xs12>
                      <div class="d-flex flex-column ml-1 mt-1 text-start">
                        <h5 class="cyan--text">120/85</h5>
                        <small class="white--text">6 hrs ago</small>
                      </div>
                    </v-flex>
                  </div>
                </v-card>
              </div>

              <div class="mt-5 d-flex mb-2">
                <v-card
                  class="elevation-1 card__div"
                  height="60"
                  color="black"
                  style="width: 50%"
                >
                  <div class="d-flex align-center">
                    <v-flex>
                      <v-img
                        class="ml-2 mt-2"
                        src="@/assets/temprature.svg"
                        height="39"
                        width="39"
                        contain
                      ></v-img>
                    </v-flex>
                    <v-flex xs12>
                      <div class="d-flex flex-column text-start ml-1 mt-1">
                        <h5 class="red--text">
                          98.7<sup style="font-size: 10px">F</sup>
                        </h5>
                        <small class="white--text">>120-30</small>
                      </div>
                    </v-flex>
                  </div>
                </v-card>

                <v-card
                  class="elevation-1 ml-3 card__div"
                  color="black"
                  style="width: 50%"
                  height="60"
                >
                  <div class="d-flex align-center">
                    <v-flex>
                      <v-img
                        class="ml-2 mt-2"
                        src="@/assets/steps.svg"
                        height="39"
                        width="39"
                        contain
                      ></v-img>
                    </v-flex>
                    <v-flex xs12>
                      <div
                        class="d-flex flex-column text-start mt-1 ml-1"
                        style="flex-direction: column"
                      >
                        <h5 class="pink--text">10000</h5>
                        <small class="white--text">Steps</small>
                      </div>
                    </v-flex>
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
h5 {
  font-size: 20px;
}
small {
  font-size: 10px;
}
span {
  font-size: 14px;
}
.card__div {
  /* UI Properties */
  background-color: #2b2934;
  box-shadow: 0px 5px 7px #00000033;
  border: 1px solid #ffffff0d;
  border-radius: 10px;
  opacity: 1;
}
.main__card {
  border-radius: 20px;
  padding: 20px;
}
.container.grid-list-md .layout .flex {
  padding: 10px;
}
@media only screen and (max-width: 420px) {
  span {
    font-size: 13px;
  }
  .icon__image {
    height: 20px;
    width: 20px;
  }
}

@media only screen and (max-width: 790px) and (min-width: 600px) {
  span {
    font-size: 13px;
  }
}
</style>
