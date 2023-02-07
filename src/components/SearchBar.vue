<template>
  <v-card>
    <div class="d-inline-flex">
      <v-icon>mdi-magnify</v-icon>
      <input
        type="search"
        placeholder="Search by MAC Address"
        v-model="$store.state.doctors.searchTerm"
        class="pl-2 search-input"
      />
      <v-icon
        class="ml-2"
        color="warning"
        @click="$store.state.doctors.searchTerm = ''"
        >mdi-close-circle</v-icon
      >
    </div>
  </v-card>
</template>

<style scoped>
input:focus {
  outline: none;
}
.theme--dark.v-card {
  background: #2b2934;
}
.v-icon.v-icon.v-icon--link {
  color: #212121 !important;
}
.v-sheet.v-card {
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 11px 14px;
  box-shadow: 2px 5px 16px rgba(0, 0, 0, 0.08);
}
.search-input {
  min-width: 200px;
}
</style>
