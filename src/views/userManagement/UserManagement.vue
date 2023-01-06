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
      <div class="mt-3 mb-3 pa-2">
        <v-btn
          color="warning"
          height="53"
          width="248"
          class="text-start mr-auto mb-5"
          v-if="role === 'Doctor'"
          @click="assignDevicesToPatient"
          >Assign to Patient
        </v-btn>
        <v-select
          :items="getAllPatientsOnly"
          v-if="toggleSelect"
          v-model="selectedHeaders"
          :menu-props="{ value: toggleSelect }"
          @change="getSelectedValue"
          item-text="fullName"
          return-object
        ></v-select>
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
          class="elevation-1 table"
          show-select
          v-model="selected"
          :height="$vuetify.breakpoint.smAndDown ? '600' : '350'"
          dark
        >
        </v-data-table>
      </div>

      <DeviceAssignDialog ref="assign" />
    </v-container>
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
      toggleSelect: false,
      selectedHeaders: {},
      selected: [],
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
    assignDevicesToPatient() {
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
    async getSelectedValue() {
      let macAddress = this.selected.map((data) => data.macAddressFramed);
      let data = {
        devices: macAddress,
        customerId: this.selectedHeaders?.id,
      };
      if (this.selectedHeaders && this.selectedHeaders !== null) {
        this.checkAssignDevicesToPatient(data);
        if (
          await this.$refs.assign.open(
            "Some of device are already assigned to customer. Do You wish to continue?"
          )
        ) {
          this.assignDeviceToPatient(data);
          this.selected = [];
          setTimeout(() => {
            this.getPatientsForDoctor(this.getDoctorId);
          }, 500);
          this.$toast.success("Devices assigned to customer successfully.");
        }
      }
      this.selectedHeaders = {};
      this.toggleSelect = false;
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
.table >>> th {
  font-size: 16px !important;
}
.table >>> tr > td {
  font-size: 20px !important;
}
.table >>> tr {
  margin-top: 30px !important;
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
