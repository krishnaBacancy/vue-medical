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
              @click="editPatient(item)"
              >mdi-pencil</v-icon
            >
            <v-icon size="20" color="red" @click="deletePatient(item)"
              >mdi-delete</v-icon
            >
          </template>
        </v-data-table>

        <v-dialog v-model="dialog" max-width="600px" dark overlay-color="white">
          <v-card>
            <v-card-title>
              <span class="text-h5 ml-3">Edit</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedPatient.fullName"
                      label="Patient Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedPatient.mobileNo"
                      label="Phone Number"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="dialogDelete"
          max-width="600px"
          dark
          overlay-color="white"
        >
          <v-card>
            <v-card-title class="text-h5 ml-5 text-xs-h6"
              >Are you sure you want to delete this Patient?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deletePatientConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
    <!-- <v-container
      fluid
      grid-list-md
      style="background-color: rgba(0, 0, 0, 0.5)"
      class="mb-4"
    >
      <v-layout
        row
        wrap
        v-for="patient in getAllPatientsOnly"
        :key="patient.id"
      >
        <v-flex d-flex xs12 sm12 md12>
          <v-card
            color="#282934"
            class="ml-2 mt-2 mb-2 pa-2 white--text"
            style="width: 100%"
          >
            <div
              class="d-flex mb-3 d-sm-flex flex-md-row flex-sm-column align-center justify-space-between"
            >
              <div class="d-flex align-center justify-start">
                <v-img
                  src="https://accu.live/images/author-image.png"
                  class="ml-4"
                  contain
                  height="70"
                ></v-img>
                <div class="d-flex flex-column ml-3">
                  <small class="font-weight-bold text-start"
                    >Patient Name</small
                  >
                  <h2 class="text-start">
                    {{ getFullName(patient?.firstName, patient?.lastName) }}
                  </h2>
                </div>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex flex-column" style="width: 16%">
                <small class="font-weight-bold text-start">Room Number</small>
                <h2 class="text-start">001</h2>
              </div>

              <div class="d-flex flex-column" style="width: 16%">
                <small class="font-weight-bold text-start">Floor Number</small>
                <h2 class="text-start">001</h2>
              </div>

              <div class="d-flex flex-column" style="width: 16%">
                <small class="font-weight-bold text-start">Phone Number</small>
                <h2 class="text-start">{{ patient?.mobileNo }}</h2>
              </div>

              <div class="d-flex flex-column" style="width: 16%">
                <small class="font-weight-bold text-start"
                  >Patient Status</small
                >
                <h2 class="text-start info--text">Hospitalized</h2>
              </div>

              <div class="d-flex" style="width: 10%">
                <v-icon
                  color="warning"
                  class="mr-3"
                  @click="$router.push(`/patients/patient/${patient.id}`)"
                  >mdi-eye</v-icon
                >
                <v-icon color="info" class="mr-2">mdi-pencil</v-icon>
                <v-icon color="red" class="mr-2">mdi-delete</v-icon>
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container> -->
  </div>
</template>

<script>
import PageHeader from "@/layouts/PageHeader.vue";
import { mapActions, mapGetters } from "vuex";
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
      editedIndex: -1,
      editedPatient: {
        fullName: "",
        mobileNo: "",
      },
      defaultPatient: {
        fullName: "",
        mobileNo: "",
      },
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  computed: {
    ...mapGetters("doctors", ["getAllPatientsOnly", "loadingStatus"]),
  },
  methods: {
    ...mapActions("doctors", ["getAllPatientsData"]),
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
    editPatient(item) {
      this.editedIndex = this.getAllPatientsOnly.indexOf(item);
      this.editedPatient = Object.assign({}, item);
      this.dialog = true;
    },
    deletePatient(item) {
      // console.log("item--", item);
      this.editedIndex = this.getAllPatientsOnly.indexOf(item);
      this.editedPatient = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deletePatientConfirm() {
      this.getAllPatientsOnly.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedPatient = Object.assign({}, this.defaultPatient);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedPatient = Object.assign({}, this.defaultPatient);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.getAllPatientsOnly[this.editedIndex],
          this.editedPatient
        );
      } else {
        this.getPatients.push(this.editedPatient);
      }
      this.close();
    },
  },
  mounted() {
    if (this.getDoctorId) {
      this.getAllPatientsData(this.getDoctorId);
    }
  },
  components: {
    PageHeader,
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
