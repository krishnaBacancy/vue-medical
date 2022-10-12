<template>
  <v-container>
    <div>
      <h1>Add</h1>
    </div>
    <v-card style="padding: 10px">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="fname"
          :rules="nameRules"
          hint="At least 3 characters"
          label="FirstName"
          type="text"
          required
        ></v-text-field>

        <v-text-field
          v-model="lname"
          :rules="nameRules"
          hint="At least 3 characters"
          label="LastName"
          type="text"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          type="email"
          required
        ></v-text-field>

        <v-text-field
          :append-icon="showPassIcon ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassIcon ? 'text' : 'password'"
          v-model="password"
          name="password"
          label="Password"
          hint="At least 6 characters"
          required
          @click:append="showPassIcon = !showPassIcon"
        ></v-text-field>

        <v-text-field
          v-model="phone"
          :rules="phoneRules"
          label="Phone Number"
          type="number"
          required
        ></v-text-field>

        <v-textarea
          v-model="address"
          auto-grow
          label="Address"
          rows="1"
        ></v-textarea>

        <v-text-field
          v-model="gstNo"
          :rules="gstNoRules"
          label="GST Number"
          type="text"
          required
        ></v-text-field>

        <v-text-field
          v-model="aadhar"
          :rules="aadharRules"
          label="Aadhar Card Number"
          type="text"
          required
        ></v-text-field>

        <v-radio-group v-model="gender">
          <template v-slot:label>
            <div><strong>Gender</strong></div>
          </template>
          <v-radio value="male">
            <template v-slot:label>
              <div>Male</div>
            </template>
          </v-radio>
          <v-radio value="female">
            <template v-slot:label>
              <div>Female</div>
            </template>
          </v-radio>
        </v-radio-group>

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

        <v-checkbox
          v-model="checkbox"
          :rules="[(v) => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Add
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

        <v-btn color="warning" @click="resetValidation">
          Reset Validation
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddUser",
  data() {
    return {
      valid: true,
      fname: "",
      lname: "",
      nameRules: [(v) => !!v || "Name is required"],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      password: "",
      showPassIcon: false,
      phone: null,
      phoneRules: [
        (v) => (v && v.length <= 11) || "type valid phone number",
        (v) => (v && v.length >= 8) || "type valid phone number",
      ],
      address: "",
      gstNo: "",
      gstNoRules: [(v) => !!v || "GST Number is required"],
      aadhar: "",
      aadharRules: [(v) => !!v || "Aadhar Number is required"],
      checkbox: false,
      dateMenu: false,
      dateValue: null,
      gender: "male",
    };
  },
  methods: {
    ...mapActions("userManagement", ["addUser"]),
    validate() {
      let data = {
        first_Name: this.fname,
        last_Name: this.lname,
        email: this.email,
        password: this.password,
        mobile_no: this.phone,
        Address: this.address,
        aadharcard: this.aadhar,
        gender: this.gender,
        DOB: this.dateValue,
      };
      this.$refs.form.validate();
      if (this.valid) {
        this.addUser(data)
          .then((success) => {
            console.log(success);
            this.$router.push({ path: "/user-management" });
            this.$toast.success("User Added successfully.", { timeout: 3000 });
          })
          .catch((err) => console.log(err));
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
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

<style></style>
