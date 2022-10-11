<template>
  <v-container>
    <h1>User Management</h1>
    <br /><br />
    <v-row align-content="center" align-content-sm="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select :items="[1, 2, 3, 4]" filled label="Filled style"></v-select>
      </v-col>
    </v-row>
    <div>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="elevation-1"
        height="350"
      ></v-data-table>
    </div>
  </v-container>
</template>

<script>
import roles from "@/api/roles";

export default {
  data() {
    return {
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
      ],
    };
  },
  methods: {
    async getRoles() {
      const { data } = await roles.getAllRolesApi();
      console.log("data", data);
    },
  },
  mounted() {
    this.getRoles();
  },
};
</script>

<style></style>
