<template>
  <div>
    <PageHeader
      title="Patients"
      pageIcon="mdi-account-injury"
      btnName="Add"
      color-name="warning"
      btnIconName="mdi-account-plus"
      @addNewPatient="addPatient"
    />
    <br />
    <v-container
      fluid
      grid-list-md
      style="background-color: rgba(0, 0, 0, 0.5)"
      class="mb-4"
    >
      <v-layout
        row
        wrap
        v-for="patient in getAllPatientsOnly"
        :key="patient.id"
      >
        <v-flex d-flex xs12 sm12 md12>
          <v-card
            color="#282934"
            class="ml-2 mt-2 mb-2 pa-2 white--text"
            style="width: 100%"
          >
            <div
              class="d-flex mb-3 d-sm-flex flex-md-row flex-sm-column align-center justify-space-between"
            >
              <div class="d-flex align-center justify-start">
                <v-img
                  src="https://accu.live/images/author-image.png"
                  class="ml-4"
                  contain
                  height="70"
                ></v-img>
                <div class="d-flex flex-column ml-3">
                  <small class="font-weight-bold text-start"
                    >Patient Name</small
                  >
                  <h2 class="text-start">
                    {{ getFullName(patient?.firstName, patient?.lastName) }}
                  </h2>
                </div>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex flex-column" style="width: 16%">
                <small class="font-weight-bold text-start">Room Number</small>
                <h2 class="text-start">001</h2>
              </div>

              <div class="d-flex flex-column" style="width: 16%">
                <small class="font-weight-bold text-start">Floor Number</small>
                <h2 class="text-start">001</h2>
              </div>

              <div class="d-flex flex-column" style="width: 16%">
                <small class="font-weight-bold text-start">Phone Number</small>
                <h2 class="text-start">{{ patient?.mobileNo }}</h2>
              </div>

              <div class="d-flex flex-column" style="width: 16%">
                <small class="font-weight-bold text-start"
                  >Patient Status</small
                >
                <h2 class="text-start info--text">Hospitalized</h2>
              </div>

              <div class="d-flex" style="width: 10%">
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
  </div>
</template>

<script>
import PageHeader from "@/layouts/PageHeader.vue";
import { mapActions, mapGetters } from "vuex";
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
    addPatient() {
      this.$router.push("/add-new-patient");
    },
    getFullName(s1, s2) {
      return (
        s1.charAt(0).toUpperCase() +
        s1.slice(1) +
        " " +
        s2.charAt(0).toUpperCase() +
        s2.slice(1)
      );
    },
  },
  mounted() {
    if (this.getDoctorId) {
      this.getAllPatientsData(this.getDoctorId);
    }
  },
  components: {
    PageHeader,
  },
};
</script>

<style scoped></style>
