<template>
  <div>
    <titulo :titulo="$t('Global.Users.titulo')"/>
    <busqueda id="busqueda"/>
    <tabla-modelo
      :headers="headers"
      :items="items"
      item-key="id"
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
import TablaModelo from '@/components/Modelos/TablaModelo';
import json from '@/utils/data/usuarios-sample.json';
import Titulo from "@/components/Modelos/TituloModelo";
import Busqueda from "@/components/Modelos/BusquedaModelo";
import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'
export default {
  name: "GestionUsuarios",
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
        { text: this.$t('Global.Users.nombre'), value: 'nombre', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Users.apellido1'), value: 'apellido1', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Users.apellido2'), value: 'apellido2', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Users.fechaAlta'), value: 'fechaAlta', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Users.email'), value: 'email', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Users.rol'), value: 'rol', align: 'left', sortable: true, rules: [] },
        // { text: this.$t('Global.Users.table.bloqueado'), value: 'bloqueado', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Actions.acciones'), value: 'actions', align: 'center', sortable: false, width: "130px" }
      ],
      confirmDialogTitle: "",
      confirmDialogMessage: null,
      items: json
    }
  },
  methods: {
    async createItem(item){
      this.confirmDialogTitle = this.$t('Global.Users.guardarUsuario')
      this.confirmDialogMessage = this.$t('Global.Users.confirmacionGuardarUsuario')
      const confirm = await this.$refs.confirmDialog.open()
      if (confirm) {
        item.id = this.items.length + 1
        this.items.push(item)
      }
    },
    async updateItem(item){
      this.confirmDialogTitle = this.$t('Global.Users.actualizarUsuario')
      this.confirmDialogMessage = this.$t('Global.Users.confirmacionActualizarUsuario')
      const confirm = await this.$refs.confirmDialog.open()
      if (confirm) {
        this.items.splice(item.id - 1, 1, item)
      }
    },
    async deleteItem(item){
      this.confirmDialogTitle = this.$t('Global.Users.eliminarUsuario')
      this.confirmDialogMessage = this.$t('Global.Users.confirmacionEliminarUsuario')
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
