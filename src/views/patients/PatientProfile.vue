<template>
  <div>
    <PageHeader title="Profile Details" pageIcon="mdi-card-account-details" />
    <br />
    <v-container
      fluid
      grid-list-md
      style="background-color: rgba(0, 0, 0, 0.5)"
      class="mb-4"
    >
      <v-progress-circular
        indeterminate
        color="purple"
        v-if="loadingStatus"
      ></v-progress-circular>
      <!-- <v-toolbar color="indigo" dark>
            <v-toolbar-title>Profile Details</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="warning" outlined>Edit Profile</v-btn>
            <v-btn icon @click="$router.go(-1)" class="ml-3">
              <v-icon>mdi-arrow-left </v-icon>
            </v-btn>
          </v-toolbar> -->
      <v-layout row wrap v-else>
        <v-flex d-flex xs12 md12 sm12 lg12>
          <div class="d-flex align-center" style="width: 100%">
            <div class="d-flex align-center">
              <div>
                <v-img
                  src="https://accu.live/images/author-image.png"
                  class="ml-4"
                  contain
                ></v-img>
              </div>
              <div class="white--text ml-5">
                <h3>
                  {{
                    getSinglePatientData[0]?.firstName.charAt(0).toUpperCase() +
                    getSinglePatientData[0]?.firstName.slice(1) +
                    " " +
                    getSinglePatientData[0]?.lastName.charAt(0).toUpperCase() +
                    getSinglePatientData[0]?.lastName.slice(1)
                  }}
                </h3>
                <h4 class="text-start">
                  + {{ getSinglePatientData[0]?.mobileNo }}
                </h4>
              </div>
            </div>
            <v-spacer></v-spacer>
            <div class="d-flex mr-10">
              <v-btn color="warning" outlined>Edit Profile</v-btn>
            </div>
          </div>
        </v-flex>

        <v-flex d-flex xs12 sm12 md6 class="mt-3">
          <v-card
            color="#282934"
            class="ml-2 mb-2 pa-2 white--text"
            style="width: 100%"
          >
            <v-card-title class="warning--text">Patient Info</v-card-title>
            <div class="d-flex">
              <div class="d-flex flex-column align-start ml-4">
                <small>Email Address</small>
                <h3 class="font-weight-bold">
                  {{ getSinglePatientData[0]?.email }}
                </h3>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex flex-column align-start" style="width: 50%">
                <small class="">Date of Birth</small>
                <h3 class="font-weight-bold">
                  {{ getSinglePatientData[0]?.dob }}
                </h3>
              </div>
            </div>

            <div class="d-flex mt-3">
              <div class="d-flex flex-column align-start ml-4">
                <small>Gender</small>
                <h3 class="font-weight-bold">
                  {{ getSinglePatientData[0]?.gender }}
                </h3>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex flex-column align-start" style="width: 50%">
                <small class="font-weight-thin">Emergency Number</small>
                <h3 class="font-weight-bold">
                  +{{ getSinglePatientData[0]?.mobileNo }}
                </h3>
              </div>
            </div>

            <div class="d-flex mt-3">
              <div class="d-flex flex-column align-start ml-4">
                <small>Weight</small>
                <h3 class="font-weight-bold">65kg</h3>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex flex-column align-start" style="width: 50%">
                <small class="font-weight-thin">Height</small>
                <h3 class="font-weight-bold">175cm</h3>
              </div>
            </div>

            <div class="d-flex mt-3">
              <v-flex d-flex lg8 xs12>
                <div class="d-flex flex-column align-start ml-3">
                  <small>Address</small>
                  <h3>{{ getSinglePatientData[0]?.address }}</h3>
                </div>
              </v-flex>
            </div>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm12 md6 class="mt-3">
          <v-card
            color="#282934"
            class="ml-2 mb-2 pa-2 white--text"
            style="width: 100%"
          >
            <v-card-title class="warning--text">Doctor Info</v-card-title>
            <div class="d-flex">
              <div class="d-flex flex-column align-start ml-4">
                <small>Doctor Name</small>
                <h3 class="font-weight-bold">Dr. Arvind Sharma</h3>
              </div>
            </div>

            <div class="d-flex mt-3">
              <div class="d-flex flex-column align-start ml-4">
                <small>Doctor Designation</small>
                <h3 class="font-weight-bold">M.B.B.S</h3>
              </div>
            </div>

            <div class="d-flex mt-3">
              <div class="d-flex flex-column align-start ml-4">
                <small>Phone Number</small>
                <h3 class="font-weight-bold">+91 987 654 3210</h3>
              </div>
            </div>

            <div class="d-flex mt-3">
              <v-flex d-flex lg8 xs12 md10 sm12>
                <div class="d-flex flex-column align-start ml-3">
                  <small>Clinic / Hospital Address</small>
                  <h3 class="ml-md-n1 text-start">
                    B-504, Iscon Platinium, Near Iscon Mall, Iscon Ahmedabad -
                    380015.
                  </h3>
                </div>
              </v-flex>
            </div>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm12 md6>
          <v-card
            color="#282934"
            class="ml-2 mb-2 pa-2 white--text"
            style="width: 100%"
          >
            <v-card-title class="warning--text"
              >Emergency Contacts</v-card-title
            >
            <div class="d-flex mb-3">
              <div class="d-flex align-center">
                <v-img
                  src="https://accu.live/images/author-image.png"
                  class="ml-4"
                  contain
                  height="70"
                ></v-img>
                <div class="d-flex flex-column ml-3">
                  <h3 class="font-weight-bold text-start">John Doe</h3>
                  <h3 class="warning--text text-start">Son</h3>
                  <h4 class="text-start">+91 987 654 3210</h4>
                </div>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex align-center" style="width: 50%">
                <v-img
                  src="https://accu.live/images/author-image.png"
                  contain
                  height="70"
                ></v-img>
                <div class="d-flex flex-column mr-16">
                  <h3 class="font-weight-bold text-start">John Doe</h3>
                  <h3 class="warning--text text-start">Son</h3>
                  <h4 class="text-start">+91 987 654 3210</h4>
                </div>
              </div>
            </div>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm12 md6>
          <v-card
            color="#282934"
            class="ml-2 mb-2 pa-2 white--text"
            style="width: 100%"
          >
            <v-card-title class="warning--text">Medical Info</v-card-title>
            <div class="d-flex">
              <div
                class="d-flex flex-column align-start ml-4"
                style="width: 33%"
              >
                <small>High Blood Pressure</small>
                <h3 class="font-weight-bold">124</h3>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex flex-column align-start" style="width: 33%">
                <small class="">Diabetics</small>
                <h3 class="font-weight-bold">140</h3>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex flex-column align-start" style="width: 33%">
                <small class="">Heart Condition</small>
                <h3 class="font-weight-bold">Normal</h3>
              </div>
            </div>

            <div class="d-flex mt-3">
              <div
                class="d-flex flex-column align-start ml-4"
                style="width: 33%"
              >
                <small>Thyroid</small>
                <h3 class="font-weight-bold">NULL</h3>
              </div>
              <!-- <v-spacer></v-spacer> -->
              <div class="d-flex flex-column align-start" style="width: 33%">
                <small class="">Obesity</small>
                <h3 class="font-weight-bold">NULL</h3>
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
  name: "PatientProfile",
  computed: {
    ...mapGetters("doctors", ["getSinglePatientData", "loadingStatus"]),
  },
  methods: {
    ...mapActions("doctors", ["getSinglePatient"]),
  },
  mounted() {
    this.getSinglePatient(this.$route.params.id);
  },
  components: { PageHeader },
};
</script>

<style scoped>
.card__div__left {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
</style>
