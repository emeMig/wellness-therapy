<template>
  <div id="ordenesDialog" class="text-center">
    <v-dialog
      v-model="dialog"
      @click:outside="closeDialogWithoutSaving"
    >

      <v-card flat class="relief">
        <v-card-title>
          <titulo :titulo="$t('Global.Test.titulo')"/>
        </v-card-title>

        <v-card-text>
          <busqueda-modelo></busqueda-modelo>
          <tabla-modelo
            :headers="headers"
            :items="item.ensayos"
            hide-button
            show-select
            @selectedItem="selectedEnsayo"
            item-key="codigo"
            sort-by="codigo"
            hide-actions
            hide-expansion
          ></tabla-modelo>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="closeDialog"
          >
            {{ $t('Global.Actions.cancelar') }}
          </v-btn>
          <v-spacer></v-spacer>
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
import TablaModelo from "@/components/Modelos/TablaModelo";
import Titulo from '@/components/Modelos/TituloModelo';
import json from "@/utils/data/ensayos-sample.json";
import BusquedaModelo from "@/components/Modelos/BusquedaModelo";
export default {
  components: {BusquedaModelo, TablaModelo, Titulo},
  props: {
    item: Object,
    dialog: Boolean
  },
  data () {
    return {
      selectedEnsayos: [],
      headers: [
        { text: this.$t('Global.Test.codigo'), value: 'codigo', align: 'left', sortable: true, rules: []},
        { text: this.$t('Global.Test.nombre'), value: 'nombre', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Test.descripcion'), value: 'descripcion', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Test.grupoMuestra'), value: 'grupoMuestra', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Test.norma'), value: 'norma', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Test.acreditado'), value: 'acreditado', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Test.tipo'), value: 'tipo', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Test.unidades'), value: 'unidades', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Test.listaCondiciones'), value: 'listaCondiciones', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Test.valorMinimo'), value: 'valorMinimo', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Test.valorMaximo'), value: 'valorMaximo', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Test.producto'), value: 'producto', align: 'left', sortable: true, rules: [] },
        { text: '', value: 'data-table-expand' }
      ],
      items: json
    }
  },
  watch: {
    'item': function (item) {
      this.item = item
    },
  },
  methods: {
    closeDialog () {
      this.$emit('selectedEnsayos', this.selectedEnsayos)
      this.$emit('closeDialog')
    },
    closeDialogWithoutSaving () {
      this.$emit('closeDialog')
    },
    selectedEnsayo (items) {
      this.selectedEnsayos = items
    }
  }
}
</script>
