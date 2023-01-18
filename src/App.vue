<template>
  <v-app>
    <SideBar v-if="$route.path !== '/login'" />
    <UserLogin v-if="$route.path === '/login'" />
  </v-app>
</template>

<script>
import SideBar from "./layouts/SideBar.vue";
import UserLogin from "./views/user/UserLogin.vue";
export default {
  name: "App",
  components: {
    SideBar,
    UserLogin,
  },
};
</script>

<style>
@font-face {
  font-family: "Gilroy";
  src: url("assets/fonts/Gilroy-Light.ttf") format("truetype");
  font-weight: 100;
}

@font-face {
  font-family: "Gilroy";
  src: url("assets/fonts/Gilroy-Regular.ttf") format("truetype");
  font-weight: 300;
}

@font-face {
  font-family: "Gilroy";
  src: url("assets/fonts/Gilroy-Medium.ttf") format("truetype");
  font-weight: 400;
}

@font-face {
  font-family: "Gilroy";
  src: url("assets/fonts/Gilroy-Bold.ttf") format("truetype");
  font-weight: 500;
}

@font-face {
  font-family: "Gilroy";
  src: url("assets/fonts/Gilroy-ExtraBold.ttf") format("truetype");
  font-weight: 600;
}

#app {
  font-family: "Gilroy";
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* background-color: cyan; */
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
img {
  max-width: 100%;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.v-input input {
  font-size: 18px;
}

.theme--light.v-text-field--filled > .v-input__control > .v-input__slot {
  background-color: #fff;
  border: 1px solid #e9e9e9;
  border-radius: 10px;
}

.v-text-field > .v-input__control > .v-input__slot:before,
.v-text-field > .v-input__control > .v-input__slot:after {
  display: none;
}
.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot,
.v-text-field.v-text-field--enclosed .v-text-field__details {
  padding: 0 20px;
}
.v-messages__message {
  font-size: 14px;
}
.v-btn:not(.v-btn--round).v-size--large {
  height: 50px;
}
.row {
  margin: 0px -15px;
}
.row > * {
  padding-left: 15px;
  padding-right: 15px;
}
</style>
