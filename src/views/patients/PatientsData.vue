<template>
  <div style="background-color: aqua">
    <h1>Patients</h1>
    <v-progress-circular
      indeterminate
      color="pink"
      v-if="loadingStatus"
    ></v-progress-circular>
    <v-container fluid grid-list-md v-else>
      <v-layout
        row
        wrap
        v-for="patient in getAllPatientsOnly"
        :key="patient.id"
      >
        <v-flex d-flex xs12 sm12 md12>
          <v-card dark class="ml-2 mb-2 pa-2" style="width: 100%">
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex justify-center align-center">
                <div>
                  <v-img src="https://accu.live/images/user_logo.png"></v-img>
                </div>
                <div
                  class="d-flex justify-center align-center ml-3"
                  style="flex-direction: column"
                >
                  <span>Patient Name</span>
                  <h2>
                    {{ getFullName(patient?.firstName, patient?.lastName) }}
                  </h2>
                </div>
              </div>

              <div>
                <span>Room Number</span>
                <h2>001</h2>
              </div>

              <div>
                <span>Floor Number</span>
                <h2>001</h2>
              </div>

              <div>
                <span>Phone Number</span>
                <h3>{{ patient?.mobileNo }}</h3>
              </div>

              <div>
                <span>Patient Status</span>
                <h3 style="color: green">Hospitalized</h3>
              </div>

              <div>
                <v-icon
                  color="warning"
                  class="mr-3"
                  @click="$router.push(`/patients/patient/${patient.id}`)"
                  >mdi-eye</v-icon
                >
                <v-icon color="info" class="mr-2">mdi-pencil</v-icon>
                <v-icon color="red" class="mr-2">mdi-delete</v-icon>
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- <div v-for="patient in getAllPatientsOnly" :key="patient.id">
      <div>
        <CustomCard
          cls="flex-nowrap"
          :cols="'12'"
          :wdh="1000"
          :colors="'#1F7087'"
          :title="getFullName(patient.firstName, patient.lastName)"
          :phone="patient.mobileNo"
          class="mt-5 card__item"
          @goToLink="$router.push(`/patients/patient/${patient.id}`)"
          :styles="'display: flex; justify-content: space-around'"
        >
        </CustomCard>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import CustomCard from "@/components/CustomCard.vue";
export default {
  name: "PatientsData",
  data() {
    return {
      getDoctorId: localStorage.getItem("user_id"),
    };
  },
  computed: {
    ...mapGetters("doctors", ["getAllPatientsOnly", "loadingStatus"]),
  },
  methods: {
    ...mapActions("doctors", ["getAllPatientsData"]),
    getFullName(s1, s2) {
      return s1 + " " + s2;
    },
  },
  mounted() {
    if (this.getDoctorId) {
      this.getAllPatientsData(this.getDoctorId);
    }
  },
  // components: { CustomCard },
};
</script>

<style scoped>
.card__item:hover {
  scale: 1.03;
}
</style>
