<template>
  <v-card class="mx-auto mt-5" :style="styles">
    <!-- <v-container :style="styles"> -->
    <v-row no-gutters>
      <v-col>
        <v-card>
          <slot></slot>
        </v-card>
      </v-col>
    </v-row>
    <!-- </v-container> -->
  </v-card>
</template>

<script>
export default {
  props: ["styles"],
};
</script>
