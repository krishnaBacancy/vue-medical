<template>
  <div class="d-flex" style="width: 100%">
    <v-card-title class="font-weight-bold pl-0">
      {{ title }}
    </v-card-title>
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
.v-card__title {
  font-size: 30px;
}
</style>
