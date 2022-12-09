<template>
  <v-app>
    <v-app-bar
      app
      dark
      class="white--text"
      v-if="$vuetify.breakpoint.smAndDown && !getRoute"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      app
      v-model="drawer"
      color="rgba(0,0,0,0.3)"
      width="10%"
      dark
      :style="{
        width: $vuetify.breakpoint.smAndDown ? '40%' : '8%',
        backgroundColor: $vuetify.breakpoint.smAndDown
          ? 'rgba(0,0,0,0.8)'
          : 'rgba(0,0,0,0.3)',
      }"
      :permanent="$vuetify.breakpoint.mdAndUp"
      v-if="!getRoute"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 mb-4 mt-4">
            <v-img
              src="@/assets/accuLive.svg"
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
        <v-list-item-group active-class="bg-active">
          <v-list-item class="list__item">
            <div class="item__container" @click="goToLink('/')">
              <v-list-item-icon style="margin-left: auto; margin-right: auto">
                <v-icon>mdi-view-dashboard</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Dashboard</v-list-item-title>
              </v-list-item-content>
            </div>
          </v-list-item>

          <v-list-item class="list__item" link>
            <div class="item__container" @click="goToLink('/patients')">
              <v-list-item-icon style="margin-left: auto; margin-right: auto">
                <v-img src="@/assets/patients.svg"></v-img>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Patients</v-list-item-title>
              </v-list-item-content>
            </div>
          </v-list-item>

          <v-list-item
            class="list__item"
            link
            v-if="role !== 'Customer' && role !== 'Admin'"
          >
            <div
              class="item__container"
              @click="$router.push('/user-management')"
            >
              <v-list-item-icon style="margin-left: auto; margin-right: auto">
                <!-- <v-icon>mdi-devices</v-icon> -->
                <v-img
                  src="@/assets/Device List.png"
                  contain
                  height="40"
                  width="50"
                ></v-img>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="mt-4">Device List</v-list-item-title>
              </v-list-item-content>
            </div>
          </v-list-item>

          <v-list-item class="list__item" link v-if="role === 'Admin'">
            <div class="item__container" @click="$router.push('/devices')">
              <v-list-item-icon style="margin-left: auto; margin-right: auto">
                <!-- <v-icon>mdi-devices</v-icon> -->
                <v-img
                  src="@/assets/Device List.png"
                  contain
                  height="40"
                  width="50"
                ></v-img>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="mt-4">Device List</v-list-item-title>
              </v-list-item-content>
            </div>
          </v-list-item>

          <v-list-item class="list__item" link v-if="role !== 'Customer'">
            <div class="item__container" @click="$router.push('/live-device')">
              <v-list-item-icon style="margin-left: auto; margin-right: auto">
                <!-- <v-icon>mdi-account-supervisor-circle</v-icon> -->
                <v-img
                  src="@/assets/Live Device.png"
                  contain
                  height="40"
                  width="50"
                ></v-img>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="mt-4">Live</v-list-item-title>
              </v-list-item-content>
            </div>
          </v-list-item>

          <v-list-item class="list__item" link>
            <div class="item__container" @click="goToLink('/settings')">
              <v-list-item-icon style="margin-left: auto; margin-right: auto">
                <v-icon>mdi-cog-outline</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item-content>
            </div>
          </v-list-item>

          <v-list-item class="list__item" link>
            <div class="item__container" @click="logOut">
              <v-list-item-icon style="margin-left: auto; margin-right: auto">
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </div>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main style="width: 97%; margin-left: auto; margin-right: auto">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      drawer: false,
      getUserId: localStorage.getItem("user_id"),
      role: localStorage.getItem("role"),
    };
  },
  computed: {
    ...mapState("users", ["user"]),
    getRoute() {
      if (this.$route.path === "/live-device") {
        return `expand-on-hover`;
      }
      return null;
    },
  },
  methods: {
    ...mapActions("users", ["logoutUser"]),
    logOut() {
      this.logoutUser();
      this.$router.push("/login");
      this.$toast.success("Logout successful", { timeout: 3000 });
    },
    goToLink(path) {
      this.$router.push(path);
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
.list__item:hover {
  background-color: green;
}
.bg-active {
  background-color: green;
  color: white !important;
}
</style>
