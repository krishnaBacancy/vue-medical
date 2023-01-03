<template>
  <div>
    <v-dialog
      v-model="dialog"
      :width="$vuetify.breakpoint.smAndUp ? '750px' : '400px'"
      :max-width="options.width"
      :style="{ zIndex: options.zIndex }"
      @keydown.esc="cancel"
      overlay-color="white"
      dark
    >
      <v-card>
        <v-toolbar dark :color="options.color" dense flat>
          <v-toolbar-title class="text-h6 font-weight-bold grey--text">
            {{ title }}
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text
          v-show="!!message"
          class="pa-4 black--text"
          v-html="message"
        ></v-card-text>
        <v-card-actions class="pt-3">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.native="cancel">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click.native="agree">
            Assign
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DeviceAssignDialog",
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
