<template>
  <div>
    <PageHeader title="Device List" pageIcon="mdi-devices" />
    <br />
    <v-container style="background-color: rgba(0, 0, 0, 0.3)" fluid>
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
      <div class="mt-3 mb-3">
        <v-data-table
          :headers="headers"
          :items="getPatients"
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
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      icon: "justify",
      getDoctorId: localStorage.getItem("user_id"),
      headers: [
        {
          text: "FirstName",
          align: "start",
          sortable: false,
          value: "firstName",
        },
        { text: "LastName", value: "lastName" },
        { text: "Mac Address", value: "macAddressFramed" },
      ],
    };
  },
  computed: {
    ...mapGetters("doctors", ["getPatients"]),
    // getRole() {
    //   return this.getUsersData.map()
    // }
  },
  methods: {
    ...mapActions("doctors", ["getPatientsForDoctor"]),
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
    this.getPatientsForDoctor(this.getDoctorId);
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
