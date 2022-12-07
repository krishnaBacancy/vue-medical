<template>
  <v-app class="overflow-hidden">
    <v-main>
      <v-container class="fill-height mt-3" fluid>
        <v-row class="white--text">
          <v-col cols="12" sm="6" md="4" class="ml-10">
            <v-img
              class="ml-auto"
              src="@/assets/arrow1.svg"
              height="100"
              width="100"
              contain
            ></v-img>

            <div class="text-start mt-n5">
              <v-flex d-flex md12>
                <h1>Sneak Peek Into Health</h1>
              </v-flex>
              <v-flex d-flex md8>
                <p class="mt-5">
                  Get access to essential health data that aids in taking
                  crucial decisions for life. Track vital information in a
                  graphical view and hasten the next step.
                </p>
              </v-flex>
              <v-row class="mt-5">
                <v-col>
                  <v-img
                    src="@/assets/Rectangle 112.svg"
                    contain
                    height="80"
                    width="80"
                  >
                    <v-img
                      src="@/assets/Heart hand.png"
                      height="80"
                      width="80"
                      contain
                    ></v-img>
                  </v-img>
                </v-col>
                <v-col class="ml-n10">
                  <v-img
                    src="@/assets/Rectangle 112.svg"
                    contain
                    height="80"
                    width="80"
                  >
                    <v-img
                      src="@/assets/Heart hand1.png"
                      height="80"
                      width="80"
                      contain
                    ></v-img>
                  </v-img>
                </v-col>
                <v-col class="ml-n10">
                  <v-img
                    src="@/assets/Rectangle 112.svg"
                    contain
                    height="80"
                    width="80"
                  >
                    <v-img
                      src="@/assets/watch.png"
                      height="80"
                      width="80"
                      contain
                    ></v-img>
                  </v-img>
                </v-col>
              </v-row>
            </div>
          </v-col>

          <v-col cols="12" sm="6" md="3" v-if="!$vuetify.breakpoint.smAndDown">
            <v-img src="@/assets/login-bg.svg" height="700" width="700" contain>
              <v-img
                src="@/assets/Mask Group 7.png"
                height="700"
                width="700"
                contain
              ></v-img>
            </v-img>
          </v-col>

          <v-col cols="12" sm="6" md="4" class="ml-10">
            <v-img src="@/assets/mobile-screen.svg" height="700" width="600">
              <v-img
                class="ml-auto mr-auto"
                src="@/assets/acculive-main.svg"
                height="200"
                width="300"
                contain
              ></v-img>

              <div class="white--text">
                <h2>Welcome Back!</h2>
                <p class="mt-5">Login into your account</p>

                <form class="mt-4" ref="form" @submit.prevent="login">
                  <v-text-field
                    class="mt-15"
                    type="email"
                    v-model="email"
                    name="email"
                    placeholder="Email"
                    required
                    filled
                    dense
                    :rules="emailRules"
                    background-color="white"
                  ></v-text-field>

                  <v-text-field
                    class="mt-5"
                    :append-icon="showPassIcon ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassIcon ? 'text' : 'password'"
                    v-model="password"
                    name="password"
                    placeholder="Password"
                    hint="At least 6 characters"
                    dense
                    required
                    filled
                    @click:append="showPassIcon = !showPassIcon"
                    :rules="passwordRules"
                    background-color="white"
                  ></v-text-field>

                  <v-btn
                    class="mt-5"
                    color="warning"
                    type="submit"
                    width="83%"
                    large
                    >Login</v-btn
                  >
                </form>
                <h5 class="mt-10">
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
      stateObj: {
        login: {
          name: "Login",
          message: "Register",
        },
      },
    };
  },
  methods: {
    ...mapActions("users", ["loginUser"]),
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
p {
  font-size: 18px;
}
h1 {
  font-size: 69px;
}
h2 {
  font-size: 36px;
}
.v-text-field {
  width: 400px;
  margin-left: auto;
  margin-right: auto;
}
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
