<template>
  <div>
    <PageHeader
      title="Device List"
      pageIcon="mdi-arrow-left"
      @goBack="$router.go(-1)"
    />
    <div class="table-changes">
      <div class="text-right">
        <v-btn
          color="warning"
          height="53"
          width="248"
          class="text-start ml-auto mb-5"
          v-if="role === 'Doctor'"
          @click="assignDevicesToPatient"
          >Assign to Patient
        </v-btn>
      </div>

      <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        overlay-color="white"
        persistent
        v-model="assignDialog"
      >
        <v-card class="pa-sm-10 pa-5">
          <h4 class="text-h6 font-weight-bold mb-5">
            Select below patient to assign device
          </h4>
          <v-select
            class="mb-3 theme-select-box"
            :items="getAllPatientsOnly"
            v-model="selectedHeaders"
            @change="getSelectedValue"
            item-text="fullName"
            placeholder="Select Patient"
            return-object
          ></v-select>
          <v-btn
            color="warning"
            class="px-10"
            large
            outlined
            @click="assignDialog = false"
          >
            Cancel
          </v-btn>
        </v-card>
      </v-dialog>

      <v-data-table
        item-key="name"
        class="elevation-1"
        loading
        loading-text="Loading... Please wait"
        :items-per-page="5"
        v-if="loadingStatus"
      ></v-data-table>
      <v-data-table
        v-else
        :headers="headers"
        :items="getPatients"
        :items-per-page="5"
        class="elevation-1 table"
        show-select
        v-model="selected"
      >
      </v-data-table>
    </div>
    <DeviceAssignDialog ref="assign" />
  </div>
</template>

<script>
import DeviceAssignDialog from "@/components/DeviceAssignDialog.vue";
import PageHeader from "@/layouts/PageHeader.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      icon: "justify",
      getDoctorId: localStorage.getItem("user_id"),
      role: localStorage.getItem("role"),
      selectedHeaders: {},
      selected: [],
      assignDialog: false,
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
      isValidAssignPatient: false,
    };
  },
  computed: {
    ...mapGetters("doctors", [
      "getPatients",
      "getAllPatientsOnly",
      "loadingStatus",
    ]),
  },
  methods: {
    ...mapActions("doctors", ["getPatientsForDoctor", "getAllPatientsData"]),
    ...mapActions("devices", [
      "checkAssignDevicesToPatient",
      "assignDeviceToPatient",
    ]),
    async checkValidAssignPatient() {
      this.isValidAssignPatient = await this.$refs.assign.open(
        "Some of device are already assigned to doctor. Do You wish to continue?"
      );
      return this.isValidAssignPatient;
    },
    assignDevicesToPatient() {
      if (this.selected.length > 0) {
        this.assignDialog = true;
        this.selectedHeaders = this.selected[0].fullName;
        this.getAllPatientsData(this.getDoctorId);
      } else {
        this.$toast.error("You must select atleast one device to assign.", {
          timeout: 3000,
        });
      }
    },
    getSelectedValue() {
      let macAddress = this.selected.map((data) => data.macAddressFramed);
      let data = {
        devices: macAddress,
        customerId: this.selectedHeaders?.id,
      };
      if (this.selectedHeaders && this.selectedHeaders !== null) {
        this.checkAssignDevicesToPatient(data)
          .then((res) => {
            if (res.message === "devices assigned to  customer successfully.") {
              this.selected = [];
              this.assignDialog = false;
              setTimeout(() => {
                this.getPatientsForDoctor(this.getDoctorId);
              }, 500);
              this.$toast.success(res.message, { timeout: 3000 });
            } else {
              this.checkValidAssignPatient().then((res) => {
                console.log(res);
                this.assignDeviceToPatient(data);
                this.selected = [];
                this.assignDialog = false;
                setTimeout(() => {
                  this.getPatientsForDoctor(this.getDoctorId);
                }, 500);
                this.$toast.success(
                  "device assigned to customer successfully.",
                  {
                    timeout: 3000,
                  }
                );
              });
            }
          })
          .catch((err) => console.log(err));
      }
      this.selectedHeaders = {};
    },
  },
  mounted() {
    this.getPatientsForDoctor(this.getDoctorId);
  },
  components: { PageHeader, DeviceAssignDialog },
};
</script>

<style scoped>
.v-item-group {
  display: flex;
  justify-content: space-evenly;
}
</style>
