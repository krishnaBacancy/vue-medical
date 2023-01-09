<template>
  <v-container
    style="background-color: rgba(0, 0, 0, 0.5)"
    class="main__container mt-8"
    fluid
  >
    <v-layout row wrap>
      <v-flex d-flex xs12 sm12 md12>
        <v-icon class="white--text ml-4" @click="$emit('goBack')">{{
          pageIcon
        }}</v-icon>
        <div class="d-flex" style="width: 100%">
          <v-card-title class="white--text bold">{{ title }}</v-card-title>
          <v-btn
            class="align-self-center ml-auto mr-10"
            :color="colorName"
            rounded
            @click="$emit('addNewPatient')"
            v-if="btnIconName && role === 'Doctor'"
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
  data() {
    return {
      role: localStorage.getItem("role"),
    };
  },
};
</script>

<style scoped>
.main__container {
  font-family: "Gilroy";
  border-radius: 20px;
}
</style>
