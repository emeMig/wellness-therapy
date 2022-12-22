<template>
  <div>
    <titulo :titulo="$t('Global.Clients.titulo')"/>
    <busqueda id="busqueda" :text="options.textFilter.text" @save-filter="saveFilter"/>
    <tabla-modelo
      :headers="headers"
      :items="items"
      :item-key="itemId"
      :item-table="itemTable"
      :item-id="itemId"
      :options-table="options"
      :total-items="totalItems"
      :error-text="$t('Global.Clients.errorById')"
      :form-title="$t('Global.Clients.cliente')"
      @createItem="createItem"
      @updateItem="updateItem"
      @deleteItem="deleteItem"
      @pagination-data="changePaginationData"
    ></tabla-modelo>
    <confirm-dialog
      ref="confirmDialog"
      :title="confirmDialogTitle"
      :message="confirmDialogMessage"
    />
    <overlay :overlay="overlay"></overlay>
  </div>
</template>

<script>
import TablaModelo from '@/components/Modelos/TablaModelo.vue';
import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'
import Titulo from "@/components/Modelos/TituloModelo";
import Busqueda from "@/components/Modelos/BusquedaModelo";
import validations from "@/utils/validations";
import CrudService from "@/services/crud.service";
import TableNames from "@/config/table-names";
import { OPEN_SNACKBAR } from "@/store/actions/snackbar";
import Overlay from "@/components/Overlay"

export default {
  name: "GestionClientes",
  components: {
    TablaModelo,
    Titulo,
    Busqueda,
    ConfirmDialog,
    Overlay
  },
  data() {
    return {
      headers: [
        { text: '', value: 'data-table-expand' },
        { text: this.$t('Global.Clients.organismo'), value: 'organismo', align: 'left', sortable: true, rules: [validations.required, validations.maxLength120] },
        { text: this.$t('Global.Clients.direccion'), value: 'direccion', align: 'left', sortable: true, rules: [validations.maxLength45] },
        { text: this.$t('Global.Clients.observaciones'), value: 'observaciones', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Clients.personaContacto1'), value: 'personaContacto1', align: 'left', sortable: true, rules: [validations.maxLength145] },
        { text: this.$t('Global.Clients.telefono1'), value: 'telefono1', align: 'left', sortable: true, rules: [validations.numeric, validations.maxLength45] },
        { text: this.$t('Global.Clients.email1'), value: 'email1', align: 'left', sortable: true, rules: [validations.email, validations.maxLength100] },
        { text: this.$t('Global.Clients.personaContacto2'), value: 'personaContacto2', align: 'left', sortable: true, rules: [validations.maxLength145] },
        { text: this.$t('Global.Clients.telefono2'), value: 'telefono2', align: 'left', sortable: true, rules: [validations.numeric,validations.maxLength45] },
        { text: this.$t('Global.Clients.email2'), value: 'email2', align: 'left', sortable: true, rules: [validations.email,validations.maxLength100] },
        { text: this.$t('Global.Actions.acciones'), value: 'actions', align: 'center', sortable: false, width: "130px" },
      ],
      items: [],
      confirmDialogTitle: "",
      confirmDialogMessage: null,
      overlay: false,
      itemTable: TableNames.CLIENT,
      itemId:"idCliente",
      options :{
        sorting: {
          ascending: false,
          column: "organismo"
        },
        pagination:{
          pageSize: 10,
          page: 1
        },
        textFilter: {
          text: ""
        }
      },
      totalItems: 0
    }
  },
  methods: {
    //Paginacion
    changePaginationData(options){
      this.options = options
      this.getClientes()
    },
    //Filtrado
    saveFilter(text){
      this.options.textFilter.text=text
      this.getClientes()
    },
    getClientes(){
      this.overlay=true
      CrudService.count(this.itemTable, this.options)
        .then((response) => {
          this.totalItems = response.data
        })
        .catch((e) => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: e.message, color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally(() => {
          CrudService.list(this.itemTable, this.options)
            .then((response) => {this.items = response.data})
            .catch((e) => {
              this.$store.dispatch(OPEN_SNACKBAR, {text: e.message, color: 'error', icon:'mdi-alert-circle-outline'})
            })
            .finally(() => this.overlay =false)
        })
    },
    async createItem(item){
      this.confirmDialogTitle = this.$t('Global.Clients.guardarCliente')
      this.confirmDialogMessage = this.$t('Global.Clients.confirmacionGuardarCliente')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm){
        this.getClientes()
        return
      }
      this.overlay=true
      if(item.email1 === "") item.email1 = null
      if(item.email2 === "") item.email2 = null
      CrudService.insert(this.itemTable, item)
        .then(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Clients.guardado'), color: 'success', icon:'mdi-check-circle-outline'})
        })
        .catch(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Clients.guardadoError'), color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally(() => this.getClientes())
    },
    async updateItem(item){
      this.confirmDialogTitle = this.$t('Global.Clients.actualizarCliente')
      this.confirmDialogMessage = this.$t('Global.Clients.confirmacionActualizarCliente')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm){
        this.getClientes()
        return
      }
      this.overlay=true
      if(item.email1 === "") item.email1 = null
      if(item.email2 === "") item.email2 = null
      CrudService.update(this.itemTable, item)
        .then(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Clients.actualizado'), color: 'success', icon:'mdi-check-circle-outline'})
        })
        .catch(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Clients.actualizadoError'), color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally(() => this.getClientes())

    },
    async deleteItem(item){
      this.confirmDialogTitle = this.$t('Global.Clients.eliminarCliente')
      this.confirmDialogMessage = this.$t('Global.Clients.confirmacionEliminarCliente')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm){
        this.getClientes()
        return
      }
      this.overlay=true
      CrudService.deleteById(this.itemTable, item[this.itemId])
        .then(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Clients.borrado'), color: 'success', icon:'mdi-check-circle-outline'})
        })
        .catch(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Clients.borradoError'), color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally(() => this.getClientes())
    },
  },
  mounted() {
    this.getClientes()
  }

}
</script>

<style>

</style>
