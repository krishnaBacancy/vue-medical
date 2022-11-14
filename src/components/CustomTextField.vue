<template>
  <div class="block">
    <v-text-field
      :label="label"
      filled
      dense
      :name="name"
      :type="type"
      :rules="fieldRules"
      :placeholder="placeholder"
      required
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    fieldRules: Array,
    errors: Array,
    title: String,
    label: String,
    placeholder: String,
    name: String,
    type: String,
  },
  computed: {
    hasErrors() {
      return !!this.errors.length;
    },
  },
};
</script>

<style scoped></style>
