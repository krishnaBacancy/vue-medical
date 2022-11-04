<template>
  <v-app>
    <v-app-bar app color="grey" class="white--text">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="white--text"
      ></v-app-bar-nav-icon>
      <v-toolbar-title @click="$router.push('/')" style="cursor: pointer">
        <v-img
          src="https://accu.live/images/logo.svg"
          @click="$router.push('/')"
          height="30"
          style="cursor: pointer"
          contain
        >
        </v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="success" @click="$router.push('/login')" v-if="!getUserId">
        Login
      </v-btn>
      <v-btn class="warning" @click="logOut" v-else> Logout </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 mb-4 mt-4">
            <v-img
              src="https://accu.live/images/logo.svg"
              @click="$router.push('/')"
              height="30"
              style="cursor: pointer"
              contain
            >
            </v-img>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item link v-for="item in items" :key="item.title">
          <div class="item__container" @click="$router.push(item.link)">
            <v-list-item-icon style="margin-left: 40px">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </div>
        </v-list-item>

        <v-list-item link v-if="getRole !== 'Customer'">
          <div
            class="item__container"
            @click="$router.push('/user-management')"
          >
            <v-list-item-icon style="margin-left: 44px">
              <v-icon>mdi-account-box</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>User Management</v-list-item-title>
            </v-list-item-content>
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container
        class="grey lighten-4 pa-5"
        style="background-color: #212529"
        fluid
      >
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      drawer: false,
      getUserId: localStorage.getItem("user_id"),
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", link: "/" },
        { title: "Patients", icon: "mdi-account-injury", link: "/patients" },
        { title: "Settings", icon: "mdi-cog-outline", link: "/settings" },
      ],
    };
  },
  computed: {
    ...mapState("users", ["user"]),
    ...mapGetters("users", ["isLoggedIn", "getRole"]),
  },
  methods: {
    ...mapActions("users", ["logoutUser"]),
    logOut() {
      this.logoutUser();
      this.$router.push("/login");
      this.$toast.success("Logout successful", { timeout: 3000 });
    },
  },
};
</script>

<style scoped>
.item__container {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
}
</style>
