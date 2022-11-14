<template>
  <div>
    <PageHeader title="Add New Patient" pageIcon="mdi-account" />
    <br />
    <v-container
      fluid
      grid-list-md
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <v-layout row wrap>
        <v-flex d-flex xs12 sm12 md12>
          <v-card
            dark
            color="rgba(0, 0, 0, 0.3)"
            class="mt-2 mb-2 pa-5 white--text"
            style="width: 100%"
          >
            <v-card-title class="warning--text text-h5 ml-n2 mb-2"
              >Patient Info</v-card-title
            >

            <div>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'text'"
                      :placeholder="'Patient Name'"
                      :label="'Patient Name'"
                      :fieldRules="nameRules"
                      v-model="user.name"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'email'"
                      :placeholder="'Email'"
                      :label="'Email Address'"
                      :fieldRules="emailRules"
                      v-model="user.email"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'number'"
                      :placeholder="'Phone Number'"
                      :label="'Phone Number'"
                      :fieldRules="phoneRules"
                      v-model="user.phone"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'number'"
                      :placeholder="'Emergency Number'"
                      :label="'Emergency Number'"
                      :fieldRules="phoneRules"
                      v-model="user.emergencyPhone"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
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
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'number'"
                      :placeholder="'Weight'"
                      :label="'Weight (kg)'"
                      :fieldRules="weightRules"
                      v-model="user.weight"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'number'"
                      :placeholder="'Height'"
                      :label="'Height (cm)'"
                      :fieldRules="heightRules"
                      v-model="user.height"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-file-input
                      dense
                      filled
                      accept="image/*"
                      label="Upload Profile Image"
                    ></v-file-input>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'text'"
                      :placeholder="'Address'"
                      :label="'Address'"
                      :fieldRules="addressRules"
                      v-model="user.address"
                    />
                  </v-col>
                </v-row>

                <v-card-title class="warning--text text-h5 mb-2 ml-n2"
                  >Family Member Info</v-card-title
                >
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'text'"
                      :placeholder="'Member Name'"
                      :label="'Member Name'"
                      :fieldRules="memberNameRules"
                      v-model="user.member1Name"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="relations"
                      filled
                      label="Select Relation"
                      :rules="selectRules"
                      v-model="user.selected1Relation"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'number'"
                      :placeholder="'Contact Number'"
                      :label="'Contact Number'"
                      :fieldRules="contactNumberRules"
                      v-model="user.contactNumber1"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'text'"
                      :placeholder="'Member Name'"
                      :label="'Member Name'"
                      :fieldRules="memberNameRules"
                      v-model="user.member2Name"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="relations"
                      filled
                      label="Select Relation"
                      :rules="selectRules"
                      v-model="user.selected2Relation"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'number'"
                      :placeholder="'Contact Number'"
                      :label="'Contact Number'"
                      :fieldRules="contactNumberRules"
                      v-model="user.contactNumber2"
                    />
                  </v-col>
                </v-row>

                <v-card-title class="warning--text text-h5 mb-2 ml-n2"
                  >Doctor Info</v-card-title
                >
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'text'"
                      :placeholder="'Doctor Name'"
                      :label="'Doctor Name'"
                      :fieldRules="doctorNameRules"
                      v-model="user.doctorName"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="designations"
                      filled
                      label="Designation"
                      :rules="selectRules"
                      v-model="user.selectedDesignation"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'number'"
                      :placeholder="'Contact Number'"
                      :label="'Contact Number'"
                      :fieldRules="contactNumberRules"
                      v-model="user.contactNumber1"
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'text'"
                      :placeholder="'Address'"
                      :label="'Address'"
                      :fieldRules="doctorAddressRules"
                      v-model="user.doctorAddress"
                    />
                  </v-col>
                </v-row>

                <v-card-title class="warning--text text-h5 mb-2 ml-n2"
                  >Medical History</v-card-title
                >
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'number'"
                      :placeholder="'High Blood Pressure'"
                      :label="'High Blood Pressure'"
                      :fieldRules="bloodPressureRules"
                      v-model="user.bloodPressure"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'number'"
                      :placeholder="'Diabetics'"
                      :label="'Diabetics'"
                      :fieldRules="diabeticsRules"
                      v-model="user.diabetics"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="heartCondition"
                      filled
                      label="Heart Condition"
                      :rules="selectRules"
                      v-model="user.heartCondition"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'number'"
                      :placeholder="'Thyroid'"
                      :label="'Thyroid'"
                      v-model="user.thyroid"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <CustomTextField
                      :type="'number'"
                      :placeholder="'Obesity'"
                      :label="'Obesity'"
                      v-model="user.obesity"
                    />
                  </v-col>
                </v-row>

                <v-row class="ml-1">
                  <v-btn color="warning" :disabled="!valid" @click="addPatient"
                    >Add Patient</v-btn
                  >
                </v-row>
              </v-form>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PageHeader from "@/layouts/PageHeader.vue";
import CustomTextField from "@/components/CustomTextField.vue";

export default {
  name: "AddPatient",
  components: { PageHeader, CustomTextField },
  data() {
    return {
      valid: true,
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
      memberNameRules: [(v) => !!v || "Member name is required"],
      contactNumberRules: [(v) => !!v || "Contact Number is required"],
      doctorNameRules: [(v) => !!v || "Doctor Number is required"],
      selectRules: [(v) => !!v || "Must select this field."],
      relations: ["Son", "Daughter", "Mother", "Father"],
      designations: ["MBBS"],
      heartCondition: ["Normal"],
      doctorAddressRules: [(v) => !!v || "Address is required"],
      bloodPressureRules: [(v) => !!v || "Blood Pressure is required"],
      diabeticsRules: [(v) => !!v || "diabetics is required"],
      dateMenu: false,
      dateValue: null,
      user: {
        name: "",
        email: "",
        phone: null,
        emergencyPhone: null,
        gender: "male",
        height: null,
        weight: null,
        address: "",
        member1Name: "",
        member2Name: "",
        contactNumber1: null,
        contactNumber2: null,
        selected1Relation: "",
        selected2Relation: "",
        doctorName: "",
        selectedDesignation: "",
        doctorAddress: "",
        bloodPressure: null,
        diabetics: null,
        heartCondition: "",
        thyroid: null,
        obesity: null,
      },
    };
  },
  methods: {
    addPatient() {
      this.$refs.form.validate();
      if (this.valid) {
        console.log("user--", this.user);
        // this.$toast.success("Patient added successfully.", { timeout: 3000 });
      }
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
