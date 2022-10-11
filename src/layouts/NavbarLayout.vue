<template>
  <div>
    <v-toolbar id="navbar" dense elevation="1" dark>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="sidebar = !sidebar"
      ></v-app-bar-nav-icon>

      <v-navigation-drawer v-model="sidebar" app hide-overlay temporary>
        <v-list>
          <v-list-item
            v-for="(item, i) in menuItems"
            exact
            :key="i"
            :to="item.path"
            >{{ item.title }}</v-list-item
          >
        </v-list>
      </v-navigation-drawer>

      <v-toolbar-items d-flex>
        <v-btn id="logo" depressed text>
          <span @click="$router.push('/')"> Medical </span></v-btn
        >
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <!-- <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text v-for="item in menuItems" :key="item.title">
          <span @click="goToLink(item.path)">{{ item.title }}</span>
        </v-btn>
      </v-toolbar-items> -->
      <v-list nav dense link v-for="(menu, index) in menuItems" :key="index">
        <v-list-item @click="goToLink(menu.path)">
          <v-list-item-title>{{ menu.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-toolbar>

    <!-- <v-navigation-drawer permanent expand-on-hover>
      <v-list> </v-list>

      <v-divider></v-divider>

      <v-list nav dense link v-for="(menu, index) in menuItems" :key="index">
        <v-list-item @click="goToLink(menu.path)">
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ menu.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      tab: null,
      items: ["web", "User Management"],
      sidebar: false,
      menuItems: [
        {
          path: "/",
          name: "Home",
          title: "Home",
          icon: "mdi-home",
        },
        {
          path: "/user-management",
          name: "User",
          title: "User Management",
          icon: "mdi-account-multiple",
        },
        {
          path: "/login",
          name: "Login",
          title: "Login",
          icon: "mdi-login",
        },
      ],
    };
  },
  methods: {
    goToLink(path) {
      return this.$router.push(path);
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
