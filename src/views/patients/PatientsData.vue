<template>
  <div>
    <PageHeader
      title="Patients"
      pageIcon="mdi-account-injury"
      btnName="Add"
      color-name="warning"
      btnIconName="mdi-account-plus"
      @addNewPatient="addPatient"
    />
    <br />
    <v-container style="background-color: rgba(0, 0, 0, 0.5)" fluid>
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
          :items="getAllPatientsOnly"
          :items-per-page="5"
          class="elevation-1"
          height="500"
          dark
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="warning"
              class="mr-3"
              size="20"
              @click="$router.push(`/patients/patient/${item.id}`)"
            >
              mdi-eye
            </v-icon>
            <v-icon
              size="20"
              color="info"
              class="mr-3"
              @click="$router.push(`/edit-patient/${item.id}`)"
              >mdi-pencil</v-icon
            >
            <v-icon size="20" color="red" @click="deleteSinglePatient(item.id)"
              >mdi-delete</v-icon
            >
          </template>
        </v-data-table>
      </div>
      <ConfirmDialog ref="confirm" />
    </v-container>
  </div>
</template>

<script>
import PageHeader from "@/layouts/PageHeader.vue";
import { mapActions, mapGetters } from "vuex";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
export default {
  name: "PatientsData",
  data() {
    return {
      getDoctorId: localStorage.getItem("user_id"),
      headers: [
        {
          text: "PatientName",
          align: "start",
          sortable: false,
          value: "fullName",
        },
        {
          text: "Room Number",
          value: "room",
        },
        { text: "Floor Number", value: "floor" },
        { text: "Phone Number", value: "mobileNo" },
        { text: "Patient Status", value: "status" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialog: false,
      dialogDelete: false,
    };
  },
  computed: {
    ...mapGetters("doctors", ["getAllPatientsOnly", "loadingStatus"]),
  },
  methods: {
    ...mapActions("doctors", ["getAllPatientsData", "deletePatient"]),
    addPatient() {
      this.$router.push("/add-new-patient");
    },
    getFullName(s1, s2) {
      return (
        s1.charAt(0).toUpperCase() +
        s1.slice(1) +
        " " +
        s2.charAt(0).toUpperCase() +
        s2.slice(1)
      );
    },
    async deleteSinglePatient(item) {
      if (
        await this.$refs.confirm.open(
          "Are you sure you want to delete this patient?"
        )
      ) {
        this.deletePatient(item);
        this.$toast.success("Patient deleted successfully.");
        setTimeout(() => {
          this.getAllPatientsData(this.getDoctorId);
        }, 500);
      }
      this.dialogDelete = true;
    },
  },
  mounted() {
    this.getAllPatientsData(this.getDoctorId);
  },
  components: {
    PageHeader,
    ConfirmDialog,
  },
};
</script>

<style scoped>
h2 {
  font-size: 1.4rem;
}
small {
  font-size: 0.9rem;
  color: grey;
}
</style>
