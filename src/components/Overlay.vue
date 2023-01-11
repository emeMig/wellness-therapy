<template>
  <v-overlay :value="overlay" style="z-index:9;">
    <v-progress-circular indeterminate size="94"></v-progress-circular>
  </v-overlay>
</template>

<script>

export default {
  name: 'Overlay',
  props: {
    overlay: {type: Boolean, default: () => false}
  }
}
</script>
