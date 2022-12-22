<template>
  <v-dialog v-model="open" persistent max-width="500px">
    <v-card>
      <!-- Title -->
      <v-toolbar color="primary" dark>
        <v-toolbar-title v-html="title"/>
      </v-toolbar>
      <!-- Content -->
      <v-card-text>
        <v-row class="mt-4">
          <span class="body-1 text--primary" v-html="text"/>
        </v-row>
      </v-card-text>
      <!-- Actions -->
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="error" text @click="cancel">{{ $t('buttons.cancel') }}</v-btn>
        <v-btn color="primary" text @click="confirm">{{ $t('buttons.confirm') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'Confirmation',
  props: {
    open: { type: Boolean, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    callback: { type: Function, required: true }
  },
  methods: {
    // cancels the creation of the user
    cancel () {
      // close the dialog
      this.$emit('closeConfirmation')
    },
    // creates a new user
    confirm () {
      // close the dialog
      this.$emit('closeConfirmation')
      // and, if a callback is given, execute it
      if (this.callback) {
        this.callback()
      }
    }
  }
}
</script>

<style scoped>

</style>
