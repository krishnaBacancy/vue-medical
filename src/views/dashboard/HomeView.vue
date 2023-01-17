<template>
  <div>
    <div class="d-flex">
      <PageHeader title="Dashboard" pageIcon="mdi-home" />
      <div class="d-inline-flex align-center">
        <SearchBar />
        <div class="d-flex" v-if="mobile">
          <button class="btn-group px-4">
            <v-icon class="me-2" color="#333">mdi-filter</v-icon>
            <h4 class="font-weight-medium">Filter</h4>
          </button>
          <div class="btn-group">
            <v-icon class="mx-1" color="#333" @click="gridNumber = 3"
              >mdi-tally-mark-4</v-icon
            >
            <v-icon class="mx-1" color="#333" @click="gridNumber = 4"
              >mdi-tally-mark-3</v-icon
            >
            <v-icon class="mx-1 active" color="#333" @click="gridNumber = 6"
              >mdi-tally-mark-2</v-icon
            >
          </div>
        </div>
      </div>
    </div>
    <br />
    <v-progress-circular
      indeterminate
      color="amber"
      v-if="loadingStatus"
    ></v-progress-circular>

    <div v-else>
      <v-layout row wrap class="card-item-row">
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
            color="#F6F2F2"
            class="main__card"
            style="width: 100%"
            @click="$router.push(`/patient-details/${patient?.id}`)"
          >
            <div class="card-header">
              <div class="d-flex card-title-row">
                <div class="d-flex">
                  <img src="@/assets/User.svg" width="35" height="35" contain />
                  <h3 class="ml-3 font-weight-bold">
                    {{ patient?.firstName + " " + patient?.lastName }}
                  </h3>
                </div>
                <v-spacer>
                  <span
                    class="active-status offline"
                    v-if="realTimeMessage === 'Offline'"
                  ></span>
                </v-spacer>
                <span
                  class="active-status online"
                  v-if="realTimeMessage === 'Online'"
                ></span>
              </div>
              <div class="icon-text-block">
                <img
                  src="@/assets/floor.svg"
                  width="29"
                  height="29"
                  contain
                  class="icon__image"
                />
                <span class="text">Floor - 1 </span>
              </div>
              <div class="icon-text-block">
                <img
                  src="@/assets/rooms.svg"
                  width="29"
                  height="29"
                  class="icon__image"
                />
                <span class="text">Room - 1 </span>
              </div>
              <div class="icon-text-block">
                <img
                  src="@/assets/macAddress.svg"
                  width="29"
                  height="29"
                  class="icon__image"
                />
                <span class="text">{{
                  patient?.macAddressFramed.toUpperCase()
                }}</span>
              </div>
              <div class="icon-text-block">
                <img
                  src="@/assets/battery.svg"
                  width="29"
                  height="29"
                  class="icon__image"
                />
                <span class="text">114Hrs 45 Min</span>
              </div>
            </div>
            <div class="card-body">
              <div class="mini-light-box">
                <img
                  class="box-icon"
                  src="@/assets/heartbeat.svg"
                  height="39"
                  width="39"
                  contain
                />
                <h5 class="text-success">74 <span class="unit">unit</span></h5>
              </div>
              <div class="mini-light-box">
                <img
                  class="box-icon"
                  src="@/assets/oxygen.svg"
                  height="39"
                  width="39"
                  contain
                />
                <h5 class="text-warning">99 <span class="unit">O2</span></h5>
              </div>
              <div class="mini-light-box">
                <img
                  class="box-icon"
                  src="@/assets/lungs.svg"
                  height="39"
                  width="39"
                  contain
                />
                <h5 class="text-purple">16 <span class="unit">Cl</span></h5>
              </div>
              <div class="mini-light-box">
                <img
                  class="box-icon"
                  src="@/assets/bloodPressure.svg"
                  height="39"
                  width="39"
                  contain
                />
                <h5 class="text-info">120/85</h5>
              </div>
              <div
                class="mini-light-box"
                style="border-bottom-left-radius: inherit"
              >
                <img
                  class="box-icon"
                  src="@/assets/temprature.svg"
                  height="39"
                  width="39"
                  contain
                />
                <h5 class="text-danger">98.7 <span class="unit">F</span></h5>
              </div>
              <div
                class="mini-light-box"
                style="border-bottom-right-radius: inherit"
              >
                <img
                  class="box-icon"
                  src="@/assets/steps.svg"
                  height="39"
                  width="39"
                  contain
                />
                <h5 class="text-pink">150 <span class="unit">steps</span></h5>
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </div>

    <div v-if="!$store.state.doctors.deviceData" class="white--text display-1">
      No Patients to display...
    </div>
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
      return `xl${this.gridNumber}`;
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
.main__card.v-sheet.v-card {
  border-radius: 20px;
  box-shadow: 0px 6px 8px -2px #eee;
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
.btn-group {
  display: flex;
  align-items: center;
  padding: 8px 5px;
  border-radius: 12px;
  margin-left: 14px;
  background-color: #f6f2f2;
}
.btn-group .v-icon--link {
  border-radius: 5px;
  width: 30px;
  height: 30px;
}

.theme--light.v-icon:focus::after {
  border-radius: inherit;
  transform: scale(1);
}
.btn-group .v-icon--link.active {
  background-color: #f58220;
  color: #fff !important;
}
.card-item-row > * {
  margin-bottom: 30px;
}
.card-header {
  padding: 18px 12px 0;
  display: flex;
  border: 1px solid #eeeeef;
  flex-wrap: wrap;
}
.icon-text-block {
  width: 50%;
  text-align: left;
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  font-weight: 400;
  padding-right: 10px;
}

.icon-text-block .icon__image {
  height: 18px;
  width: 18px;
  margin-right: 14px;
}
.card-title-row {
  margin-bottom: 24px;
  width: 100%;
}
.active-status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 0;
  display: block;
}
.active-status.offline {
  background: #f58220;
}
.active-status.online {
  background: #29da57;
}
.active-status.online:after {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: inherit;
  height: inherit;
  background: inherit;
  transform: scale(2.25);
  opacity: 0.3;
  content: "";
  border-radius: inherit;
}
.card-body {
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
}
.mini-light-box {
  display: flex;
  width: 50%;
  align-items: center;
  padding: 14px 20px;
  border: 1px solid #eeeeef;
}
.unit {
  font-size: 12px;
}
.box-icon {
  border-radius: 5px;
  margin-right: 10px;
}
.text-success {
  color: #29dca1;
}
.text-warning {
  color: #f8d716;
}
.text-pink {
  color: #29dca1;
}
.text-purple {
  color: #7649f2;
}
.text-info {
  color: #53eaff;
}
.text-danger {
  color: #fd5d5d;
}
.text-pink {
  color: #f719c2;
}
</style>
