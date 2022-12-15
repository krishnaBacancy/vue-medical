<template>
  <div>
    <PageHeader
      title="Device List"
      pageIcon="mdi-arrow-left"
      @goBack="$router.go(-1)"
    />
    <br />
    <v-container style="background-color: rgba(0, 0, 0, 0.3)" fluid>
      <div class="mt-3 mb-3">
        <v-data-table
          item-key="name"
          class="elevation-1"
          loading
          loading-text="Loading... Please wait"
          height="350"
          :items-per-page="5"
          dark
          v-if="loadingStatus"
        ></v-data-table>
        <v-data-table
          v-else
          :headers="headers"
          :items="getPatients"
          :items-per-page="5"
          class="elevation-1"
          height="350"
          dark
        >
        </v-data-table>
      </div>
    </v-container>
  </div>
</template>

<script>
import PageHeader from "@/layouts/PageHeader.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      icon: "justify",
      getDoctorId: localStorage.getItem("user_id"),
      headers: [
        {
          text: "DeviceName",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "PatientName",
          value: "fullName",
        },
        { text: "Mac Address", value: "macAddressFramed" },
      ],
    };
  },
  computed: {
    ...mapGetters("doctors", ["getPatients", "loadingStatus"]),
  },
  methods: {
    ...mapActions("doctors", ["getPatientsForDoctor"]),
  },
  mounted() {
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
