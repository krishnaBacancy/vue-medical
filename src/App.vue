<template>
  <v-app>
    <nav>
      <NavbarLayout />
    </nav>
    <v-container fluid class="grey lighten-5">
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import NavbarLayout from "./layouts/NavbarLayout.vue";
export default {
  name: "App",
  components: { NavbarLayout },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
