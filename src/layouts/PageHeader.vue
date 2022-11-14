<template>
  <v-container
    style="background-color: rgba(0, 0, 0, 0.5)"
    class="main__container mt-8"
    fluid
  >
    <v-layout row wrap>
      <v-flex d-flex xs12 sm12 md12>
        <v-card></v-card>
        <v-icon class="white--text ml-4">{{ pageIcon }}</v-icon>
        <div class="d-flex" style="width: 100%">
          <v-card-title class="white--text bold">{{ title }}</v-card-title>
          <!-- <v-spacer></v-spacer> -->
          <v-btn
            class="align-self-center ml-auto mr-10"
            :color="colorName"
            rounded
            @click="$emit('addNewPatient')"
            v-if="btnIconName"
          >
            <v-icon>{{ btnIconName }}</v-icon>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "PageHeader",
  props: ["title", "pageIcon", "btnName", "colorName", "btnIconName"],
  methods: {
    addPatient() {
      this.$emit("addNewPatient");
    },
  },
};
</script>

<style scoped>
.main__container {
  font-family: "Gilroy";
}
</style>
