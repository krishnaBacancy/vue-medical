<template>
  <v-app>
    <!-- <v-app-bar app color="grey" class="white--text">
      <v-toolbar-title @click="$router.push('/')" style="cursor: pointer">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="success" @click="$router.push('/login')" v-if="!getUserId">
        Login
      </v-btn>
      <v-btn class="warning" @click="logOut" v-else> Logout </v-btn>
    </v-app-bar> -->

    <v-navigation-drawer app v-model="drawer" dark permanent width="10%">
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
        <!-- <v-list-item-group> -->
        <!-- <v-list-item
            class="list__item"
            link
            v-for="item in items"
            :key="item.title"
          >
            <div class="item__container" @click="$router.push(item.link)">
              <v-list-item-icon style="margin-left: 40px">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </div>
          </v-list-item> -->

        <v-list-item class="list__item" link>
          <div class="item__container" @click="goToLink('/')">
            <v-list-item-icon style="margin-left: 40px">
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </div>
        </v-list-item>

        <v-list-item class="list__item" link>
          <div class="item__container" @click="goToLink('/patients')">
            <v-list-item-icon style="margin-left: 40px">
              <v-icon>mdi-account-injury</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Patients</v-list-item-title>
            </v-list-item-content>
          </div>
        </v-list-item>

        <v-list-item class="list__item" link v-if="getRole !== 'Customer'">
          <div
            class="item__container"
            @click="$router.push('/user-management')"
          >
            <v-list-item-icon style="margin-left: 40px">
              <v-icon>mdi-devices</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Device List</v-list-item-title>
            </v-list-item-content>
          </div>
        </v-list-item>

        <v-list-item class="list__item" link>
          <div class="item__container" @click="goToLink('/settings')">
            <v-list-item-icon style="margin-left: 40px">
              <v-icon>mdi-cog-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </div>
        </v-list-item>

        <v-list-item class="list__item" link>
          <div class="item__container" @click="logOut">
            <v-list-item-icon style="margin-left: 40px">
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </div>
        </v-list-item>
        <!-- </v-list-item-group> -->
      </v-list>
    </v-navigation-drawer>

    <v-main style="width: 95%; margin-left: auto; margin-right: auto">
      <router-view />
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
    // getBreakPoint() {
    //   console.log("name--", this.$vuetify.breakpoint.xs);
    //   return this.$vuetify.breakpoint.xs;
    // },
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
</style>
