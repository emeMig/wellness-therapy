<template>
  <div id="ordenesDialog" class="text-center">
    <v-dialog
      v-model="dialog"
      @click:outside="closeDialogWithoutSaving"
    >

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ $t('Global.WorkOrders.titleDialog') }}
        </v-card-title>

        <v-card-text>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="closeDialogWithoutSaving"
          >
            {{ $t('Global.Actions.cancelar') }}
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="closeDialog"
          >
            {{ $t('Global.Actions.add') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    dialog: Boolean
  },
  data () {
    return {
      selectedEnsayos: [],
    }
  },
  watch: {
    'item': function (item) {
      this.item = item
    },
  },
  methods: {
    closeDialog () {
      this.$emit('createOrden', this.item)
      this.$emit('closeDialog')
    },
    closeDialogWithoutSaving () {
      this.$emit('closeDialog')
    }
  }
}
</script>
