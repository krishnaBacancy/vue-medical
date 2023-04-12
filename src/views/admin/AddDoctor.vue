<template>
  <div>
    <PageHeader
      title="Add New Doctor"
      pageIcon="mdi-arrow-left"
      @goBack="$router.go(-1)"
    />
    <br />
    <div>
      <h5 class="text-left warning--text text-h5 mb-4 font-weight-bold">
        Doctor Info
      </h5>
      <div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col class="form-group" cols="12" sm="4" md="4">
              <CustomTextField
                :type="'text'"
                :label="'Doctor First Name'"
                :fieldRules="nameRules"
                v-model.trim="doctor.fname"
              />
            </v-col>
            <v-col class="form-group" cols="12" sm="4" md="4">
              <CustomTextField
                :type="'text'"
                :label="'Doctor Last Name'"
                :fieldRules="nameRules"
                v-model.trim="doctor.lname"
              />
            </v-col>
            <v-col class="form-group" cols="12" sm="4" md="4">
              <CustomTextField
                :type="'email'"
                :label="'Email Address'"
                :fieldRules="emailRules"
                v-model.trim="doctor.email"
              />
            </v-col>
            <v-col class="form-group" cols="12" sm="6" md="4">
              <vue-tel-input
                v-model.trim="doctor.phone"
                v-bind="phoneProps"
                @validate="phoneNumberChanged"
              ></vue-tel-input>
            </v-col>
            <v-col class="form-group" cols="12" sm="6" md="4">
              <vue-tel-input
                v-model.trim="doctor.emergencyPhone"
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
              <v-radio-group v-model="doctor.gender" row>
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
              <v-text-field
                :append-icon="showPassIcon ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassIcon ? 'text' : 'password'"
                v-model.trim="doctor.password"
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
            <v-col class="form-group" cols="12" sm="12" md="4">
              <CustomTextField
                :type="'text'"
                :label="'Address'"
                :fieldRules="addressRules"
                v-model.trim="doctor.address"
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
              @click="addDoctor"
              >Add Doctor</v-btn
            >
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import CustomTextField from "@/components/CustomTextField.vue";
import PageHeader from "@/layouts/PageHeader.vue";
import { mapActions } from "vuex";

export default {
  name: "AddDoctor",
  data() {
    return {
      valid: true,
      showPassIcon: false,
      dateMenu: false,
      dateValue: null,
      nameRules: [(v) => !!v || "Name is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      phoneRules: [
        (v) => (v && v.length <= 11) || "type valid phone number",
        (v) => (v && v.length >= 8) || "type valid phone number",
      ],
      addressRules: [(v) => !!v || "Address is required"],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "password must be at least 6 characters",
      ],
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
      isValidPhoneNumber: false,
      isValidEmergencyPhoneNumber: false,
      doctor: {
        fname: "",
        lname: "",
        email: "",
        phone: null,
        emergencyPhone: null,
        gender: "male",
        password: "",
        address: "",
      },
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
    focusDate() {
      setTimeout(() => {
        if (!this.dateMenu) {
          this.dateMenu = true;
        }
      }, 200);
    },
    reset() {
      this.$refs.form.reset();
    },
    addDoctor() {
      let data = {
        first_Name: this.doctor.fname,
        last_Name: this.doctor.lname,
        email: this.doctor.email,
        mobile_no: this.doctor.phone.replaceAll(" ", ""),
        emergencyPhone: this.doctor.emergencyPhone.replaceAll(" ", ""),
        gender: this.doctor.gender,
        Address: this.doctor.address,
        password: this.doctor.password,
        DOB: this.dateValue,
        roleId: "6315a97a6c61cf0468d1e899",
      };
      this.$refs.form.validate();
      if (this.valid) {
        if (!this.dateValue) {
          this.$toast.error("Must select date of birth.", {
            timeout: 3000,
          });
        }
        if (!this.isValidEmergencyPhoneNumber) {
          this.$toast.error("Please enter valid emergency phone number.", {
            timeout: 3000,
          });
        } else {
          this.addUser(data)
            .then((success) => {
              console.log(success);
              this.$router.push({ path: "/doctors" });
              this.$toast.success("Doctor Added successfully.", {
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
  },
  components: { PageHeader, CustomTextField },
};
</script>

<style scoped></style>
