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
        width: $vuetify.breakpoint.smAndDown ? '30%' : '8%',
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

      <div class="sidebar">
        <nav>
          <!-- Move event here -->
          <ul class="ml-n5">
            <li>
              <router-link
                to="/"
                class="d-flex flex-column text-center justify-center align-center"
              >
                <v-icon class="icon__color">mdi-view-dashboard</v-icon>
                <span>Dashboard</span>
              </router-link>
            </li>

            <li v-if="role !== 'Admin'">
              <router-link
                to="/patients"
                class="d-flex flex-column text-center justify-center align-center"
              >
                <v-img src="@/assets/patients.svg" class="icon__color"></v-img>
                <span>Patients</span>
              </router-link>
            </li>

            <li v-if="role === 'Doctor'">
              <router-link
                to="/user-management"
                class="d-flex flex-column text-center justify-center align-center"
              >
                <v-img
                  src="@/assets/Device List.png"
                  height="40"
                  width="40"
                  contain
                  class="icon__color"
                ></v-img>
                <span>Device List</span>
              </router-link>
            </li>

            <li v-if="role === 'Admin'">
              <router-link
                to="/devices"
                class="d-flex flex-column text-center justify-center align-center"
              >
                <v-img
                  src="@/assets/Device List.png"
                  height="40"
                  width="40"
                  contain
                  class="icon__color"
                ></v-img>
                <span>Device List</span>
              </router-link>
            </li>

            <li v-if="role !== 'Admin'">
              <router-link
                to="/live-device"
                class="d-flex flex-column text-center justify-center align-center"
              >
                <v-img
                  src="@/assets/Live Device.png"
                  height="40"
                  width="40"
                  contain
                  class="icon__color"
                ></v-img>
                <span>Live</span>
              </router-link>
            </li>

            <li>
              <router-link
                to="/settings"
                class="d-flex flex-column text-center justify-center align-center"
              >
                <v-icon class="icon__color">mdi-cog-outline</v-icon>
                <span>Settings</span>
              </router-link>
            </li>

            <li
              @click="logOut"
              class="d-flex white--text flex-column text-center justify-center align-center"
            >
              <v-icon class="icon__color">mdi-logout</v-icon>
              <span>Logout</span>
            </li>
          </ul>
        </nav>
      </div>

      <!-- <v-list dense nav>
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

          <v-list-item class="list__item" link v-if="role !== 'Admin'">
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

          <v-list-item
            class="list__item"
            link
            v-if="role !== 'Customer' && role !== 'Admin'"
          >
            <div class="item__container" @click="$router.push('/live-device')">
              <v-list-item-icon style="margin-left: auto; margin-right: auto">
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
      </v-list> -->
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
.sidebar {
  margin-top: 20px;
  position: fixed;
  height: 100vh;
  width: 120px;
  border-radius: 15px;
  margin-right: auto;
}

.sidebar ul {
  list-style: none;
}

.sidebar li {
  text-align: left;
  width: 100%;
  margin-bottom: 2rem;
  cursor: pointer;
}

.sidebar a {
  color: white;
  text-decoration: none;
  font-size: 14px;
  margin-top: 5px;
}
.sidebar a.exactActiveLink {
  color: #ffb23e;
  background: transparent url("@/assets/Rectangle\ 37.svg") 0% 0% no-repeat
    padding-box;
  background-size: 120px 100px;
  height: 60px;
}
.sidebar a.exactActiveLink > .icon__color {
  color: #ffb23e;
}

span {
  font-size: 14px;
  margin-top: 5px;
}
</style>
