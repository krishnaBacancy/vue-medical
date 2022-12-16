<template>
  <div>
    <PageHeader
      title="Add New Patient"
      pageIcon="mdi-arrow-left"
      @goBack="$router.go(-1)"
    />
    <br />
    <div class="pa-3">
      <v-layout row wrap>
        <v-flex d-flex xs12 sm12 md12>
          <v-card
            dark
            color="rgba(0, 0, 0, 0.5)"
            class="mt-2 mb-5 pa-5 white--text"
            style="width: 100%; border-radius: 20px"
          >
            <v-card-title
              class="warning--text text-h5 ml-n2 mb-2 font-weight-bold"
              >Patient Info</v-card-title
            >

            <div>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'text'"
                      :label="'Patient First Name'"
                      :fieldRules="nameRules"
                      v-model="user.fname"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'text'"
                      :label="'Patient Last Name'"
                      :fieldRules="nameRules"
                      v-model="user.lname"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="4">
                    <CustomTextField
                      :type="'email'"
                      :label="'Email Address'"
                      :fieldRules="emailRules"
                      v-model="user.email"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'number'"
                      :label="'Phone Number'"
                      :fieldRules="phoneRules"
                      v-model="user.phone"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'number'"
                      :label="'Emergency Number'"
                      :fieldRules="phoneRules"
                      v-model="user.emergencyPhone"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="4">
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
                          :value="dateValue"
                          @focus="focusDate"
                          filled
                          dense
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        locale="en-in"
                        v-model="dateValue"
                        no-title
                        @input="dateMenu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-radio-group v-model="user.gender" row class="ml-4">
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
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'number'"
                      :label="'Weight (kg)'"
                      :fieldRules="weightRules"
                      v-model="user.weight"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="4">
                    <CustomTextField
                      :type="'number'"
                      :label="'Height (cm)'"
                      :fieldRules="heightRules"
                      v-model="user.height"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      :append-icon="showPassIcon ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassIcon ? 'text' : 'password'"
                      v-model="user.password"
                      name="password"
                      label="Password"
                      hint="At least 6 characters"
                      required
                      filled
                      dense
                      :rules="passwordRules"
                      @click:append="showPassIcon = !showPassIcon"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'number'"
                      :label="'Aadhar Number'"
                      :fieldRules="aadharRules"
                      v-model="user.aadhar"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="4">
                    <CustomTextField
                      :type="'text'"
                      :label="'Address'"
                      :fieldRules="addressRules"
                      v-model="user.address"
                    />
                  </v-col>
                </v-row>

                <v-card-title
                  class="warning--text text-h5 mb-2 ml-n2 font-weight-bold"
                  >Family Member Info</v-card-title
                >
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'text'"
                      :label="'Member Name'"
                      :fieldRules="memberNameRules"
                      v-model="familyMemberInfo.name1"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="relations"
                      filled
                      dense
                      label="Select Relation"
                      :rules="selectRules"
                      v-model="familyMemberInfo.selected1Relation"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="4">
                    <CustomTextField
                      :type="'number'"
                      :label="'Contact Number'"
                      :fieldRules="phoneRules"
                      v-model="familyMemberInfo.contactNo1"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'text'"
                      :label="'Member Name'"
                      v-model="familyMemberInfo.name2"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="relations"
                      filled
                      label="Select Relation"
                      v-model="familyMemberInfo.selected2Relation"
                      dense
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="4">
                    <CustomTextField
                      :type="'number'"
                      :label="'Contact Number'"
                      v-model="familyMemberInfo.contactNo2"
                    />
                  </v-col>
                </v-row>

                <v-card-title
                  class="warning--text text-h5 mb-2 ml-n2 font-weight-bold"
                  >Medical History</v-card-title
                >
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'number'"
                      :label="'Blood Pressure'"
                      :fieldRules="bloodPressureRules"
                      v-model="medicalInfo.bloodPressure"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'number'"
                      :label="'Diabetics'"
                      :fieldRules="diabeticsRules"
                      v-model="medicalInfo.diabetics"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="4">
                    <v-select
                      :items="heartCondition"
                      filled
                      dense
                      label="Heart Condition"
                      :rules="selectRules"
                      v-model="medicalInfo.heartCondition"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'number'"
                      :label="'Thyroid'"
                      :field-rules="thyroidRules"
                      v-model="medicalInfo.thyroid"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'number'"
                      :label="'Obesity'"
                      :field-rules="obesityRules"
                      v-model="medicalInfo.obesity"
                    />
                  </v-col>
                </v-row>

                <v-row class="mt-2 mb-2">
                  <v-flex xs12 sm6>
                    <v-btn
                      color="warning"
                      :disabled="!valid"
                      width="95%"
                      @click="addPatient"
                      >Add Patient</v-btn
                    >
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
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/layouts/PageHeader.vue";
import CustomTextField from "@/components/CustomTextField.vue";
import { mapActions } from "vuex";

