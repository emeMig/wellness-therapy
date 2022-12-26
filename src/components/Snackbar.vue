<template>
  <v-snackbar
    shaped
    v-model="snackbar.visible"
    :timeout="snackbar.timeout"
    :color="snackbar.color"
    :bottom="snackbar.y === 'bottom'"
    :top="snackbar.y === 'top'"
    :left="snackbar.x === 'left'"
    :right="snackbar.x === 'right'"
    max-height="90px"
    max-width="400px"
  >
    <v-icon dark left>{{ snackbar.icon }}</v-icon>
    <span >
      {{ snackbar.text }}
    </span>
    <v-btn fab text @click="closeSnackbar"><v-icon>close</v-icon></v-btn>

  </v-snackbar>
</template>

<script>
import { CLOSE_SNACKBAR } from '@/store/actions/snackbar'

export default {
  computed: {
    snackbar () {
      return this.$store.state.snackbar.snackbar
    }
  },
  methods: {
    /**
     * Closes the snackbar
     */
    closeSnackbar () {
      // invoke the method to close the snackbar
      this.$store.dispatch(CLOSE_SNACKBAR)
    }
  }
}
</script>
