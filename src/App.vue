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
#app {
  /*font-family: Gilroy, Helvetica, Arial, sans-serif;*/
  /*font-family: "Roboto Condensed", sans-serif;*/
  /*font-family: "Poppins", sans-serif;*/
  font-family: "Gilroy";
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