export default {
  name: "AddPatient",
  components: { PageHeader, CustomTextField },
  data() {
    return {
      valid: true,
      showPassIcon: false,
      nameRules: [(v) => !!v || "Name is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      phoneRules: [
        (v) => (v && v.length <= 11) || "type valid phone number",
        (v) => (v && v.length >= 8) || "type valid phone number",
      ],
      weightRules: [(v) => !!v || "Weight is required"],
      heightRules: [(v) => !!v || "Height is required"],
      addressRules: [(v) => !!v || "Address is required"],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "password must be at least 6 characters",
      ],
      aadharRules: [(v) => !!v || "Aadhar Number is required"],
      memberNameRules: [(v) => !!v || "Member name is required"],
      contactNumberRules: [(v) => !!v || "Contact Number is required"],
      selectRules: [(v) => !!v || "Must select this field."],
      relations: ["Son", "Daughter", "Mother", "Father"],
      heartCondition: ["Normal"],
      bloodPressureRules: [(v) => !!v || "Blood Pressure is required"],
      diabeticsRules: [(v) => !!v || "diabetics is required"],
      thyroidRules: [(v) => !!v || "thyroid is required"],
      obesityRules: [(v) => !!v || "obesity is required"],
      dateMenu: false,
      dateValue: null,
      user: {
        fname: "",
        lname: "",
        email: "",
        phone: null,
        emergencyPhone: null,
        gender: "male",
        height: null,
        weight: null,
        password: "",
        aadhar: null,
        address: "",
        member1Name: "",
        member2Name: "",
        contactNumber1: null,
        contactNumber2: null,
        selected1Relation: "",
        selected2Relation: "",
        bloodPressure: null,
        diabetics: null,
        heartCondition: "",
        thyroid: null,
        obesity: null,
      },
      familyMemberInfo: {
        name1: "",
        name2: "",
        selected1Relation: "",
        selected2Relation: "",
        contactNo1: null,
        contactNo2: null,
      },
      medicalInfo: {
        bloodPressure: null,
        diabetics: null,
        heartCondition: "",
        thyroid: null,
        obesity: null,
      },
    };
  },
  methods: {
    ...mapActions("userManagement", ["addUser"]),
    goToPreviousPage() {
      this.$router.go(-1);
    },
    addPatient() {
      let data = {
        first_Name: this.user.fname,
        last_Name: this.user.lname,
        email: this.user.email,
        mobile_no: this.user.phone,
        emergencyPhone: this.user.emergencyPhone,
        gender: this.user.gender,
        height: this.user.height,
        weight: this.user.weight,
        Address: this.user.address,
        password: this.user.password,
        aadharcard: this.user.aadhar,
        DOB: this.dateValue,
        family_members: [
          {
            familyMember1Name: this.familyMemberInfo.name1,
            familyMember1Relation: this.familyMemberInfo.selected1Relation,
            familyMember1Contact: this.familyMemberInfo.contactNo1,
          },
          {
            familyMember2Name: this.familyMemberInfo.name2,
            familyMember2Relation: this.familyMemberInfo.selected2Relation,
            familyMember2Contact: this.familyMemberInfo.contactNo2,
          },
        ],
        medical_history: [
          {
            bloodPressure: this.medicalInfo.bloodPressure,
            diabetics: this.medicalInfo.diabetics,
            heartCondition: this.medicalInfo.heartCondition,
            thyroid: this.medicalInfo.thyroid,
            obesity: this.medicalInfo.obesity,
          },
        ],
      };
      this.$refs.form.validate();
      if (this.valid) {
        if (!this.dateValue) {
          this.$toast.error("Must select date of birth.", {
            timeout: 3000,
          });
        } else {
          this.addUser(data)
            .then((success) => {
              console.log(success);
              this.$router.push({ path: "/patients" });
              this.$toast.success("Patient Added successfully.", {
                timeout: 3000,
              });
            })
            .catch((err) => {
              console.log(err);
              this.$toast.error("some error occured.", { timeout: 3000 });
            });
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
};
</script>

<style scoped></style>
