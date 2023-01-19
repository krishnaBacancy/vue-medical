<template>
  <div>
    <PageHeader
      title="Device List"
      pageIcon="mdi-arrow-left"
      @goBack="$router.go(-1)"
    />
    <div class="text-right mb-5">
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
    </div>
    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      overlay-color="white"
      persistent
      v-model="addDialog"
    >
      <v-card>
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
                    v-model.trim="device.name"
                    :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Mac Address"
                    v-model.trim="device.macAddress"
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

    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      overlay-color="white"
      persistent
      v-model="assignDevicePatientDialog"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5 ml-3"
            >Select below patient to assign device</span
          >
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-select
                  :items="getAllPatientsOnly"
                  v-model="selectedHeadersPatient"
                  @change="getSelectedValuePatient"
                  item-text="fullName"
                  return-object
                  placeholder="Select Patient"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="assignDevicePatientDialog = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      overlay-color="white"
      persistent
      v-model="assignDeviceDoctorDialog"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5 ml-3">Select below doctor to assign device</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-select
                  :items="getAllDoctorsOnly"
                  v-model="selectedHeaders"
                  @change="getSelectedValue"
                  return-object
                  item-text="fullName"
                  placeholder="Select Doctor"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="assignDeviceDoctorDialog = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="table-changes">
      <v-data-table
        item-key="name"
        class="elevation-1"
        loading
        loading-text="Loading... Please wait"
        height="350"
        :items-per-page="5"
        v-if="loadingStatus"
      ></v-data-table>
      <v-data-table
        v-else
        :headers="headers"
        :items="getDevices"
        :items-per-page="5"
        class="elevation-1 table"
        height="500"
        show-select
        v-model="selected"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <button class="btn btn-orange">
            <v-icon color="white" @click="editDevice(item)" size="18">
              mdi-pencil
            </v-icon>
          </button>
          <button class="btn btn-info">
            <v-icon size="18" color="white" @click="deleteSingleDevice(item.id)"
              >mdi-delete</v-icon
            >
          </button>
        </template>
      </v-data-table>

      <v-dialog
        v-model="dialog"
        max-width="600px"
        persistent
        overlay-color="white"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5 ml-3">Edit</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="editedItem.name"
                    label="Device Name"
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
        { text: "Patient Name", value: "fullName" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
      },
      defaultItem: {
        name: "",
        macAddressFramed: "",
      },
      itemId: "",
      addDialog: false,
      assignDevicePatientDialog: false,
      assignDeviceDoctorDialog: false,
      dateMenu: false,
      device: {
        name: "",
        macAddress: "",
        dateValue: null,
      },
      nameRules: [(v) => !!v || "Device name is required"],
      macAddressRules: [(v) => !!v || "Macaddress is required"],
      dialogDelete: false,
      selectedHeaders: {},
      selected: [],
      selectedHeadersPatient: {},
    };
  },
  computed: {
    ...mapGetters("devices", ["getDevices", "loadingStatus"]),
    ...mapGetters("doctors", ["getAllDoctorsOnly", "getAllPatientsOnly"]),
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
        adminId: this.getDoctorId,
      };
      this.$refs.form.validate();
      if (!this.device.dateValue) {
        this.$toast.error("Must select device Manufacture Date.", {
          timeout: 3000,
        });
      } else {
        this.addDeviceData(data)
          .then((success) => {
            console.log(success);
            this.$toast.success("Device added successfully.", {
              timeout: 3000,
            });
          })
          .catch((err) => {
            console.log(err);
            this.$toast.error(err.response.data.message, { timeout: 3000 });
          });
        this.addDialog = false;
        setTimeout(() => {
          this.getAllDevices();
        }, 500);
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
        this.assignDeviceDoctorDialog = true;
        this.selectedHeaders = this.selected[0].doctorFullName;
        this.getAllPatientsData(this.getDoctorId);
      } else {
        this.$toast.error(
          "You must select atleast one device to assign.",
          3000
        );
      }
    },
    assignDevicesToPatient() {
      if (this.selected.length > 0) {
        this.assignDevicePatientDialog = true;
        this.selectedHeadersPatient = this.selected[0].fullName;
        this.getAllPatientsData(this.getDoctorId);
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
        doctorId: this.selectedHeaders?.id,
      };
      if (this.selectedHeaders && this.selectedHeaders !== null) {
        this.checkAssignDevicesToDoctor(data);
        if (
          await this.$refs.assign.open(
            "Some of device are already assigned to doctor. Do You wish to continue?"
          )
        ) {
          this.assignDeviceToDoctor(data);
          this.selected = [];
          this.assignDeviceDoctorDialog = false;
          setTimeout(() => {
            this.getAllDevices();
          }, 500);
          this.$toast.success("Devices assigned to Doctor successfully.");
        }
      }
      this.selectedHeaders = {};
    },
    async getSelectedValuePatient() {
      let macAddress = this.selected.map((data) => data.macAddressFramed);
      let data = {
        devices: macAddress,
        customerId: this.selectedHeadersPatient?.id,
      };
      if (this.selectedHeadersPatient && this.selectedHeadersPatient !== null) {
        this.checkAssignDevicesToPatient(data);
        if (
          await this.$refs.assign.open(
            "Some of device are already assigned to customer. Do You wish to continue?"
          )
        ) {
          this.assignDeviceToPatient(data);
          this.selected = [];
          this.assignDevicePatientDialog = false;
          setTimeout(() => {
            this.getAllDevices();
          }, 500);
          this.$toast.success("Devices assigned to Patient successfully.");
        }
      }
      this.selectedHeadersPatient = {};
    },
  },
  watch: {
    editedItem() {
      this.getAllDevices();
    },
  },
  mounted() {
    this.getAllDevices();
  },
  components: { PageHeader, ConfirmDialog, DeviceAssignDialog },
};
</script>

<style scoped>
.v-item-group {
  display: flex;
  justify-content: space-evenly;
}
.table th {
  font-size: 16px !important;
}
.table tr > td {
  font-size: 24px !important;
}
.table .v-data-footer__select,
.table .v-select__selection,
.table .v-data-footer__pagination {
  font-size: 1rem;
}
@media only screen and (max-width: 960px) {
  .table th {
    font-size: 12px !important;
  }
  .table tr > td {
    font-size: 16px !important;
  }
  .table .v-data-footer__select,
  .table .v-select__selection,
  .table .v-data-footer__pagination {
    font-size: 0.69rem;
  }
}

.btn {
  padding: 9px;
  color: #fff;
  margin-left: 12px;
  border-radius: 10px;
}
.btn-orange {
  background-color: #f58220;
}
.btn-info {
  background-color: #1ad2d9;
}
</style>
