<template>
  <v-footer
    app
    padless
    absolute
    inset
    class="relief"
  >
    <v-row
      justify="start"
      align="center"
    >
      <v-col class="text-right px-8">
        Copyright &copy; migueleme
        {{ new Date().getFullYear() }}
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>