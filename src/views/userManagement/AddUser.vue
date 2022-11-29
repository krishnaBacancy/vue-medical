<template>
  <div>
    <PageHeader
      title="Add User"
      pageIcon="mdi-account-plus"
      btnName="Back"
      color-name="warning"
      btnIconName="mdi-arrow-left"
      @addNewPatient="$router.go(-1)"
    />
    <br />
    <v-container
      fluid
      grid-list-md
      style="background-color: rgba(0, 0, 0, 0.3)"
    >
      <v-layout row wrap>
        <v-flex d-flex xs12 sm12 md12>
          <v-card
            style="width: 100%"
            dark
            color="rgba(0, 0, 0, 0.3)"
            class="mt-2 mb-2 pa-5 white--text"
          >
            <v-card-title class="warning--text text-h5 ml-n2 mb-2"
              >User Info</v-card-title
            >
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col class="d-flex ml-auto mr-auto" cols="12" sm="6">
                  <v-select
                    :items="items"
                    filled
                    label="Select User"
                    :rules="selectRules"
                    v-model="selected"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <CustomTextField
                    :type="'text'"
                    :label="'First Name'"
                    :fieldRules="nameRules"
                    v-model="user.fname"
                  />
                </v-col>

                <v-col cols="12" sm="6">
                  <CustomTextField
                    :type="'text'"
                    :label="'Last Name'"
                    :fieldRules="nameRules"
                    v-model="user.lname"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <CustomTextField
                    :type="'email'"
                    :label="'Email'"
                    :fieldRules="emailRules"
                    v-model="user.email"
                  />
                </v-col>

                <v-col cols="12" sm="6">
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
              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <CustomTextField
                    :type="'number'"
                    :label="'Phone'"
                    :fieldRules="phoneRules"
                    v-model="user.phone"
                  />
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
                    v-model="user.address"
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
                  <CustomTextField
                    :type="'text'"
                    :label="'Aadhar Card Number'"
                    :fieldRules="aadharRules"
                    v-model="user.aadhar"
                  />
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
                <v-col cols="12" sm="6">
                  <CustomTextField
                    :type="'text'"
                    :label="'GST Number'"
                    :fieldRules="gstNoRules"
                    v-model="user.gstNo"
                  />
                </v-col>
              </v-row>

              <v-checkbox
                v-model="checkbox"
                :rules="[(v) => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
                class="mt-n1"
              ></v-checkbox>

              <v-row class="mt-2 mb-2">
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="ml-3"
                  @click="validate"
                  width="48%"
                >
                  Add User
                </v-btn>

                <v-btn color="error" class="ml-5" width="48%" @click="reset">
                  Reset Form
                </v-btn>
              </v-row>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import CustomTextField from "@/components/CustomTextField.vue";
import PageHeader from "@/layouts/PageHeader.vue";
import { mapActions } from "vuex";

export default {
  name: "AddUser",
  data() {
    return {
      valid: true,
      items: ["Admin", "Doctor", "Customer"],
      user: {
        fname: "",
        lname: "",
        email: "",
        password: "",
        phone: null,
        gender: "male",
        address: "",
        gstNo: "",
        aadhar: "",
      },
      selected: "",
      selectRules: [(v) => !!v || "Must select a user."],
      nameRules: [(v) => !!v || "Name is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      showPassIcon: false,
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "password must be at least 6 characters",
      ],
      phoneRules: [
        (v) => (v && v.length <= 11) || "type valid phone number",
        (v) => (v && v.length >= 8) || "type valid phone number",
      ],
      gstNoRules: [(v) => !!v || "GST Number is required"],
      aadharRules: [(v) => !!v || "Aadhar Number is required"],
      checkbox: false,
      dateMenu: false,
      dateValue: null,
    };
  },
  methods: {
    ...mapActions("userManagement", ["addUser"]),
    validate() {
      let data = {
        first_Name: this.user.fname,
        last_Name: this.user.lname,
        email: this.user.email,
        password: this.user.password,
        mobile_no: this.user.phone,
        Address: this.user.address,
        aadharcard: this.user.aadhar,
        gender: this.user.gender,
        DOB: this.dateValue,
        role: this.selected,
      };
      this.$refs.form.validate();
      if (this.valid) {
        this.addUser(data)
          .then((success) => {
            console.log(success);
            this.$router.push({ path: "/patients" });
            this.$toast.success("User Added successfully.", { timeout: 3000 });
          })
          .catch((err) => {
            console.log(err);
            this.$toast.error("some error occured.", { timeout: 3000 });
          });
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
  components: { PageHeader, CustomTextField },
};
</script>

<style scoped></style>
