<template>
  <div>
    <titulo :titulo="$t('Global.Manufacturers.titulo')"/>
    <busqueda id="busqueda" :text="options.textFilter.text" @save-filter="saveFilter"/>
    <tabla-modelo
      :headers="headers"
      :items="items"
      :item-key="itemId"
      :item-table="itemTable"
      :item-id="itemId"
      :options-table="options"
      :total-items="totalItems"
      :error-text="$t('Global.Manufacturers.errorById')"
      :form-title="$t('Global.Manufacturers.fabricante')"
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
import TablaModelo from '@/components/Modelos/TablaModelo.vue'
import Titulo from '@/components/Modelos/TituloModelo'
import Busqueda from '@/components/Modelos/BusquedaModelo'
import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'
import validations from "@/utils/validations"
import CrudService from "@/services/crud.service"
import TableNames from "@/config/table-names"
import {OPEN_SNACKBAR} from "@/store/actions/snackbar"
import Overlay from "@/components/Overlay"

export default {
  name: "GestionFabricantes",
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
        { text: this.$t('Global.Manufacturers.nombreCompleto'), value: 'nombre', align: 'left', sortable: true, rules: [validations.maxLength200, validations.required] },
        { text: this.$t('Global.Actions.acciones'), value: 'actions', align: 'center', sortable: false, width: "130px" }
      ],
      confirmDialogTitle: "",
      confirmDialogMessage: null,
      items: [],
      overlay: false,
      itemTable: TableNames.MANUFACTURE,
      itemId:"idFabricante",
      options :{
        sorting: {
          ascending: false,
          column: "nombre"
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
      this.getFabricantes()
    },
    //Filtrado
    saveFilter(text){
      this.options.textFilter.text=text
      this.getFabricantes()
    },
    //Listado
    getFabricantes(){
      this.overlay =true
      CrudService.count(TableNames.MANUFACTURE, this.options)
        .then((response) => {
          this.totalItems = response.data
        })
        .catch((e) => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: e.message, color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally(() => {
          CrudService.list(TableNames.MANUFACTURE, this.options)
            .then((response) => {
              this.items = response.data
            })
            .catch((e) => {
              this.$store.dispatch(OPEN_SNACKBAR, {text: e.message, color: 'error', icon:'mdi-alert-circle-outline'})
            })
            .finally(() => this.overlay = false)
        })
    },
    async createItem(item){
      this.confirmDialogTitle = this.$t('Global.Manufacturers.guardarFabricante')
      this.confirmDialogMessage = this.$t('Global.Manufacturers.confirmacionGuardarFabricante')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm){
        this.getFabricantes()
        return
      }
      this.overlay =true
      CrudService.insert(TableNames.MANUFACTURE, item)
        .then(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Manufacturers.guardado'), color: 'success', icon:'mdi-check-circle-outline'})
        })
        .catch(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Manufacturers.guardadoError'), color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally(() => this.getFabricantes())
    },
    async updateItem(item){
      this.confirmDialogTitle = this.$t('Global.Manufacturers.actualizarFabricante')
      this.confirmDialogMessage = this.$t('Global.Manufacturers.confirmacionActualizarFabricante')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm){
        this.getFabricantes()
        return
      }
      this.overlay =true
      CrudService.update(TableNames.MANUFACTURE, item)
        .then(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Manufacturers.actualizado'), color: 'success', icon:'mdi-check-circle-outline'})
        })
        .catch(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Manufacturers.actualizadoError'), color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally(() => this.getFabricantes())
    },
    async deleteItem(item){
      this.confirmDialogTitle = this.$t('Global.Manufacturers.eliminarFabricante')
      this.confirmDialogMessage = this.$t('Global.Manufacturers.confirmacionEliminarFabricante')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm){
        this.getFabricantes()
        return
      }
      this.overlay =true
      CrudService.deleteById(TableNames.MANUFACTURE, item.idFabricante)
        .then(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Manufacturers.borrado'), color: 'success', icon:'mdi-check-circle-outline'})
        })
        .catch(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Manufacturers.borradoError'), color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally(() => this.getFabricantes())
    }
  },
  mounted() {
    this.getFabricantes()
  }
}
</script>

<style>

</style>
