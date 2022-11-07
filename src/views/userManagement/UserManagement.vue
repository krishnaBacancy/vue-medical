<template>
  <div>
    <PageHeader title="User Management" pageIcon="mdi-account-box" />
    <br />
    <v-container style="height: 100vh; background-color: #282934" fluid>
      <h1 class="white--text">User Management</h1>
      <br /><br />
      <v-col cols="12" class="py-2">
        <v-btn-toggle v-model="icon" borderless>
          <v-btn value="left" color="primary">
            <span class="hidden-sm-and-down">Admin</span>
          </v-btn>

          <v-btn value="center" color="secondary" class="ml-4">
            <span class="hidden-sm-and-down">Doctors</span>
          </v-btn>

          <v-btn value="right" color="green" class="ml-4">
            <span class="hidden-sm-and-down">Patients</span>
          </v-btn>

          <v-spacer></v-spacer>
          <v-btn
            value="right"
            color="warning"
            @click="addUser"
            style="border-radius: 30%"
          >
            <span class="hidden-sm-and-down">Add</span>
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <div class="mt-3">
        <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="5"
          class="elevation-1"
          height="350"
          dark
        ></v-data-table>
      </div>
    </v-container>
  </div>
</template>

<script>
// import roles from "@/api/roles";
import PageHeader from "@/layouts/PageHeader.vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      icon: "justify",
      headers: [
        {
          text: "FirstName",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "LastName", value: "calories" },
        { text: "Email", value: "fat" },
        { text: "Mobile", value: "carbs" },
        { text: "Gender", value: "protein" },
        { text: "Aadhar-Card", value: "iron" },
        { text: "Address", value: "address" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6,
          carbs: 24,
          protein: 4,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16,
          carbs: 23,
          protein: 6,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
      ],
    };
  },
  methods: {
    ...mapActions("userManagement", ["getAllUsers"]),
    // async getRoles() {
    //   const { data } = await roles.getAllRolesApi();
    //   console.log("data", data);
    // },
    addUser() {
      this.$router.push({ path: "/add-user" });
    },
  },
  mounted() {
    // this.getRoles();
    this.getAllUsers();
  },
  components: { PageHeader },
};
</script>

<style scoped>
.v-item-group {
  display: flex;
  justify-content: space-evenly;
}
</style>
