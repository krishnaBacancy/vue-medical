<template>
  <v-app>
    <v-app-bar app v-if="$vuetify.breakpoint.smAndDown && !getRoute">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <img
        class="sidebar-logo ml-8"
        src="@/assets/logo-white.svg"
        @click="$router.push('/')"
        height="30"
      />
    </v-app-bar>
    <v-navigation-drawer
      app
      v-model="drawer"
      width="10%"
      :style="{
        width: $vuetify.breakpoint.smAndDown ? '280px' : '120px',
        backgroundColor: $vuetify.breakpoint.smAndDown
          ? 'rgb(245,130,32)'
          : 'rgb(245,130,32)',
      }"
      :permanent="$vuetify.breakpoint.mdAndUp"
      v-if="!getRoute"
    >
      <v-list-item-title class="sidebar-logo-wrapper">
        <img
          class="sidebar-logo"
          src="@/assets/logo-white.svg"
          @click="$router.push('/')"
          height="30"
          style="cursor: pointer"
        />
      </v-list-item-title>
      <div class="sidebar">
        <nav>
          <!-- Move event here -->
          <ul>
            <li v-if="role !== 'Admin'">
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
                <!-- <v-img src="@/assets/patients.svg" class="icon__color"></v-img> -->
                <v-icon class="icon__color">mdi-account</v-icon>
                <span>Patients</span>
              </router-link>
            </li>

            <li v-if="role === 'Doctor'">
              <router-link
                to="/user-management"
                class="d-flex flex-column text-center justify-center align-center"
              >
                <img
                  src="@/assets/Device List.png"
                  height="40"
                  width="40"
                  contain
                  class="icon__color"
                />
                <span>Device List</span>
              </router-link>
            </li>

            <li v-if="role === 'Admin'">
              <router-link
                to="/devices"
                class="d-flex flex-column text-center justify-center align-center"
              >
                <img
                  src="@/assets/Device List.png"
                  height="40"
                  width="40"
                  contain
                  class="icon__color"
                />
                <span>Device List</span>
              </router-link>
            </li>

            <li v-if="role !== 'Admin'">
              <router-link
                to="/live-device"
                class="d-flex flex-column text-center justify-center align-center"
              >
                <img
                  src="@/assets/Live Device.png"
                  height="40"
                  width="40"
                  contain
                  class="icon__color"
                />
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

            <li>
              <a
                @click="logOut"
                class="d-flex white--text flex-column text-center justify-center align-center"
              >
                <v-icon class="icon__color">mdi-logout</v-icon>
                <span>Logout</span>
              </a>
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

    <v-main class="main-wrapper live-page">
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
.v-navigation-drawer {
  border-radius: 0 65px 65px 0;
}
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
  padding-top: 45px;
  position: fixed;
  height: calc(100vh - 70px);
  width: 120px;
  border-radius: 15px;
  margin-right: auto;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.sidebar-logo-wrapper {
  margin-top: 30px;
}
.sidebar::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}
.sidebar::-webkit-scrollbar-track {
  background: #1f2026;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #1f2026;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #1f2026;
}

.sidebar ul {
  list-style: none;
  padding: 0 0 30px;
}
.sidebar a .v-icon.v-icon {
  height: 40px;
  width: 40px;
}
.sidebar li {
  text-align: left;
  width: 100%;
  cursor: pointer;
}

.sidebar a {
  color: white;
  text-decoration: none;
  font-size: 14px;
  padding: 22px 10px;
  font-weight: 400;
}
.sidebar a.exactActiveLink {
  color: #fff;
  background: rgba(255, 255, 255, 0.26);
}
.sidebar a.exactActiveLink > .icon__color {
  color: #fff;
}

span {
  font-size: 14px;
  margin-top: 5px;
}
.main-wrapper {
  width: calc(100% - 120px);
  margin-left: auto;
  padding: 40px 45px !important;
}
.main-wrapper.live-page {
  width: 100% !important;
  padding-top: 1vw !important;
  padding-bottom: 1vw !important;
  margin-top: 0;
}

@media (max-width: 1600px) {
  .sidebar a {
    padding: 16px 10px;
  }
  .sidebar a span {
    margin-top: 0;
  }
}
@media (max-width: 1400px) {
  .sidebar a {
    padding: 12px 10px;
  }
  .sidebar a span {
    margin-top: 0;
  }
}

@media (max-width: 960px) {
  .main-wrapper {
    width: 100%;
    margin-top: 56px;
    padding: 20px 20px !important;
  }
  .sidebar {
    width: 100%;
  }
  .sidebar-logo-wrapper {
    margin-top: 20px;
  }
  .sidebar-logo {
    height: 26px;
  }
  .sidebar {
    padding-top: 20px;
  }
  .sidebar a {
    flex-direction: row !important;
    justify-content: flex-start !important;
    padding: 5px 12px;
    border-radius: 40px;
  }
  .sidebar a .icon__color,
  .sidebar a .v-icon.v-icon {
    margin-right: 10px;
  }
}
@media (max-width: 767px) {
  .main-wrapper {
    padding: 15px !important;
  }
}
.theme--dark.v-app-bar.v-toolbar.v-sheet {
  background-color: rgb(245, 130, 32);
}
.v-navigation-drawer,
.theme--light.v-app-bar.v-toolbar.v-sheet,
.theme--dark.v-navigation-drawer {
  background: rgb(245, 130, 32) !important;
}
.sidebar a .v-icon {
  color: #fff;
}
.v-app-bar__nav-icon.v-btn > .v-btn__content .v-icon {
  color: rgb(245, 130, 32);
}
.v-app-bar__nav-icon.v-btn {
  background-color: #fff;
  border-radius: 10px;
  height: 36px !important;
  width: 36px !important;
  left: 10px;
}
</style>
