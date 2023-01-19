<template>
  <div>
    <PageHeader
      title="Patients"
      pageIcon="mdi-arrow-left"
      @goBack="$router.go(-1)"
      btnName="Add"
      color-name="warning"
      btnIconName="mdi-account-plus"
      @addNewPatient="addPatient"
    />
    <br />
    <v-container
      style="background-color: rgba(0, 0, 0, 0.5); border-radius: 20px"
      fluid
    >
      <div class="mt-3 mb-3 pa-2">
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
          class="elevation-1 table"
          height="600"
          dark
        >
          <template v-slot:[`item.image`]>
            <v-img
              src="@/assets/Ellipse 10.png"
              height="80"
              width="80"
              contain
              class="mt-2 mb-2"
            ></v-img>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              color="warning"
              class="mr-4"
              size="22"
              @click="$router.push(`/patients/patient/${item.id}`)"
            >
              mdi-eye
            </v-icon>
            <v-icon
              size="22"
              color="info"
              class="mr-4"
              @click="$router.push(`/edit-patient/${item.id}`)"
              v-if="role === 'Doctor'"
              >mdi-pencil</v-icon
            >
            <v-icon
              size="22"
              color="red"
              @click="deleteSinglePatient(item.id)"
              v-if="role === 'Doctor'"
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
      role: localStorage.getItem("role"),
      headers: [
        {
          text: "Patient Image",
          align: "start",
          sortable: false,
          value: "image",
        },
        {
          text: "Patient Name",
          sortable: false,
          value: "fullName",
        },
        { text: "Phone No.", value: "mobileNo" },
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
        this.$toast.success("Patient deleted successfully.", {
          timeout: 3000,
        });
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
.table >>> th {
  font-size: 16px !important;
}
.table >>> tr > td {
  font-size: 24px !important;
}
.table >>> .v-data-footer__select,
.table >>> .v-select__selection,
.table >>> .v-data-footer__pagination {
  font-size: 1rem;
}
@media only screen and (max-width: 960px) {
  .table >>> th {
    font-size: 12px !important;
  }
  .table >>> tr > td {
    font-size: 16px !important;
  }
  .table >>> .v-data-footer__select,
  .table >>> .v-select__selection,
  .table >>> .v-data-footer__pagination {
    font-size: 0.8rem;
  }
}
</style>
