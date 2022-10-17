<template>
  <div>
    <v-container fluid grid-list-md>
      <v-progress-circular
        indeterminate
        color="purple"
        v-if="loadingStatus"
      ></v-progress-circular>
      <v-card class="mx-auto mt-3" v-else>
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>Patient Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="$router.go(-1)">
            <v-icon>mdi-arrow-left </v-icon>
          </v-btn>
        </v-toolbar>
        <br />
        <v-layout row wrap>
          <v-flex d-flex xs12 sm6 md6>
            <v-card
              color="purple"
              dark
              class="ml-2 mb-2 pa-2"
              style="width: 100%"
            >
              <p class="mt-1">
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
              </p>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12 sm6 md6>
            <v-layout row wrap>
              <v-flex d-flex>
                <v-card
                  color="indigo"
                  dark
                  class="ml-1 mb-2 pa-2 mr-2"
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
      </v-card>
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PatientDetails",
  computed: {
    ...mapGetters("doctors", ["getSinglePatientData", "loadingStatus"]),
  },
  methods: {
    ...mapActions("doctors", ["getSinglePatient"]),
  },
  mounted() {
    this.getSinglePatient(this.$route.params.id);
  },
};
</script>

<style scoped>
.card__div__left {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
</style>
