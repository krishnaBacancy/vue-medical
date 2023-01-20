<template>
  <div>
    <v-dialog
      v-model="dialog"
      :width="$vuetify.breakpoint.smAndUp ? '500px' : '400px'"
      height="500px"
      :max-width="options.width"
      :style="{ zIndex: options.zIndex }"
      @keydown.esc="cancel"
      overlay-color="black"
    >
      <v-card class="pa-sm-10 pa-5">
        <h4 class="text-h6 font-weight-bold mb-5">
          {{ title }}
        </h4>
        <v-card-text
          v-show="!!message"
          class="pa-4 black--text"
          v-html="message"
        ></v-card-text>
        <v-btn class="px-sm-8" large color="warning" @click.native="agree">
          Delete
        </v-btn>
        <v-btn
          large
          class="ml-5 px-sm-6"
          color="warning"
          outlined
          text
          @click.native="cancel"
        >
          Cancel
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ConfirmDialog",
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      message: null,
      title: null,
      options: {
        color: "dark",
        zIndex: 200,
        noconfirm: false,
      },
    };
  },
  methods: {
    open(title, message, options) {
      this.dialog = true;
      this.title = title;
      this.message = message;
      this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.resolve(true);
      this.dialog = false;
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    },
  },
};
</script>
