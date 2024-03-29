<template>
  <div>
    <PageHeader
      title="Add New Patient"
      pageIcon="mdi-arrow-left"
      @goBack="$router.go(-1)"
    />
    <br />
    <div>
      <h5 class="text-left warning--text text-h5 mb-4 font-weight-bold">
        Patient Info
      </h5>
      <div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col class="form-group" cols="12" sm="4" md="4">
              <CustomTextField
                :type="'text'"
                :label="'Patient First Name'"
                :fieldRules="nameRules"
                v-model.trim="user.fname"
              />
            </v-col>
            <v-col class="form-group" cols="12" sm="4" md="4">
              <CustomTextField
                :type="'text'"
                :label="'Patient Last Name'"
                :fieldRules="nameRules"
                v-model.trim="user.lname"
              />
            </v-col>
            <v-col class="form-group" cols="12" sm="4" md="4">
              <CustomTextField
                :type="'email'"
                :label="'Email Address'"
                :fieldRules="emailRules"
                v-model.trim="user.email"
              />
            </v-col>
            <v-col class="form-group" cols="12" sm="6" md="4">
              <vue-tel-input
                v-model.trim="user.phone"
                v-bind="phoneProps"
                @validate="phoneNumberChanged"
              ></vue-tel-input>
            </v-col>
            <v-col class="form-group" cols="12" sm="6" md="4">
              <vue-tel-input
                v-model.trim="user.emergencyPhone"
                v-bind="emergencyPhoneProps"
                @validate="emergencyPhoneChanged"
              ></vue-tel-input>
            </v-col>
            <v-col class="form-group" cols="12" sm="6" md="4">
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
                  :max="new Date().toISOString().slice(0, 10)"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col class="form-group" cols="12" sm="6" md="4">
              <v-radio-group v-model="user.gender" row>
                <template v-slot:label>
                  <div><strong>Gender</strong></div>
                </template>
                <v-radio value="male" color="warning">
                  <template v-slot:label>
                    <div>Male</div>
                  </template>
                </v-radio>
                <v-radio value="female" color="warning" class="mr-0">
                  <template v-slot:label>
                    <div>Female</div>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="form-group" cols="12" sm="6" md="4">
              <CustomTextField
                :type="'number'"
                :label="'Weight (kg)'"
                :fieldRules="weightRules"
                v-model.trim="user.weight"
              />
            </v-col>
            <v-col class="form-group" cols="12" sm="6" md="4">
              <CustomTextField
                :type="'number'"
                :label="'Height (cm)'"
                :fieldRules="heightRules"
                v-model.trim="user.height"
              />
            </v-col>
            <v-col class="form-group" cols="12" sm="6" md="4">
              <v-text-field
                :append-icon="showPassIcon ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassIcon ? 'text' : 'password'"
                v-model.trim="user.password"
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
            <v-col class="form-group" cols="12" sm="6" md="4">
              <CustomTextField
                :type="'number'"
                :label="'Aadhar Number'"
                :fieldRules="aadharRules"
                v-model.trim="user.aadhar"
              />
            </v-col>
            <v-col class="form-group" cols="12" sm="12" md="4">
              <CustomTextField
                :type="'text'"
                :label="'Address'"
                :fieldRules="addressRules"
                v-model.trim="user.address"
              />
            </v-col>
          </v-row>
          <h5
            class="text-left warning--text text-h5 mb-4 mt-5 font-weight-bold"
          >
            Emergency Contact Info
          </h5>
          <v-row v-for="(familyInfo, index) in familyMemberInfo" :key="index">
            <v-col class="form-group" cols="12" sm="4" lg="auto">
              <CustomTextField
                :type="'text'"
                :label="'Member Name'"
                :fieldRules="memberNameRules"
                v-model.trim="familyInfo.name"
                :value="familyInfo.name"
              />
            </v-col>
            <v-col class="form-group" cols="12" sm="4" lg="auto">
              <!-- <v-select
                :items="relations"
                filled
                dense
                label="Select Relation"
                :rules="selectRules"
                v-model="familyInfo.selectedRelation"
              ></v-select> -->
              <CustomTextField
                :type="'text'"
                :label="'Member Relation'"
                :fieldRules="memberRelationRules"
                v-model.trim="familyInfo.selectedRelation"
                :value="familyInfo.selectedRelation"
              />
            </v-col>
            <v-col class="form-group" cols="12" sm="4" lg="auto">
              <vue-tel-input
                v-model.trim="familyInfo.contactNo"
                v-bind="relativePhoneProps"
                @validate="relativePhoneChanged"
              ></vue-tel-input>
            </v-col>
            <v-col class="form-group" cols="12" sm="auto" lg="auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="34"
                height="34"
                class="ml-2 mt-2 main__svg"
                v-show="index == familyMemberInfo.length - 1"
                @click="addField(familyInfo, familyMemberInfo)"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="green"
                  d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="34"
                height="34"
                class="ml-10 main__svg"
                @click="removeField(index, familyMemberInfo)"
                v-show="familyMemberInfo.length > 1"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="#EC4899"
                  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
                />
              </svg>
            </v-col>
          </v-row>

          <h5
            class="text-left warning--text text-h5 mb-4 mt-5 font-weight-bold"
          >
            Medical History
          </h5>
          <v-row>
            <v-col class="form-group" cols="12" sm="6" md="4">
              <CustomTextField
                :type="'number'"
                :label="'Blood Pressure'"
                :fieldRules="bloodPressureRules"
                v-model.trim="medicalInfo.bloodPressure"
              />
            </v-col>
            <v-col class="form-group" cols="12" sm="6" md="4">
              <CustomTextField
                :type="'number'"
                :label="'Diabetics'"
                :fieldRules="diabeticsRules"
                v-model.trim="medicalInfo.diabetics"
              />
            </v-col>
            <v-col class="form-group" cols="12" sm="12" md="4">
              <!-- <v-select
                :items="heartCondition"
                filled
                dense
                label="Heart Condition"
                :rules="selectRules"
                v-model="medicalInfo.heartCondition"
              ></v-select> -->
              <CustomTextField
                :type="'text'"
                :label="'Heart Condition'"
                :fieldRules="heartConditionRules"
                v-model.trim="medicalInfo.heartCondition"
              />
            </v-col>
            <v-col class="form-group" cols="12" sm="6" md="4">
              <CustomTextField
                :type="'number'"
                :label="'Thyroid'"
                :field-rules="thyroidRules"
                v-model.trim="medicalInfo.thyroid"
              />
            </v-col>
            <v-col class="form-group" cols="12" sm="6" md="4">
              <CustomTextField
                :type="'number'"
                :label="'Obesity'"
                :field-rules="obesityRules"
                v-model.trim="medicalInfo.obesity"
              />
            </v-col>
          </v-row>

          <div class="text-left">
            <v-btn color="warning" class="py-3 h-auto" outlined @click="reset">
              Reset Form
            </v-btn>
            <v-btn
              color="warning"
              class="py-3 ml-4 px-6 h-auto"
              :disabled="!valid"
              @click="addPatient"
              >Add Patient</v-btn
            >
          </div>
        </v-form>
      </div>
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
      aadharRules: [
        (v) => !!v || "Aadhar Number is required",
        (v) =>
          /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/.test(v) ||
          "Aadhar Number is invalid",
      ],
      memberNameRules: [(v) => !!v || "Member name is required"],
      memberRelationRules: [(v) => !!v || "Member Relation is required."],
      contactNumberRules: [(v) => !!v || "Contact Number is required"],
      heartConditionRules: [(v) => !!v || "Must enter Heart Condition"],
      selectRules: [(v) => !!v || "Must select this field."],
      relations: ["Son", "Daughter", "Mother", "Father"],
      heartCondition: ["Normal"],
      bloodPressureRules: [(v) => !!v || "Blood Pressure is required"],
      diabeticsRules: [(v) => !!v || "diabetics is required"],
      thyroidRules: [(v) => !!v || "thyroid is required"],
      obesityRules: [(v) => !!v || "obesity is required"],
      dateMenu: false,
      dateValue: null,
      phoneProps: {
        preferredCountries: ["US", "GB"],
        mode: "international",
        inputOptions: {
          showDialCode: false,
          maxlength: 15,
          placeholder: "Enter phone number",
          required: true,
        },
        invalidMsg: "Invalid",
        autoFormat: false,
        validCharactersOnly: true,
        disabledFormatting: false,
      },
      emergencyPhoneProps: {
        preferredCountries: ["US", "GB"],
        mode: "international",
        inputOptions: {
          showDialCode: false,
          maxlength: 15,
          placeholder: "Enter emergency phone number",
          required: true,
        },
        invalidMsg: "Invalid",
        autoFormat: false,
        validCharactersOnly: true,
        disabledFormatting: false,
      },
      relativePhoneProps: {
        preferredCountries: ["US", "GB"],
        mode: "international",
        inputOptions: {
          showDialCode: false,
          maxlength: 15,
          placeholder: "Enter relative phone number",
          required: true,
        },
        invalidMsg: "Invalid",
        autoFormat: false,
        validCharactersOnly: true,
        disabledFormatting: false,
      },
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
      familyMemberInfo: [{ name: "", selectedRelation: "", contactNo: null }],
      medicalInfo: {
        bloodPressure: null,
        diabetics: null,
        heartCondition: "",
        thyroid: null,
        obesity: null,
      },
      isValidPhoneNumber: false,
      isValidEmergencyPhoneNumber: false,
      isValidRelativePhoneNumber: false,
    };
  },
  methods: {
    ...mapActions("userManagement", ["addUser"]),
    phoneNumberChanged(e) {
      this.isValidPhoneNumber = e?.valid;
    },
    emergencyPhoneChanged(e) {
      this.isValidEmergencyPhoneNumber = e?.valid;
    },
    relativePhoneChanged(e) {
      this.isValidRelativePhoneNumber = e?.valid;
    },
    goToPreviousPage() {
      this.$router.go(-1);
    },
    addField(obj, type) {
      if (
        obj.name === "" ||
        obj.selectedRelation === "" ||
        obj.contactNo === ""
      ) {
        this.$toast.error("Please enter all details properly.", {
          timeout: 3000,
        });
      } else {
        let newObj = {};
        for (const [key, val] of Object.entries(obj)) {
          newObj[key] = "";
          console.log(val);
        }
        type.push(newObj);
      }
    },
    removeField(index, type) {
      type.splice(index, 1);
      this.$refs.form.resetValidation();
    },
    checkEmptyFamilyMemberInfo() {
      for (let i = 0; i < this.familyMemberInfo.length; i++) {
        if (
          this.familyMemberInfo[i].name === "" ||
          this.familyMemberInfo[i].selectedRelation === "" ||
          this.familyMemberInfo[i].contactNo === null
        ) {
          this.valid = false;
          break;
        }
        this.valid = true;
      }
    },
    addPatient() {
      let data = {
        first_Name: this.user.fname,
        last_Name: this.user.lname,
        email: this.user.email,
        mobile_no: this.user.phone.replaceAll(" ", ""),
        emergencyPhone: this.user.emergencyPhone.replaceAll(" ", ""),
        gender: this.user.gender,
        height: this.user.height,
        weight: this.user.weight,
        Address: this.user.address,
        password: this.user.password,
        adharcard: this.user?.aadhar?.replaceAll(" ", ""),
        DOB: this.dateValue,
        family_members: this.familyMemberInfo,
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
      const checkEmptyFamilyMemberInfo = this.checkEmptyFamilyMemberInfo();
      console.log("val--", checkEmptyFamilyMemberInfo);
      if (this.valid) {
        if (!this.dateValue) {
          this.$toast.error("Must select date of birth.", {
            timeout: 3000,
          });
        }
        if (
          !this.isValidPhoneNumber ||
          !this.isValidEmergencyPhoneNumber ||
          !this.isValidRelativePhoneNumber
        ) {
          this.$toast.error("Please enter valid mobile number.", {
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
              this.$toast.error(err.response.data.message, { timeout: 3000 });
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

<style scoped>
.main__svg {
  cursor: pointer;
}
</style>
