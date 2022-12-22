<template>
  <v-dialog
      v-model="dialog"
      :max-width="options.width"
      @keydown.esc="cancel"
      v-bind:style="{ zIndex: options.zIndex }"
      persistent
  >
    <v-card class="pa-2 relief-outset">
      <v-card-title class="pb-3">
        <span class="margin-auto primary--text">{{ title || $t('Global.ConfirmDialog.defaultTitle') }}</span>
      </v-card-title>
      <v-card-text> {{ message || $t('Global.ConfirmDialog.defaultMessage') }}</v-card-text>
      <v-card-actions class="px-0 mt-n3 d-flex justify-end">
        <v-btn color="primary darken-1" text @click.native="agree">{{ $t("Global.ConfirmDialog.buttonTextOk") }}</v-btn>
        <v-btn color="primary darken-1" text @click.native="cancel">{{ $t("Global.ConfirmDialog.buttonTextNo") }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: {
    message: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    confirmation: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: function () {
        return {
          color: 'primary',
          width: 400,
          zIndex: 200
        }
      }
    },
  },
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
  }),
  methods: {
    open() {
      this.dialog = true;
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
    }
  }
};
</script>
