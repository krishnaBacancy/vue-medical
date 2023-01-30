<template>
  <div>
    <PageHeader
      title="Edit User"
      pageIcon="mdi-arrow-left"
      @goBack="$router.go(-1)"
    />
    <v-progress-circular
      indeterminate
      color="blue"
      v-if="loading"
    ></v-progress-circular>
    <v-card-title class="warning--text text-h5 ml-n2 mb-2 font-weight-bold"
      >User Info</v-card-title
    >
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col class="form-group" cols="12" sm="6" lg="4">
          <v-text-field
            type="text"
            v-model.trim="user.first_Name"
            name="fname"
            label="First Name"
            required
            filled
            dense
            :rules="nameRules"
          ></v-text-field>
        </v-col>

        <v-col class="form-group" cols="12" sm="6" lg="4">
          <v-text-field
            type="text"
            v-model.trim="user.last_Name"
            name="lname"
            label="Last Name"
            required
            filled
            dense
            :rules="nameRules"
          ></v-text-field>
        </v-col>
        <v-col class="form-group" cols="12" sm="6" lg="4">
          <v-text-field
            type="email"
            v-model.trim="user.email"
            name="email"
            label="Email"
            required
            filled
            dense
            :rules="emailRules"
          ></v-text-field>
        </v-col>
        <v-col class="form-group" cols="12" sm="6" md="4">
          <vue-tel-input
            v-model="userPhoneNumber"
            v-bind="phoneProps"
            @validate="phoneNumberChanged"
          ></vue-tel-input>
        </v-col>
        <v-col class="form-group" cols="12" sm="6" md="4">
          <vue-tel-input
            v-model.trim="userEmergencyPhone"
            v-bind="emergencyPhoneProps"
            @validate="emergencyPhoneChanged"
          ></vue-tel-input>
        </v-col>
        <v-col class="form-group" cols="12" sm="6" md="4">
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
        <v-col class="form-group" cols="12" sm="6" md="4">
          <v-textarea
            v-model.trim="user.Address"
            auto-grow
            label="Address"
            rows="1"
            filled
            dense
            :rules="addressRules"
          ></v-textarea>
        </v-col>
        <v-col class="form-group" cols="12" sm="6" md="4">
          <v-text-field
            type="number"
            v-model.trim="user.adharcard"
            name="Aadhar"
            label="Aadhar Card Number"
            required
            filled
            dense
            :rules="aadharRules"
          ></v-text-field>
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
              :max="new Date().toISOString().slice(0, 10)"
              @input="dateMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col class="form-group" cols="12" sm="6" md="4">
          <v-text-field
            type="number"
            v-model.trim="user.weight"
            name="weight"
            label="Weight"
            required
            filled
            dense
            :rules="weightRules"
          ></v-text-field>
        </v-col>

        <v-col class="form-group" cols="12" sm="6" md="4">
          <v-text-field
            type="number"
            v-model.trim="user.height"
            name="height"
            label="Height"
            filled
            dense
            :rules="heightRules"
          ></v-text-field>
        </v-col>
        <v-col class="form-group" cols="12" sm="6" md="4">
          <v-text-field
            type="number"
            v-model.trim="user.GSTNO"
            name="gstNo"
            label="Gst No"
            required
            filled
            dense
          ></v-text-field>
        </v-col>
      </v-row>

      <v-card-title class="warning--text text-h5 mb-2 ml-n2 font-weight-bold"
        >Emergency Contact Info</v-card-title
      >
      <v-row v-for="(familyInfo, index) in user.family_members" :key="index">
        <v-col class="form-group" cols="12" sm="6" md="3">
          <v-text-field
            type="text"
            label="Member Name"
            :rules="memberNameRules"
            required
            filled
            dense
            v-model.trim="familyInfo.name"
          />
        </v-col>
        <v-col class="form-group" cols="12" sm="6" md="3">
          <!-- <v-select
            :items="relations"
            filled
            dense
            label="Select Relation"
            :rules="selectRules"
            v-model="familyInfo.selectedRelation"
          ></v-select> -->
          <v-text-field
            type="text"
            label="Member Relation"
            :rules="memberRelationRules"
            required
            filled
            dense
            v-model.trim="familyInfo.selectedRelation"
          />
        </v-col>
        <v-col class="form-group" cols="12" sm="12" md="3">
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
            v-show="index == user.family_members.length - 1"
            @click="addField(familyInfo, user.family_members)"
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
            v-show="user.family_members.length > 1"
            @click="removeField(index, user.family_members)"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="#EC4899"
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
            />
          </svg>
        </v-col>
      </v-row>

      <v-card-title class="warning--text text-h5 mb-2 ml-n2 font-weight-bold"
        >Medical History</v-card-title
      >
      <div v-for="(medicalInfo, id) in user.medical_history" :key="'A' + id">
        <v-row>
          <v-col class="form-group" cols="12" sm="6" md="4">
            <v-text-field
              type="number"
              label="Blood Pressure"
              required
              filled
              dense
              :rules="bloodPressureRules"
              v-model.trim="medicalInfo.bloodPressure"
            />
          </v-col>
          <v-col class="form-group" cols="12" sm="6" md="4">
            <v-text-field
              type="number"
              filled
              dense
              label="Diabetics"
              required
              v-model.trim="medicalInfo.diabetics"
              :rules="diabeticsRules"
            ></v-text-field>
          </v-col>
          <v-col class="form-group" cols="12" sm="6" md="4">
            <!-- <v-select
              label="Heart Condition"
              filled
              dense
              :items="heartCondition"
              v-model="medicalInfo.heartCondition"
                    /> -->
            <v-text-field
              type="text"
              label="Heart Condition"
              required
              filled
              dense
              :rules="heartConditionRules"
              v-model.trim="medicalInfo.heartCondition"
            />
          </v-col>
          <v-col class="form-group" cols="12" sm="6" md="4">
            <v-text-field
              type="number"
              label="Thyroid"
              required
              filled
              dense
              :rules="thyroidRules"
              v-model.trim="medicalInfo.thyroid"
            />
          </v-col>
          <v-col class="form-group" cols="12" sm="6" md="4">
            <v-text-field
              type="number"
              filled
              dense
              label="Obesity"
              required
              :rules="obesityRules"
              v-model.trim="medicalInfo.obesity"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <div class="mt-2 mb-2 text-left">
        <v-btn
          :disabled="!valid"
          color="warning"
          @click="updateUser"
          class="mr-2 h-auto px-10 py-4"
        >
          Update Patient
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import PageHeader from "@/layouts/PageHeader.vue";
import axios from "axios";
import moment from "moment";
import doctors from "../../api/doctor";

