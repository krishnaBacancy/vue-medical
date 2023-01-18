<template>
  <div>
    <PageHeader
      title="Profile Details"
      pageIcon="mdi-arrow-left"
      @goBack="$router.go(-1)"
    />
    <br />
    <v-container
      fluid
      grid-list-md
      style="
        background: rgb(31, 32, 38) 0% 0% no-repeat padding-box;
        border-radius: 20px;
      "
      class="mb-4"
    >
      <v-progress-circular
        indeterminate
        color="purple"
        v-if="loadingStatus"
      ></v-progress-circular>
      <v-layout row wrap v-else>
        <v-flex d-flex xs12 md12 sm12 lg12>
          <div class="d-flex align-center" style="width: 100%">
            <div class="d-flex align-center">
              <div>
                <v-img
                  v-if="$vuetify.breakpoint.smAndUp"
                  src="@/assets/Ellipse 10.png"
                  class="ml-4"
                  contain
                  height="120"
                  width="120"
                ></v-img>
              </div>
              <div class="white--text ml-5 text-start">
                <h3 style="font-size: 32px">
                  {{ getSinglePatientData[0]?.fullName }}
                </h3>
                <h4 class="text-start" style="font-size: 22px">
                  + {{ getSinglePatientData[0]?.mobileNo }}
                </h4>
              </div>
            </div>
            <v-spacer></v-spacer>
            <div class="d-flex mr-1 mr-sm-5">
              <v-btn
                v-if="role === 'Doctor' || role === 'Admin'"
                color="warning"
                outlined
                :width="$vuetify.breakpoint.smAndDown ? '148' : '248'"
                :height="53"
                @click="
                  $router.push(`/edit-patient/${getSinglePatientData[0]?.id}`)
                "
                >Edit Profile</v-btn
              >
            </div>
          </div>
        </v-flex>

        <v-flex d-flex xs12 sm12 md12 class="mt-6 mb-2">
          <v-card
            color="#282934"
            class="ml-2 mr-2 mb-2 pa-2 white--text"
            style="width: 100%"
          >
            <v-card-title
              class="text-h5 font-weight-bold"
              style="color: #f58220"
              >Patient Info</v-card-title
            >
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <div class="d-flex flex-column align-start ml-4">
                  <small>Email Address</small>
                  <h3 class="font-weight-bold">
                    {{ getSinglePatientData[0]?.email }}
                  </h3>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <div
                  class="d-flex flex-column align-start ml-4 ml-sm-0"
                  style="width: 50%"
                >
                  <small class="">Date of Birth</small>
                  <h3 class="font-weight-bold">
                    {{ formatDate }}
                  </h3>
                </div>
              </v-col>
            </v-row>

            <v-row class="mt-3">
              <v-col cols="12" sm="6" md="6">
                <div class="d-flex flex-column align-start ml-4">
                  <small>Gender</small>
                  <h3 class="font-weight-bold">
                    {{ getSinglePatientData[0]?.gender }}
                  </h3>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <div
                  class="d-flex flex-column align-start text-start ml-4 ml-sm-0"
                  style="width: 50%"
                >
                  <small class="font-weight-thin">Emergency No</small>
                  <h3 class="font-weight-bold">
                    +{{
                      getSinglePatientData[0]?.emergencyPhone
                        ? getSinglePatientData[0]?.emergencyPhone
                        : "Not Available"
                    }}
                  </h3>
                </div>
              </v-col>
            </v-row>

            <v-row class="mt-3">
              <v-col cols="12" sm="6" md="6">
                <div class="d-flex flex-column align-start ml-4">
                  <small>Weight</small>
                  <h3 class="font-weight-bold">
                    {{
                      getSinglePatientData[0]?.weight
                        ? getSinglePatientData[0]?.weight
                        : "Not Available"
                    }}
                  </h3>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <div
                  class="d-flex flex-column align-start ml-4 ml-sm-0"
                  style="width: 50%"
                >
                  <small class="font-weight-thin">Height</small>
                  <h3 class="font-weight-bold">
                    {{
                      getSinglePatientData[0]?.height
                        ? getSinglePatientData[0]?.height
                        : "Not Available"
                    }}
                  </h3>
                </div>
              </v-col>
            </v-row>

            <v-row class="mt-3">
              <v-col cols="12" sm="6" md="6">
                <div class="d-flex flex-column align-start ml-4">
                  <small class="font-weight-thin">GST No</small>
                  <h3 class="font-weight-bold">
                    {{
                      getSinglePatientData[0]?.gstNo
                        ? getSinglePatientData[0]?.gstNo
                        : "Not Available"
                    }}
                  </h3>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <div class="d-flex flex-column align-start ml-4 ml-sm-0">
                  <small class="font-weight-thin">Aadhar Number</small>
                  <h3 class="font-weight-bold">
                    {{
                      getSinglePatientData[0]?.aadharcard
                        ? getSinglePatientData[0]?.aadharcard
                        : "Not Available"
                    }}
                  </h3>
                </div>
              </v-col>
            </v-row>

            <v-row class="mt-3">
              <v-col cols="12" sm="12" md="12">
                <div class="d-flex mt-n2">
                  <div class="d-flex flex-column align-start ml-3">
                    <small>Address</small>
                    <h3>{{ getSinglePatientData[0]?.address }}</h3>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm12 md6 class="mb-2">
          <v-card
            color="#282934"
            class="ml-2 mr-2 mb-2 pa-2 white--text"
            style="width: 100%"
          >
            <v-card-title
              class="text-h5 font-weight-bold"
              style="color: #f58220"
              >Emergency Contacts</v-card-title
            >
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="6"
                v-for="(familyInfo, id) in getSinglePatientData[0]
                  ?.familyMembers"
                :key="id"
              >
                <div class="d-flex align-center">
                  <div class="d-flex flex-column ml-4">
                    <h3 class="font-weight-bold text-start">
                      {{ familyInfo.name ? familyInfo.name : "Not Available" }}
                    </h3>
                    <h3 class="warning--text text-start">
                      {{
                        familyInfo.selectedRelation
                          ? familyInfo.selectedRelation
                          : "Not Available"
                      }}
                    </h3>
                    <small class="text-start">
                      {{
                        familyInfo.contactNo
                          ? familyInfo.contactNo
                          : "Not Available"
                      }}
                    </small>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm12 md6 class="mb-2">
          <v-card
            color="#282934"
            class="ml-2 mr-2 mb-2 pa-2 white--text"
            style="width: 100%"
          >
            <v-card-title
              class="text-h5 font-weight-bold"
              style="color: #f58220"
              >Medical Info</v-card-title
            >
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <div class="d-flex flex-column align-start ml-4">
                  <small>Blood Pressure</small>
                  <h3 class="font-weight-bold">
                    {{
                      getSinglePatientData[0]?.bloodPressure
                        ? getSinglePatientData[0]?.bloodPressure
                        : "Not Available"
                    }}
                  </h3>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div class="d-flex flex-column align-start ml-4 ml-sm-0">
                  <small class="">Diabetics</small>
                  <h3 class="font-weight-bold">
                    {{
                      getSinglePatientData[0]?.diabetics
                        ? getSinglePatientData[0]?.diabetics
                        : "Not Available"
                    }}
                  </h3>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div class="d-flex flex-column align-start ml-4 ml-md-0">
                  <small class="">Heart Condition</small>
                  <h3 class="font-weight-bold">
                    {{
                      getSinglePatientData[0]?.heartCondition
                        ? getSinglePatientData[0]?.heartCondition
                        : "Not Available"
                    }}
                  </h3>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="4">
                <div class="d-flex flex-column align-start ml-4">
                  <small>Thyroid</small>
                  <h3 class="font-weight-bold">
                    {{
                      getSinglePatientData[0]?.thyroid
                        ? getSinglePatientData[0]?.thyroid
                        : "Not Available"
                    }}
                  </h3>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div class="d-flex flex-column align-start ml-4 ml-sm-0">
                  <small class="">Obesity</small>
                  <h3 class="font-weight-bold">
                    {{
                      getSinglePatientData[0]?.obesity
                        ? getSinglePatientData[0]?.obesity
                        : "Not Available"
                    }}
                  </h3>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PageHeader from "@/layouts/PageHeader.vue";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PatientProfile",
  data() {
    return {
      role: localStorage.getItem("role"),
    };
  },
  computed: {
    ...mapGetters("doctors", ["getSinglePatientData", "loadingStatus"]),
    formatDate() {
      let dateOfBirth = this.getSinglePatientData[0]?.dob;
      let formattedDate = moment(dateOfBirth).format("YYYY-MM-DD");
      return formattedDate;
    },
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
small {
  color: #ababab;
  font-size: 16px;
}
h3 {
  font-size: 20px;
}
</style>
