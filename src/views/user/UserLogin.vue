<template>
  <v-app
    class="overflow-hidden"
    style="
      background: #171617
        radial-gradient(closest-side at 34% 48%, #313131 0%, #171617 100%) 0% 0%
        no-repeat padding-box;
    "
  >
    <v-main>
      <v-container class="fill-height mt-3" fluid>
        <v-row class="white--text">
          <v-col cols="12" sm="6" md="4" class="ml-0 ml-md-10">
            <v-img
              v-if="$vuetify.breakpoint.mdAndUp"
              class="ml-auto"
              src="@/assets/arrow1.svg"
              height="100"
              width="100"
              contain
            ></v-img>

            <div class="text-start mt-n5">
              <v-flex d-flex md10>
                <h1>Sneak Peek Into Health</h1>
              </v-flex>
              <v-flex md8>
                <p class="mt-5 ml-2 ml-sm-0">
                  Get access to essential health data that aids in taking
                  crucial decisions for life. Track vital information in a
                  graphical view and hasten the next step.
                </p>
              </v-flex>
              <v-row class="mt-5 ml-2 ml-sm-0 ml-md-0">
                <v-col class="ml-n5">
                  <v-img
                    src="@/assets/Rectangle 112.svg"
                    contain
                    height="100"
                    width="100"
                  >
                    <v-img
                      src="@/assets/Heart hand.png"
                      height="100"
                      width="100"
                      contain
                    ></v-img>
                  </v-img>
                </v-col>
                <v-col class="ml-n15">
                  <v-img
                    src="@/assets/Rectangle 112.svg"
                    contain
                    height="100"
                    width="100"
                  >
                    <v-img
                      src="@/assets/Heart hand1.png"
                      height="100"
                      width="100"
                      contain
                    ></v-img>
                  </v-img>
                </v-col>
                <v-col class="ml-n15">
                  <v-img
                    src="@/assets/Rectangle 112.svg"
                    contain
                    height="100"
                    width="100"
                  >
                    <v-img
                      src="@/assets/watch.png"
                      height="100"
                      width="100"
                      contain
                    ></v-img>
                  </v-img>
                </v-col>
              </v-row>
            </div>
          </v-col>

          <v-col cols="12" sm="6" md="4" v-if="!$vuetify.breakpoint.smAndDown">
            <v-img src="@/assets/login-bg.svg" height="800" width="700" contain>
              <v-img
                src="@/assets/Mask Group 7.png"
                height="900"
                width="900"
                contain
                class="ml-8"
              ></v-img>
            </v-img>
          </v-col>

          <v-col cols="12" sm="6" md="3" class="ml-0 ml-md-15 mb-5 mb-md-2">
            <v-img
              src="@/assets/mobile-screen.svg"
              style="
                border-radius: 50px;
                box-shadow: inset 0px 3px 99px #020203;
              "
              height="900"
              width="600"
            >
              <v-img
                class="ml-auto mr-auto"
                src="@/assets/acculive-main.svg"
                height="200"
                width="300"
                contain
              ></v-img>

              <div class="white--text">
                <h2>Welcome Back!</h2>
                <p class="mt-5" style="font-size: 20px">
                  Login into your account
                </p>

                <form class="mt-4" ref="form" @submit.prevent="login">
                  <v-text-field
                    class="mt-15"
                    dark
                    type="email"
                    v-model.trim="email"
                    name="email"
                    placeholder="Email"
                    required
                    filled
                    :rules="emailRules"
                    background-color="#2b2934"
                  ></v-text-field>

                  <v-text-field
                    class="mt-5"
                    dark
                    :append-icon="showPassIcon ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassIcon ? 'text' : 'password'"
                    v-model.trim="password"
                    name="password"
                    placeholder="Password"
                    hint="At least 6 characters"
                    required
                    filled
                    @click:append="showPassIcon = !showPassIcon"
                    :rules="passwordRules"
                    background-color="#2b2934"
                  ></v-text-field>

                  <v-btn
                    class="mt-5"
                    color="warning"
                    type="submit"
                    width="83%"
                    large
                    :disabled="isLoading"
                    >Login</v-btn
                  >
                </form>
                <h5 class="mt-16">
                  © Copyright 2022 Bacancy. All Right Reserved.
                </h5>
              </div>
            </v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
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
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "password must be at least 6 characters",
      ],
      errorMessage: "",
      showPassIcon: false,
      isLoading: false,
    };
  },
  methods: {
    ...mapActions("users", ["loginUser"]),
    login() {
      this.isLoading = true;
      const data = {
        email: this.email,
        password: this.password,
      };
      this.loginUser(data)
        .then((success) => {
          console.log(success);
          this.isLoading = false;
          this.$router.push({ path: "/" });
          this.$toast.success("Login successful", { timeout: 3000 });
        })
        .catch((err) => {
          this.isLoading = false;
          this.$toast.error("Invalid Credentials", { timeout: 3000 });
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
p {
  font-size: 16px;
}
h1 {
  font-size: 69px;
  font: normal normal 900 60px/88px Gilroy;
  text-align: left;
}
h2 {
  font-size: 36px;
}
h5 {
  font: normal normal medium 16px/19px Gilroy;
}
.v-text-field {
  width: 83%;
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
}
</style>
