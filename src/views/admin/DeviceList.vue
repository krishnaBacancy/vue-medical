<template>
  <div>
    <PageHeader
      title="Device List"
      pageIcon="mdi-arrow-left"
      @goBack="$router.go(-1)"
    />
    <br />
    <v-container
      style="background-color: rgba(0, 0, 0, 0.5); border-radius: 20px"
      fluid
    >
      <v-btn
        color="warning"
        height="53"
        width="248"
        class="text-start mr-auto mt-2 mb-2"
        v-if="role === 'Admin'"
        @click.stop="addDialog = true"
        >Add Device</v-btn
      >
      <v-btn
        color="warning"
        height="53"
        width="248"
        class="text-start mr-auto ml-10 mt-2 mb-2"
        v-if="role === 'Admin'"
        @click="assignDevicesToDoctor"
        >Assign to Doctor</v-btn
      >
      <v-btn
        color="warning"
        height="53"
        width="248"
        class="text-start mr-auto ml-10 mt-2 mb-2"
        v-if="role === 'Admin'"
        @click="assignDevicesToPatient"
        >Assign to Customer</v-btn
      >
      <v-select
        :items="getAllDoctorsNamesOnly"
        v-if="toggleSelect"
        v-model="selectedHeaders"
        :menu-props="{ value: toggleSelect }"
        @change="getSelectedValue"
        return-object
      ></v-select>
      <v-select
        :items="getAllPatientsNameOnly"
        v-if="toggleSelectPatient"
        v-model="selectedHeadersPatient"
        :menu-props="{ value: toggleSelectPatient }"
        @change="getSelectedValuePatient"
        return-object
      ></v-select>
      <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        overlay-color="white"
        persistent
        v-model="addDialog"
      >
        <v-card dark>
          <v-card-title>
            <span class="text-h5 ml-3">Add Device</span>
          </v-card-title>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Device Name"
                      v-model="device.name"
                      :rules="nameRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Mac Address"
                      v-model="device.macAddress"
                      :rules="macAddressRules"
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
                        :max="new Date().toISOString().slice(0, 10)"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="addDialog = false">
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                :disabled="!valid"
                @click="addDevice"
              >
                Add Device
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
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
          :items="getDevices"
          :items-per-page="5"
          class="elevation-1 table"
          height="500"
          dark
          show-select
          v-model="selected"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon color="info" @click="editDevice(item)" size="28">
              mdi-pencil
            </v-icon>
            <v-icon
              size="26"
              color="red"
              class="ml-4"
              @click="deleteSingleDevice(item.id)"
              >mdi-delete</v-icon
            >
          </template>
        </v-data-table>

        <v-dialog
          v-model="dialog"
          max-width="600px"
          persistent
          dark
          overlay-color="white"
        >
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
      <ConfirmDialog ref="confirm" />
      <device-assign-dialog ref="assign" />
    </v-container>
  </div>
</template>

<script>
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import PageHeader from "@/layouts/PageHeader.vue";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import DeviceAssignDialog from "@/components/DeviceAssignDialog.vue";

export default {
  data() {
    return {
      icon: "justify",
      valid: true,
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
      nameRules: [(v) => !!v || "Device name is required"],
      macAddressRules: [(v) => !!v || "Macaddress is required"],
      dialogDelete: false,
      toggleSelect: false,
      selectedHeaders: "",
      selected: [],
      toggleSelectPatient: false,
      selectedHeadersPatient: "",
    };
  },
  computed: {
    ...mapGetters("devices", ["getDevices", "loadingStatus"]),
    ...mapGetters("doctors", [
      "getAllDoctorsNamesOnly",
      "getAllPatientsNameOnly",
    ]),
  },
  methods: {
    ...mapActions("devices", [
      "getAllDevices",
      "deleteDevice",
      "addDeviceData",
      "checkAssignDevicesToDoctor",
      "assignDeviceToDoctor",
      "checkAssignDevicesToPatient",
      "assignDeviceToPatient",
    ]),
    ...mapActions("doctors", ["getAllPatientsData"]),
    addDevice() {
      const data = {
        name: this.device.name,
        mac_address: this.device.macAddress,
        manufacture_month_year: this.device.dateValue,
      };
      this.$refs.form.validate();
      if (!this.device.dateValue) {
        this.$toast.error("Must select device Manufacture Date.", {
          timeout: 3000,
        });
      } else {
        this.addDeviceData(data);
        setTimeout(() => {
          this.getAllDevices();
        }, 500);
        this.addDialog = false;
        this.$toast.success("Device added successfully.", { timeout: 3000 });
        this.device = {};
        this.$refs.form.reset();
      }
    },
    async deleteSingleDevice(item) {
      if (
        await this.$refs.confirm.open(
          "Are you sure you want to delete this device?"
        )
      ) {
        this.deleteDevice(item);
        this.$toast.success("Device deleted successfully.");
      }
      this.dialogDelete = true;
    },
    focusDate() {
      setTimeout(() => {
        if (!this.dateMenu) {
          this.dateMenu = true;
        }
      }, 200);
    },
    editDevice(item) {
      this.editedIndex = this.getDevices.indexOf(item);
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
          `https://api.accu.live/api/v1/devices/updatesingledevicedetails?deviceId=${this.itemId}`,
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
    assignDevicesToDoctor() {
      if (this.selected.length > 0) {
        this.getAllPatientsData(this.getDoctorId);
        this.toggleSelect = true;
      } else {
        this.$toast.error(
          "You must select atleast one device to assign.",
          3000
        );
      }
    },
    assignDevicesToPatient() {
      if (this.selected.length > 0) {
        this.getAllPatientsData(this.getDoctorId);
        this.toggleSelectPatient = true;
      } else {
        this.$toast.error(
          "You must select atleast one device to assign.",
          3000
        );
      }
    },
    async getSelectedValue() {
      let macAddress = this.selected.map((data) => data.macAddressFramed);
      let data = {
        devices: macAddress,
        doctorId: this.getDoctorId,
      };
      if (this.selectedHeaders !== null) {
        this.checkAssignDevicesToDoctor(data);
        if (
          await this.$refs.assign.open(
            "Some of device are already assigned to doctor. Do You wish to continue?"
          )
        ) {
          this.assignDeviceToDoctor(data);
          this.selected = [];
          this.$toast.success("Devices assigned to Doctor successfully.");
        }
      }
      this.selectedHeaders = "";
      this.toggleSelect = false;
    },
    async getSelectedValuePatient() {
      let macAddress = this.selected.map((data) => data.macAddressFramed);
      let data = {
        devices: macAddress,
        doctorId: this.getDoctorId,
      };
      if (this.selectedHeadersPatient !== null) {
        this.checkAssignDevicesToPatient(data);
        if (
          await this.$refs.assign.open(
            "Some of device are already assigned to customer. Do You wish to continue?"
          )
        ) {
          this.assignDeviceToPatient(data);
          this.selected = [];
          this.$toast.success("Devices assigned to Patient successfully.");
        }
      }
      this.selectedHeadersPatient = "";
      this.toggleSelectPatient = false;
    },
  },
  watch: {
    editedItem() {
      this.getAllDevices();
    },
  },
  mounted() {
    this.getAllDevices();
    this.getAllPatientsData(this.getDoctorId);
  },
  components: { PageHeader, ConfirmDialog, DeviceAssignDialog },
};
</script>

<style scoped>
.v-item-group {
  display: flex;
  justify-content: space-evenly;
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
    font-size: 0.69rem;
  }
}
</style>