export default {
  name: "EditUser",
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
        (v) => (v && v.length == 10) || "type valid phone number",
        (v) => (v && v.length > 9) || "type valid phone number",
        (v) => (v && v.length < 11) || "type valid phone number",
      ],
      emergencyPhoneRules: [
        (v) => !!v || "Phone Number is required",
        (v) => (v && v.length == 10) || "type valid phone number",
        (v) => (v && v.length > 9) || "type valid phone number",
        (v) => (v && v.length < 11) || "type valid phone number",
      ],
      addressRules: [(v) => !!v || "Address is required"],
      aadharRules: [
        (v) => !!v || "Aadhar Number is required",
        (v) =>
          /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/.test(v) ||
          "Aadhar Number is invalid",
      ],
      weightRules: [(v) => !!v || "Weight is required"],
      heightRules: [(v) => !!v || "Height is required"],
      gstNoRules: [(v) => !!v || "GST Number is required"],
      memberNameRules: [(v) => !!v || "Member name is required"],
      memberRelationRules: [(v) => !!v || "Member Relation is required."],
      bloodPressureRules: [(v) => !!v || "Blood Pressure is required"],
      diabeticsRules: [(v) => !!v || "diabetics is required"],
      thyroidRules: [(v) => !!v || "thyroid is required"],
      obesityRules: [(v) => !!v || "obesity is required"],
      heartConditionRules: [(v) => !!v || "Must enter Heart Condition"],
      relations: ["Son", "Daughter", "Mother", "Father"],
      heartCondition: ["Normal"],
      dateMenu: false,
      dateValue: null,
      loading: false,
      userPhoneNumber: "",
      userEmergencyPhone: "",
      isValidPhoneNumber: false,
      isValidEmergencyNumber: false,
      isValidRelativePhoneNumber: false,
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
    };
  },
  async mounted() {
    this.loading = true;
    const res = await doctors.getSinglePatientData(this.$route?.params?.id);
    this.user = res.data.data[0];
    this.userPhoneNumber = this.user?.mobile_no.toString();
    this.userEmergencyPhone = this.user?.emergencyPhone.toString();
    let dateOfBirth = res.data.data[0].DOB;
    let formattedDate = moment(dateOfBirth).format("YYYY-MM-DD");
    this.dob = formattedDate;
    this.loading = false;
  },
  methods: {
    phoneNumberChanged(e) {
      this.isValidPhoneNumber = e?.valid;
    },
    emergencyPhoneChanged(e) {
      this.isValidEmergencyNumber = e?.valid;
    },
    relativePhoneChanged(e) {
      this.isValidRelativePhoneNumber = e?.valid;
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
      for (let i = 0; i < this.user?.family_members.length; i++) {
        if (
          this.user.family_members[i].name === "" ||
          this.user.family_members[i].selectedRelation === "" ||
          this.user.family_members[i].contactNo === null
        ) {
          this.valid = false;
          break;
        }
        this.valid = true;
      }
    },
    async updateUser() {
      this.$refs.form.validate();
      const checkEmptyFamilyMemberInfo = this.checkEmptyFamilyMemberInfo();
      console.log("val--", checkEmptyFamilyMemberInfo);
      if (this.valid) {
        if (
          !this.isValidPhoneNumber ||
          !this.isValidEmergencyNumber ||
          !this.isValidRelativePhoneNumber
        ) {
          this.$toast.error("Please enter valid mobile number.", {
            timeout: 3000,
          });
        } else {
          const res = await axios.patch(
            `https://api.accu.live/api/v1/users/updateuser/${this.user.userId}`,
            this.user
          );
          if (res.status === 200) {
            this.$router.push({ path: "/patients" });
            this.$toast.success("User Updated successfully.", {
              timeout: 3000,
            });
          }
        }
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
  components: { PageHeader },
};
</script>

<style scoped>
.row + .row {
  margin-top: 0;
}
.main__svg {
  cursor: pointer;
}
</style>
