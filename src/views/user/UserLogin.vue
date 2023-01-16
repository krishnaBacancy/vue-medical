<template>
  <v-app class="overflow-hidden" style="background: #eee">
    <v-main>
      <v-container class="fill-height pt-0 pb-0" fluid>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            class="d-flex flex-column align-items-center login-left-block"
          >
            <img
              v-if="$vuetify.breakpoint.mdAndUp"
              class="ml-auto"
              src="@/assets/arrow1.svg"
              height="100"
              width="100"
              contain
            />
            <div class="text-start mt-n5 mb-15">
              <v-flex d-flex md10>
                <h1>
                  Sneak Peek <br />
                  Into Health
                </h1>
              </v-flex>
              <v-flex md12>
                <p class="mt-5 ml-2 ml-sm-0">
                  Get access to essential health data that aids in taking
                  crucial decisions for life. Track vital information in a
                  graphical view and hasten the next step.
                </p>
              </v-flex>
              <div class="box-item-row">
                <div class="mini-box-item">
                  <div class="item">
                    <v-img
                      src="@/assets/Heart hand.png"
                      class="item-img"
                      contain
                    ></v-img>
                  </div>
                </div>
                <div class="mini-box-item">
                  <div class="item">
                    <v-img
                      src="@/assets/Heart hand1.png"
                      class="item-img"
                      contain
                    ></v-img>
                  </div>
                </div>
                <div class="mini-box-item">
                  <div class="item">
                    <v-img
                      src="@/assets/watch.png"
                      class="item-img"
                      contain
                    ></v-img>
                  </div>
                </div>
              </div>
            </div>
            <img
              v-if="$vuetify.breakpoint.mdAndUp"
              class="mr-auto mt-auto mb-n1 ml-n10 building-image"
              src="@/assets/login-building.png"
              width="320"
              contain
            />
          </v-col>
          <v-col
            v-if="!$vuetify.breakpoint.smAndDown"
            class="pa-0 login-center-block"
          >
            <img
              src="@/assets/Mask Group 7.png"
              width="100%"
              contain
              top
              class="ml-8"
            />
          </v-col>

          <v-col class="d-flex flex-column mx-auto login-right-block">
            <div class="login--box">
              <img src="@/assets/logo-black.png" contain class="logo-img" />
              <div class="inner-block">
                <h2>Welcome Back!</h2>
                <p class="mt-5" style="font-size: 20px">
                  Login into your account
                </p>

                <form class="mt-4" ref="form" @submit.prevent="login">
                  <v-text-field
                    type="email"
                    v-model="email"
                    :append-icon="'mdi-account'"
                    name="email"
                    placeholder="Email"
                    required
                    filled
                    :rules="emailRules"
                  ></v-text-field>

                  <v-text-field
                    class="mt-2"
                    :append-icon="showPassIcon ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassIcon ? 'text' : 'password'"
                    v-model="password"
                    name="password"
                    placeholder="Password"
                    hint="At least 6 characters"
                    required
                    filled
                    @click:append="showPassIcon = !showPassIcon"
                    :rules="passwordRules"
                  ></v-text-field>

                  <v-btn
                    class="mt-2"
                    color="warning"
                    type="submit"
                    width="100%"
                    large
                    >Login</v-btn
                  >
                </form>
              </div>
              <h5 class="font-weight-regular">
                © Copyright 2022 Bacancy. All Right Reserved.
              </h5>
            </div>
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
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
}
.box-item-row {
  display: flex;
  margin-left: -4%;
  margin-right: -4%;
}
.mini-box-item {
  padding-left: 4%;
  padding-right: 4%;
  flex-grow: 0;
  width: 33.33%;
  max-width: 200px;
}
.mini-box-item .item {
  padding: 12%;
  background-color: #eee;
  border: 1px solid #c1bebe;
  border-radius: 30%;
}
.container.fill-height {
  align-items: stretch;
}
.login-left-block {
  padding-top: 100px;
  padding-left: 50px;
}
.building-image {
  width: 40%;
  max-width: 320px;
}
.login--box {
  background-color: #fff;
  border: 1px solid #e9e9e9;
  box-shadow: 0px 8px 12px #00000014;
  padding: 60px 40px;
  border-radius: 50px;
  margin: 50px auto;
  width: 90%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.inner-block {
  margin-top: auto;
  padding: 20px 0;
  margin-bottom: auto;
}

p {
  font-size: 18px;
}
.logo-img {
  height: 40px;
  object-fit: contain;
}

@media (max-width: 1400px) {
  h1 {
    font-size: 52px;
  }
  .login--box {
    max-width: 500px;
  }
}
</style>
