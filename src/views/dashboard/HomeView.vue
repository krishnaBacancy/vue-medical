<template>
  <v-container>
    <v-progress-circular
      indeterminate
      color="amber"
      v-if="loadingStatus"
    ></v-progress-circular>
    <div
      v-for="patient in getPatients"
      :key="patient._id"
      class="grid-container"
      v-else
    >
      <CustomCard
        class="grid-item ml-3 mt-3"
        :title="
          getFullName(patient.customerfirstName, patient.customerlastName)
        "
        @goToLink="$router.push('/patient-details')"
      >
      </CustomCard>
    </div>
  </v-container>
</template>

<script>
import CustomCard from "@/components/CustomCard.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "HomeView",
  components: {
    CustomCard,
  },
  data() {
    return {
      getDoctorId: localStorage.getItem("user_id"),
    };
  },
  computed: {
    ...mapGetters("doctors", ["getPatients", "loadingStatus"]),
  },
  methods: {
    ...mapActions("doctors", ["getPatientsForDoctor"]),
    getFullName(s1, s2) {
      return s1 + " " + s2;
    },
    onClick(path) {
      this.$router.push(path);
    },
  },
  mounted() {
    if (this.getDoctorId) {
      this.getPatientsForDoctor(this.getDoctorId);
    }
  },
};
</script>

<style scoped>
.grid-container {
  /* display: grid; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* height: 300px; */
  /* column-gap: 50px; */
  /* grid-gap: 2rem; */
  /* grid-template-columns: auto auto auto; */
  /* padding: 10px; */
  /* margin-left: auto; */
  /* margin-right: auto; */
  /* max-width: 600px; */
}
.grid-item {
  cursor: pointer;
  background-color: lightgrey;
  border: 1px solid rgba(0, 0, 0, 0.8);
  width: 50%;
  /* padding: 10px; */
  /* font-size: 30px; */
  /* text-align: center; */
  /* min-width: 600px; */
}
.grid-item:hover {
  scale: 1.05;
}

@media all and (max-width: 800px) {
  .grid-container {
    /* When on medium sized screens, we center it by evenly distributing empty space around items */
    justify-content: flex-start;
  }
}
@media all and (max-width: 500px) {
  .grid-container {
    /* On small screens, we are no longer using row direction but column */
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
}
</style>
