<template>
  <div>
    <titulo :titulo="$t('Global.Test.titulo')"/>
    <busqueda id="busqueda"/>
    <tabla-modelo
      :headers="headers"
      :items="items"
      @createItem="createItem"
      @updateItem="updateItem"
      @deleteItem="deleteItem"
    ></tabla-modelo>
    <confirm-dialog
      ref="confirmDialog"
      :title="confirmDialogTitle"
      :message="confirmDialogMessage"
    />
  </div>
</template>

<script>
import TablaModelo from '@/components/Modelos/TablaModelo.vue';
import json from '@/utils/data/ensayos-sample.json';
import Titulo from "@/components/Modelos/TituloModelo";
import Busqueda from "@/components/Modelos/BusquedaModelo";
import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'
export default {
  name: "GestionEnsayos",
  components: {
    TablaModelo,
    Titulo,
    Busqueda,
    ConfirmDialog
  },
  data() {
    return {
      headers: [
        { text: '', value: 'data-table-expand' },
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
        { text: this.$t('Global.Actions.acciones'), value: 'actions', align: 'center', sortable: false, width: "130px" }
      ],
      confirmDialogTitle: "",
      confirmDialogMessage: null,
      items: json
    }
  },
  methods: {
    async createItem(item){
      this.confirmDialogTitle = this.$t('Global.Test.guardarEnsayo')
      this.confirmDialogMessage = this.$t('Global.Test.confirmacionGuardarEnsayo')
      const confirm = await this.$refs.confirmDialog.open()
      if (confirm) {
        item.id = this.items.length + 1
        this.items.push(item)
      }
    },
    async updateItem(item){
      this.confirmDialogTitle = this.$t('Global.Test.actualizarEnsayo')
      this.confirmDialogMessage = this.$t('Global.Test.confirmacionActualizarEnsayo')
      const confirm = await this.$refs.confirmDialog.open()
      if (confirm) {
        this.items.splice(item.id - 1, 1, item)
      }
    },
    async deleteItem(item){
      this.confirmDialogTitle = this.$t('Global.Test.eliminarEnsayo')
      this.confirmDialogMessage = this.$t('Global.Test.confirmacionEliminarEnsayo')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm) return
      this.items.splice(this.items.indexOf(item), 1)
      for (let i = item.id - 1; i < this.items.length; i++) {
        this.items[i].id = i + 1
      }
    }
  }
}
</script>

<style>

</style>
