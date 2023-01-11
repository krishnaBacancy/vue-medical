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
  src: url("assets/fonts/Gilroy-Heavy.ttf") format("truetype");
  font-weight: 600;
}

#app {
  font-family: "Gilroy";
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #282934;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
