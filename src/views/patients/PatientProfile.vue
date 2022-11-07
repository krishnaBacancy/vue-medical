<template>
  <div style="background-color: #282934; height: 100vh">
    <PageHeader title="Profile Details" pageIcon="mdi-card-account-details" />
    <br />
    <v-container fluid grid-list-md>
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
        <v-flex d-flex xs12 sm12 md6>
          <v-card dark class="ml-3 mb-2 pa-2 mr-3" style="width: 100%">
            <div>
              <v-card-title>Patient Info</v-card-title>
              <div class="d-flex justify-center align-center">
                <div class="d-flex align-start" style="flex-direction: column">
                  <label class="text--lighten-5">Email Address</label>
                  <h5>{{ getSinglePatientData[0]?.email }}</h5>
                </div>
                <v-spacer></v-spacer>
                <div class="d-flex align-end" style="flex-direction: column">
                  <label>Date Of Birth</label>
                  <h5>{{ getSinglePatientData[0]?.dob }}</h5>
                </div>
              </div>
              <div class="d-flex ma-1 mt-3 justify-center align-center">
                <div class="d-flex align-start" style="flex-direction: column">
                  <label>Gender</label>
                  <h5>{{ getSinglePatientData[0]?.gender }}</h5>
                </div>
                <v-spacer></v-spacer>
                <div
                  class="d-flex justify-center align-end"
                  style="flex-direction: column"
                >
                  <label>Emergency Number</label>
                  <h5>{{ getSinglePatientData[0]?.mobileNo }}</h5>
                </div>
              </div>
              <div class="d-flex ma-1 mt-3 justify-center align-center">
                <div
                  class="d-flex justify-center align-start"
                  style="flex-direction: column"
                >
                  <label>Weight</label>
                  <h5>65kg</h5>
                </div>
                <v-spacer></v-spacer>
                <div
                  class="d-flex justify-center align-end"
                  style="flex-direction: column"
                >
                  <label>Height</label>
                  <h5>175cm</h5>
                </div>
              </div>
              <div
                class="d-flex align-start mt-3"
                style="flex-direction: column"
              >
                <label>Address</label>
                <h5>{{ getSinglePatientData[0]?.address }}</h5>
              </div>
              <!-- <p class="mt-1">
                  Name :
                  <strong>{{
                    getSinglePatientData[0]?.firstName.charAt(0).toUpperCase() +
                    getSinglePatientData[0]?.firstName.slice(1) +
                    " " +
                    getSinglePatientData[0]?.lastName.charAt(0).toUpperCase() +
                    getSinglePatientData[0]?.lastName.slice(1)
                  }}</strong>
                </p>
                <p>
                  Email Address :
                  <strong>
                    {{ getSinglePatientData[0]?.email }}
                  </strong>
                </p>
                <p>
                  Gender :
                  <strong>
                    {{ getSinglePatientData[0]?.gender }}
                  </strong>
                </p> -->
            </div>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm12 md6>
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card
                color="indigo"
                dark
                class="ml-3 mb-2 pa-2 mr-3"
                style="width: 100%"
              >
                <p>
                  Contact Number :
                  <strong>
                    {{ getSinglePatientData[0]?.mobileNo }}
                  </strong>
                </p>
                <p>
                  Address :
                  <strong>
                    {{ getSinglePatientData[0]?.address }}
                  </strong>
                </p>
                <p v-if="getSinglePatientData[0]?.aadharcard">
                  Aadhar Number :
                  <strong>
                    {{ getSinglePatientData[0]?.aadharcard }}
                  </strong>
                </p>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- <v-card class="mx-auto mt-3">
      <v-toolbar color="indigo" dark>
        <v-toolbar-title>Patient Details</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left </v-icon>
        </v-btn>
      </v-toolbar>
      <br />

      <v-container fluid>
        <v-row dense no-gutters class="mt-2">
          <v-col cols="6" class="pa-2 pl-10 pb-10">
            <v-card shaped>
              <v-card-title class="justify-center"></v-card-title>
              <v-row>
                <v-col>
                  <div class="card__div">
                    <div class="">
                      <p>Name</p>
                      <h3>
                        {{
                          getSinglePatientData[0]?.firstName +
                          " " +
                          getSinglePatientData[0]?.lastName
                        }}
                      </h3>
                    </div>
                    <div class="d-inline">
                      <p>Email Address</p>
                      <h3>{{ getSinglePatientData[0]?.email }}</h3>
                    </div>
                    <div class="">
                      <p>Gender</p>
                      <h3>{{ getSinglePatientData[0]?.gender }}</h3>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="6" class="pa-2 pr-10">
            <v-card shaped>
              <v-card-title></v-card-title>
              <v-row>
                <v-col>
                  <div class="card__div__left">
                    <div class="">
                      <p>Mobile Number</p>
                      <h3>{{ getSinglePatientData[0]?.mobileNo }}</h3>
                    </div>
                    <div class="">
                      <p>Address</p>
                      <h3>{{ getSinglePatientData[0]?.address }}</h3>
                    </div>
                    <div class="" v-if="getSinglePatientData[0]?.aadharcard">
                      <p>Aadhar Number</p>
                      <h3>{{ getSinglePatientData[0]?.aadharcard }}</h3>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card> -->
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
