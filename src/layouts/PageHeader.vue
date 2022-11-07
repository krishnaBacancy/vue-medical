<template>
  <v-container style="background-color: black" fluid>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm12 md12>
        <v-card></v-card>
        <div class="d-flex justify-center">
          <v-icon class="white--text ml-4">{{ pageIcon }}</v-icon>
          <v-card-title class="text-h5 white--text">{{ title }}</v-card-title>
          <v-spacer></v-spacer>
          <slot></slot>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "PageHeader",
  props: ["title", "pageIcon"],
};
</script>

<style></style>
