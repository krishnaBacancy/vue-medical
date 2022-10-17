<template>
  <div>
    <h1>Patients</h1>
    <v-progress-circular
      indeterminate
      color="pink"
      v-if="loadingStatus"
    ></v-progress-circular>
    <div v-for="patient in getAllPatientsOnly" :key="patient.id" v-else>
      <div>
        <CustomCard
          cls="flex-nowrap"
          :cols="'12'"
          :wdh="1000"
          :colors="'#1F7087'"
          :title="getFullName(patient.firstName, patient.lastName)"
          :phone="patient.mobileNo"
          class="mt-5 card__item"
          @goToLink="$router.push(`/patients/patient/${patient.id}`)"
          :styles="'display: flex; justify-content: space-around'"
        >
        </CustomCard>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CustomCard from "@/components/CustomCard.vue";
export default {
  name: "PatientsData",
  data() {
    return {
      getDoctorId: localStorage.getItem("user_id"),
    };
  },
  computed: {
    ...mapGetters("doctors", ["getAllPatientsOnly", "loadingStatus"]),
  },
  methods: {
    ...mapActions("doctors", ["getAllPatientsData"]),
    getFullName(s1, s2) {
      return s1 + " " + s2;
    },
  },
  mounted() {
    if (this.getDoctorId) {
      this.getAllPatientsData(this.getDoctorId);
    }
  },
  components: { CustomCard },
};
</script>

<style scoped>
.card__item:hover {
  scale: 1.03;
}
</style>
