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
      :value="value"
      required
      @input="handleInput"
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
    hidden: String,
    value: String,
  },
  model: {
    prop: "hidden",
    event: "blur",
  },
  methods: {
    handleInput(value) {
      this.$emit("blur", value);
    },
  },
  computed: {
    hasErrors() {
      return !!this.errors.length;
    },
  },
};
</script>

<style scoped></style>
