<template>
  <!-- <v-card class="mx-auto mt-5" :style="styles">
    <v-container :style="styles">
    <v-row no-gutters :class="cls">
      <v-col>
        <v-card>
          <slot></slot>
        </v-card>
      </v-col>
    </v-row>
    </v-container>
  </v-card> -->
  <v-card
    :max-width="wdh"
    class="mx-auto"
    :class="cls"
    @click="$emit('goToLink')"
  >
    <v-row dense no-gutters>
      <v-col :cols="cols">
        <v-card :color="colors" dark>
          <slot></slot>
          <div :style="styles">
            <v-card-title class="text-h5"> {{ title }} </v-card-title>

            <v-card-actions>
              <h4 class="lighten-5 ml-5">{{ phone }}</h4>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ["styles", "cls", "colors", "title", "phone", "wdh", "cols"],
  emits: ["goToLink"],
};
</script>

<style scoped></style>
