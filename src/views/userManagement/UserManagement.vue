<template>
  <div>
    <PageHeader title="Device List" pageIcon="mdi-devices" />
    <br />
    <v-container style="background-color: rgba(0, 0, 0, 0.3)" fluid>
      <!-- <v-btn @click="addDevice" color="warning" class="text-start mr-auto"
        >Add Device</v-btn
      > -->
      <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        overlay-color="white"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="warning"
            class="text-start mr-auto"
            v-bind="attrs"
            v-on="on"
            v-if="role === 'Admin  '"
            >Add Device</v-btn
          >
        </template>
        <template v-slot:default="dialog">
          <v-card dark>
            <v-card-title>
              <span class="text-h5 ml-3">Add Device</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Device Name"
                      v-model="device.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Mac Address"
                      v-model="device.macAddress"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-menu
                      v-model="dateMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                      max-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          label="Manufacture Month"
                          readonly
                          hide-details
                          :value="device.dateValue"
                          @focus="focusDate"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        locale="en-in"
                        v-model="device.dateValue"
                        no-title
                        @input="dateMenu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog.value = false">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="addDevice">
                Add Device
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
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
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Device Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
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
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      icon: "justify",
      getDoctorId: localStorage.getItem("user_id"),
      role: localStorage.getItem("role"),
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
        macAddressFramed: "",
      },
      defaultItem: {
        name: "",
        macAddressFramed: "",
      },
      itemId: "",
      addDialog: false,
      dateMenu: false,
      device: {
        name: "",
        macAddress: "",
        dateValue: null,
      },
    };
  },
  computed: {
    ...mapGetters("doctors", ["getPatients", "loadingStatus"]),
  },
  methods: {
    ...mapActions("doctors", ["getPatientsForDoctor", "addDeviceData"]),
    addDevice() {
      const data = {
        name: this.device.name,
        mac_address: this.device.macAddress,
        manufacture_month_year: this.device.dateValue,
      };
      this.addDeviceData(data)
        .then((success) => {
          console.log(success);
          // this.$router.push({ path: "/" });
          this.$toast.success("Device added successfully.", { timeout: 3000 });
        })
        .catch((err) => {
          this.$toast.error("Some error occurred.", { timeout: 3000 });
          console.log(err);
        });
      console.log("device--", this.device);
    },
    focusDate() {
      setTimeout(() => {
        if (!this.dateMenu) {
          this.dateMenu = true;
        }
      }, 200);
    },
    editDevice(item) {
      this.editedIndex = this.getPatients.indexOf(item);
      this.itemId = item.id;
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
    async save() {
      if (this.editedIndex > -1) {
        const res = await axios.put(
          `http://194.233.69.96:8989/api/v1/devices/updatesingledevicedetails?deviceId=${this.itemId}`,
          this.editedItem
        );
        if (res.status === 200) {
          this.$toast.success("Device Updated successfully.", {
            timeout: 3000,
          });
        }
      }
      this.close();
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    editedItem() {
      this.getPatientsForDoctor(this.getDoctorId);
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
