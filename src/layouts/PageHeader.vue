<template>
  <v-container style="background-color: black" fluid>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm12 md12>
        <v-card></v-card>
        <v-icon class="white--text ml-4">{{ pageIcon }}</v-icon>
        <div class="d-flex" style="width: 100%">
          <v-card-title class="text-h5 white--text">{{ title }}</v-card-title>
          <!-- <v-spacer></v-spacer> -->
          <v-btn
            class="align-self-center ml-auto mr-10"
            :color="colorName"
            rounded
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
};
</script>

<style></style>
