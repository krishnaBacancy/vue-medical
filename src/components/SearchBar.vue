<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap style="margin-left: -14px">
      <v-flex d-flex xs12 sm8 md4>
        <div class="">
          <v-card
            dark
            class="ml-2 mb-2 pa-2"
            style="width: 100%; border-radius: 50px"
          >
            <div>
              <v-icon>mdi-magnify</v-icon>
              <input
                type="search"
                placeholder="Search"
                v-model="$store.state.doctors.searchTerm"
                class="ml-2"
                style="color: white"
              />
              <v-icon class="ml-2">mdi-close-circle</v-icon>
            </div>
          </v-card>
          <v-spacer></v-spacer>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      searchText: this.searchTerm,
    };
  },
  computed: {
    ...mapState("doctors", ["searchTerm"]),
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}
</style>
