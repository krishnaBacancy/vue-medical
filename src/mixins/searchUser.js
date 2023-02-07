export default {
  data() {
    return {
      searchUserString: "",
    };
  },
  methods: {
    searchUser(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value
          .trim()
          .toString()
          .toLocaleUpperCase()
          .indexOf(search.toLocaleUpperCase()) !== -1
      );
    },
  },
};
