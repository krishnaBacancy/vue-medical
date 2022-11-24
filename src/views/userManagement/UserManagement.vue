<template>
  <div>
    <PageHeader title="Device List" pageIcon="mdi-devices" />
    <br />
    <v-container style="background-color: rgba(0, 0, 0, 0.3)" fluid>
      <v-btn
        @click="addDevice"
        color="warning"
        class="text-start mr-auto"
        v-if="getRole === 'Admin'"
        >Add Device</v-btn
      >
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
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon color="info" @click="editDevice(item)"> mdi-pencil </v-icon>
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
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Device Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.fullName"
                      label="Patient Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.macAddressFramed"
                      label="Mac Address"
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
      dialog: false,
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
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        fullName: "",
        macAddressFramed: "",
      },
      defaultItem: {
        name: "",
        fullName: "",
        macAddressFramed: "",
      },
    };
  },
  computed: {
    ...mapGetters("doctors", ["getPatients", "loadingStatus"]),
    ...mapGetters("users", ["getRole"]),
  },
  methods: {
    ...mapActions("doctors", ["getPatientsForDoctor"]),
    addDevice() {
      this.$router.push({ path: "/add-user" });
    },
    editDevice(item) {
      this.editedIndex = this.getPatients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.getPatients[this.editedIndex], this.editedItem);
      } else {
        this.getPatients.push(this.editedItem);
      }
      this.close();
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
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
