<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md8>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form ref="form" @submit.prevent="login">
                  <v-text-field
                    prepend-icon="mdi-email"
                    v-model="email"
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="email"
                    required
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="mdi-lock"
                    :append-icon="showPassIcon ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassIcon ? 'text' : 'password'"
                    v-model="password"
                    name="password"
                    label="Password"
                    hint="At least 6 characters"
                    placeholder="password"
                    required
                    @click:append="showPassIcon = !showPassIcon"
                  ></v-text-field>

                  <v-text-field
                    v-if="isRegister"
                    v-model="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="cocnfirm password"
                    required
                  ></v-text-field>
                  <div class="red--text">{{ errorMessage }}</div>
                  <v-btn
                    type="submit"
                    class="mt-4"
                    color="primary"
                    value="log in"
                    >{{
                      isRegister ? stateObj.register.name : stateObj.login.name
                    }}</v-btn
                  >
                </form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import user from "../../api/login";
export default {
  name: "UserLogin",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      isRegister: false,
      errorMessage: "",
      showPassIcon: false,
      stateObj: {
        register: {
          name: "Register",
          message: "Aleady have an Acoount? login.",
        },
        login: {
          name: "Login",
          message: "Register",
        },
      },
    };
  },
  computed: {
    ...mapGetters("users", ["isLoggedIn"]),
  },
  methods: {
    ...mapActions("users", ["loginUser"]),
    // async login() {
    //   const data = {
    //     email: this.email,
    //     password: this.password,
    //   };
    //   let res = await user.loginApi(data);
    //   if (res?.data?.data) {
    //     this.$router.push({ path: "/" });
    //   }
    // },
    login() {
      const data = {
        email: this.email,
        password: this.password,
      };
      this.loginUser(data)
        .then((success) => {
          console.log(success);
          this.$router.push({ path: "/" });
          this.$toast.success("Login successful", { timeout: 3000 });
        })
        .catch((err) => console.log(err));
    },
    register() {
      if (this.password == this.confirmPassword) {
        this.isRegister = false;
        this.errorMessage = "";
        this.$refs.form.reset();
      } else {
        this.errorMessage = "password did not match";
      }
    },
  },
};
</script>

<style scoped></style>
