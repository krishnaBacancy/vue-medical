<template>
  <div>
    <PageHeader
      title="Edit User"
      pageIcon="mdi-account-edit"
      btnName="Back"
      color-name="warning"
      btnIconName="mdi-arrow-left"
      @addNewPatient="$router.go(-1)"
    />
    <br />
    <div class="pa-3">
      <v-progress-circular
        indeterminate
        color="blue"
        v-if="loadingStatus"
      ></v-progress-circular>
      <v-layout row wrap v-else>
        <v-flex d-flex xs12 sm12 md12>
          <v-card
            style="width: 100%"
            dark
            color="rgba(0, 0, 0, 0.5)"
            class="mt-2 mb-2 pa-5 white--text"
          >
            <v-card-title class="warning--text text-h5 ml-n2 mb-2"
              >User Info</v-card-title
            >
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    type="text"
                    v-model="user.first_Name"
                    name="fname"
                    label="First Name"
                    required
                    filled
                    dense
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    type="text"
                    v-model="user.last_Name"
                    name="lname"
                    label="Last Name"
                    required
                    filled
                    dense
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    type="email"
                    v-model="user.email"
                    name="email"
                    label="Email"
                    required
                    filled
                    dense
                    :rules="emailRules"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    type="number"
                    v-model="user.mobile_no"
                    name="phone"
                    label="Phone"
                    required
                    filled
                    dense
                    :rules="phoneRules"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    type="number"
                    v-model="user.emergencyPhone"
                    name="emergencyPhone"
                    label="Emergency Number"
                    filled
                    dense
                    :rules="phoneRules"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-radio-group v-model="user.gender" row class="ml-2">
                    <template v-slot:label>
                      <div><strong>Gender</strong></div>
                    </template>
                    <v-radio value="male" color="warning">
                      <template v-slot:label>
                        <div>Male</div>
                      </template>
                    </v-radio>
                    <v-radio value="female" color="warning">
                      <template v-slot:label>
                        <div>Female</div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12">
                  <v-textarea
                    v-model="user.Address"
                    auto-grow
                    label="Address"
                    rows="1"
                    filled
                    dense
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    type="number"
                    v-model="user.adharcard"
                    name="Aadhar"
                    label="Aadhar Card Number"
                    required
                    filled
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-menu
                    v-model="dateMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                    max-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        label="Date Of Birth"
                        readonly
                        hide-details
                        :value="dob"
                        @focus="focusDate"
                        filled
                        dense
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      locale="en-in"
                      v-model="dob"
                      no-title
                      @input="dateMenu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    type="number"
                    v-model="user.weight"
                    name="weight"
                    label="Weight"
                    required
                    filled
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    type="number"
                    v-model="user.height"
                    name="height"
                    label="Height"
                    filled
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    type="number"
                    v-model="user.GSTNO"
                    name="gstNo"
                    label="Gst No"
                    required
                    filled
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-card-title class="warning--text text-h5 mb-2 ml-n2"
                >Family Member Info</v-card-title
              >
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    type="text"
                    label="Member Name"
                    :rules="memberNameRules"
                    required
                    filled
                    dense
                    v-model="user.family_members[0].familyMember1Name"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="relations"
                    filled
                    dense
                    label="Select Relation"
                    :rules="selectRules"
                    v-model="user.family_members[0].familyMember1Relation"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    type="number"
                    label="Contact Number"
                    filled
                    dense
                    :rules="phoneRules"
                    v-model="user.family_members[0].familyMember1Contact"
                  />
                </v-col>
              </v-row>

              <v-card-title class="warning--text text-h5 mb-2 ml-n2"
                >Medical History</v-card-title
              >
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    type="number"
                    label="Blood Pressure"
                    required
                    filled
                    dense
                    v-model="user.medical_history[0].bloodPressure"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    type="number"
                    filled
                    dense
                    label="Diabetics"
                    required
                    v-model="user.medical_history[0].diabetics"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-select
                    label="Heart Condition"
                    filled
                    dense
                    :items="heartCondition"
                    v-model="user.medical_history[0].heartCondition"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    type="number"
                    label="Thyroid"
                    required
                    filled
                    dense
                    v-model="user.medical_history[0].thyroid"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    type="number"
                    filled
                    dense
                    label="Obesity"
                    required
                    v-model="user.medical_history[0].obesity"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="mt-2 mb-2">
                <v-flex xs12 sm6>
                  <v-btn
                    :disabled="!valid"
                    color="success"
                    @click="updateUser"
                    width="95%"
                  >
                    Update Patient
                  </v-btn>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-btn
                    color="error"
                    class="mt-4 mt-sm-0 mt-md-0"
                    width="95%"
                    @click="reset"
                  >
                    Reset Form
                  </v-btn>
                </v-flex>
              </v-row>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/layouts/PageHeader.vue";
import axios from "axios";
import moment from "moment";
import { mapGetters } from "vuex";
import doctors from "../../api/doctor";

export default {
  name: "AddUser",
  data() {
    return {
      valid: true,
      user: {},
      dob: "",
      selected: "",
      selectRules: [(v) => !!v || "Must select this field."],
      nameRules: [(v) => !!v || "Name is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      showPassIcon: false,
      phoneRules: [
        (v) => !!v || "Phone Number is required",
        (v) => (v && v.length == 10) || "type valid phone number 1",
        (v) => (v && v.length > 9) || "type valid phone number 2",
        (v) => (v && v.length < 11) || "type valid phone number 3",
      ],
      gstNoRules: [(v) => !!v || "GST Number is required"],
      memberNameRules: [(v) => !!v || "Member name is required"],
      relations: ["Son", "Daughter", "Mother", "Father"],
      heartCondition: ["Normal"],
      checkbox: false,
      dateMenu: false,
      dateValue: null,
    };
  },
  async mounted() {
    const res = await doctors.getSinglePatientData(this.$route?.params?.id);
    this.user = res.data.data[0];
    let dateOfBirth = res.data.data[0].DOB;
    let formattedDate = moment(dateOfBirth).format("YYYY-MM-DD");
    this.dob = formattedDate;
  },
  computed: {
    ...mapGetters("doctors", ["loadingStatus"]),
  },
  methods: {
    async updateUser() {
      this.$refs.form.validate();
      if (this.valid) {
        const res = await axios.patch(
          `http://194.233.69.96:8989/api/v1/users/updateuser/${this.user.userId}`,
          this.user
        );
        if (res.status === 200) {
          this.$router.push({ path: "/patients" });
          this.$toast.success("User Updated successfully.", { timeout: 3000 });
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    focusDate() {
      setTimeout(() => {
        if (!this.dateMenu) {
          this.dateMenu = true;
        }
      }, 200);
    },
  },
  components: { PageHeader },
};
</script>

<style scoped></style>
