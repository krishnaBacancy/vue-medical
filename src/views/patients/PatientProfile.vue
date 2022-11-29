<template>
  <div>
    <PageHeader
      title="Profile Details"
      pageIcon="mdi-card-account-details"
      btnName="Back"
      color-name="warning"
      btnIconName="mdi-arrow-left"
      @addNewPatient="$router.go(-1)"
    />
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
                  {{ getSinglePatientData[0]?.fullName }}
                </h3>
                <h4 class="text-start">
                  + {{ getSinglePatientData[0]?.mobileNo }}
                </h4>
              </div>
            </div>
            <v-spacer></v-spacer>
            <div class="d-flex mr-10">
              <v-btn
                color="warning"
                outlined
                @click="
                  $router.push(`/edit-patient/${getSinglePatientData[0]?.id}`)
                "
                >Edit Profile</v-btn
              >
            </div>
          </div>
        </v-flex>

        <v-flex d-flex xs12 sm12 md12 class="mt-3">
          <v-card
            color="#282934"
            class="ml-2 mb-2 pa-2 white--text"
            style="width: 100%"
          >
            <v-card-title class="warning--text text-h5"
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
                <div class="d-flex flex-column align-start" style="width: 50%">
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
                <div class="d-flex flex-column align-start" style="width: 50%">
                  <small class="font-weight-thin">Emergency Number</small>
                  <h3 class="font-weight-bold">
                    +{{
                      getSinglePatientData[0]?.emergencyPhone
                        ? getSinglePatientData[0]?.emergencyPhone
                        : "NULL"
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
                        : "NULL"
                    }}
                  </h3>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <div class="d-flex flex-column align-start" style="width: 50%">
                  <small class="font-weight-thin">Height</small>
                  <h3 class="font-weight-bold">
                    {{
                      getSinglePatientData[0]?.height
                        ? getSinglePatientData[0]?.height
                        : "NULL"
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
                        : "NULL"
                    }}
                  </h3>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <div class="d-flex flex-column align-start">
                  <small class="font-weight-thin">Aadhar Number</small>
                  <h3 class="font-weight-bold">
                    {{
                      getSinglePatientData[0]?.aadhar
                        ? getSinglePatientData[0]?.aadhar
                        : "NULL"
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

        <v-flex d-flex xs12 sm12 md6>
          <v-card
            color="#282934"
            class="ml-2 mb-2 pa-2 white--text"
            style="width: 100%"
          >
            <v-card-title class="warning--text text-h5"
              >Emergency Contacts</v-card-title
            >
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <div class="d-flex align-center">
                  <div class="d-flex flex-column ml-3">
                    <h3 class="font-weight-bold text-start">
                      {{
                        getSinglePatientData[0]?.familyMember1Name
                          ? getSinglePatientData[0]?.familyMember1Name
                          : "NULL"
                      }}
                    </h3>
                    <h3 class="warning--text text-start">
                      {{
                        getSinglePatientData[0]?.familyMember1Relation
                          ? getSinglePatientData[0]?.familyMember1Relation
                          : "NULL"
                      }}
                    </h3>
                    <h4 class="text-start">
                      {{
                        getSinglePatientData[0]?.familyMember1Contact
                          ? getSinglePatientData[0]?.familyMember1Contact
                          : "NULL"
                      }}
                    </h4>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <div class="d-flex align-center">
                  <div class="d-flex flex-column mr-16">
                    <h3 class="font-weight-bold text-start">
                      {{
                        getSinglePatientData[0]?.familyMember2Name
                          ? getSinglePatientData[0]?.familyMember2Name
                          : "NULL"
                      }}
                    </h3>
                    <h3 class="warning--text text-start">
                      {{
                        getSinglePatientData[0]?.familyMember2Relation
                          ? getSinglePatientData[0]?.familyMember2Relation
                          : "NULL"
                      }}
                    </h3>
                    <h4 class="text-start">
                      {{
                        getSinglePatientData[0]?.familyMember2Contact
                          ? getSinglePatientData[0]?.familyMember2Contact
                          : "NULL"
                      }}
                    </h4>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm12 md6>
          <v-card
            color="#282934"
            class="ml-2 mb-2 pa-2 white--text"
            style="width: 100%"
          >
            <v-card-title class="warning--text text-h5"
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
                        : "NULL"
                    }}
                  </h3>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div class="d-flex flex-column align-start">
                  <small class="">Diabetics</small>
                  <h3 class="font-weight-bold">
                    {{
                      getSinglePatientData[0]?.diabetics
                        ? getSinglePatientData[0]?.diabetics
                        : "NULL"
                    }}
                  </h3>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div class="d-flex flex-column align-start">
                  <small class="">Heart Condition</small>
                  <h3 class="font-weight-bold">
                    {{
                      getSinglePatientData[0]?.heartCondition
                        ? getSinglePatientData[0]?.heartCondition
                        : "NULL"
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
                        : "NULL"
                    }}
                  </h3>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <div class="d-flex flex-column align-start">
                  <small class="">Obesity</small>
                  <h3 class="font-weight-bold">
                    {{
                      getSinglePatientData[0]?.obesity
                        ? getSinglePatientData[0]?.obesity
                        : "NULL"
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
  font-size: 1rem;
}
</style>
