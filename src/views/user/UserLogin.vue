<template>
  <v-app>
    <v-main>
      <v-container class="fill-height mt-3" fluid>
        <v-row justify="center">
          <v-col cols="12" sm="8" md="8" lg="10">
            <v-card class="elevation-12">
              <v-row>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <v-flex
                      d-flex
                      xs12
                      sm12
                      md12
                      lg12
                      style="align-items: flex-start"
                      class="ml-lg-16"
                    >
                      <h1
                        class="display-2 h1__div text-sm-h4 text-lg-h3 teal--text text--accent-3"
                        style="text-align: start"
                      >
                        Sneak Peek Into Health
                      </h1>
                      <!-- <v-img
                        src="https://accu.live/images/app-logo.svg"
                        height="50"
                        contain
                      >
                      </v-img> -->
                      <!-- <h1 class="display-2 teal--text text--accent-3">IVE</h1> -->
                    </v-flex>
                    <h5 class="text-center mt-3 teal--text">
                      Login into your account
                    </h5>
                    <form class="mt-4" ref="form" @submit.prevent="login">
                      <v-text-field
                        prepend-icon="mdi-email"
                        v-model="email"
                        name="email"
                        label="Email"
                        type="email"
                        :rules="emailRules"
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
                      <div class="text-center mt-3 mb-3">
                        <v-btn rounded color="teal accent-3" type="submit" dark
                          >SIGN IN</v-btn
                        >
                      </div>
                    </form>
                  </v-card-text>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                  class="accent-3 mt-sm-3 mt-md-0"
                  style="background-color: #2c3e50"
                >
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1 text-lg-h3 text-md-h5">
                      Welcome
                    </h1>
                    <h5 class="text-center mt-4 text-body-2">
                      Get access to essential health data that aids in taking
                      crucial decisions for life. Track vital information in a
                      graphical view and hasten the next step.
                    </h5>
                  </v-card-text>
                  <h5 class="white--text mt-4">
                    © Copyright 2022 Bacancy. All Right Reserved.
                  </h5>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
  <!-- <v-app>
    <v-main>
      <v-container fluid grid-list-md class="mt-10">
        <v-layout row wrap>
          <v-flex>
            <div class="d-flex white--text align-center justify-center">
              <div
                class="d-sm-flex flex-column d-none"
                style="width: 30%; background-color"
              >
                <v-flex d-flex xs12 sm10 md8 lg8>
                  <h2 style="text-align: start">Sneak Peek Into Health</h2>
                </v-flex>
                <v-flex d-flex xs12 sm10 md8>
                  <p style="text-align: start">
                    Get access to essential health data that aids in taking
                    crucial decisions for life. Track vital information in a
                    graphical view and hasten the next step.
                  </p>
                </v-flex>

                <div class="d-flex" style="background-color: green">
                  <div class="">
                    <v-img
                      src="https://accu.live/images/Heart-hand.png"
                      contain
                      height="100"
                    ></v-img>
                  </div>
                  <div class="ml-2">
                    <v-img
                      src="https://accu.live/images/Shild.png"
                      contain
                      height="100"
                    ></v-img>
                  </div>
                  <div class="ml-2">
                    <v-img
                      src="https://accu.live/images/watch.png"
                      contain
                      height="100"
                    ></v-img>
                  </div>
                </div>
              </div>

              <div class="d-md-none d-lg-flex d-sm-none d-xs-flex second__div">
                <v-flex d-flex xs12 sm12 md6 lg6>
                  <v-img
                    src="https://accu.live/images/Fan.png"
                    contain
                    height="300"
                  ></v-img>
                </v-flex>
              </div>

              <div style="width: 30%">
                <v-flex d-flex xs12 sm12 md6 lg6>
                  <v-img
                    src="https://accu.live/images/Fan.png"
                    contain
                    height="300"
                  ></v-img>
                </v-flex>
              </div>
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
                      :rules="emailRules"
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

                    <div class="red--text">{{ errorMessage }}</div>
                    <v-btn
                      type="submit"
                      class="mt-4"
                      color="primary"
                      value="log in"
                      >{{ stateObj.login.name }}</v-btn
                    >
                  </form>
                </v-card-text>
              </v-card>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app> -->
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
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      errorMessage: "",
      showPassIcon: false,
      stateObj: {
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
        .catch((err) => {
          this.$toast.error("Invalid Credentials", { timeout: 3000 });
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
@media all and (max-width: 600px) {
  .second__div {
    width: 30%;
    align-items: flex-start;
  }
  .h1__div {
    font-size: 7px;
  }
}
</style>
