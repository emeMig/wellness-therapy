<template>
  <div>
    <titulo :titulo="$t('Global.Materials.titulo')"/>
    <busqueda id="busqueda" :text="options.textFilter.text" @save-filter="saveFilter"/>
    <tabla-modelo
      :headers="headers"
      :items="items"
      :item-key="itemId"
      :item-table="itemTable"
      :item-id="itemId"
      :options-table="options"
      :total-items="totalItems"
      :error-text="$t('Global.Materials.errorById')"
      :form-title="$t('Global.Materials.material')"
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
import Titulo from '@/components/Modelos/TituloModelo';
import Busqueda from '@/components/Modelos/BusquedaModelo';
import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'
import validations from "@/utils/validations";
import CrudService from "@/services/crud.service";
import TableNames from "@/config/table-names";
import {OPEN_SNACKBAR} from "@/store/actions/snackbar";
import Overlay from "@/components/Overlay"
export default {
  name: "GestionMateriales",
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
        { text: this.$t('Global.Materials.codigo'), value: 'codigo', align: 'left', sortable: true, rules: [validations.required, validations.maxLength20] },
        { text: this.$t('Global.Materials.nombre'), value: 'nombre', align: 'left', sortable: true, rules: [validations.required, validations.maxLength200] },
        { text: this.$t('Global.Actions.acciones'), value: 'actions', align: 'center', sortable: false, width: "130px" }
      ],
      confirmDialogTitle: "",
      confirmDialogMessage: null,
      items: [],
      overlay: false,
      itemTable: TableNames.MATERIAL,
      itemId:"idMaterial",
      options :{
        sorting: {
          ascending: false,
          column: "codigo"
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
      this.getMateriales()
    },
    //Filtrado
    saveFilter(text){
      this.options.textFilter.text=text
      this.getMateriales()
    },
    getMateriales(){
      this.overlay =true
      CrudService.count(this.itemTable, this.options)
        .then((response) => {
          this.totalItems = response.data
        })
        .catch((e) => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: e.message, color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally(() => {
          CrudService.list(this.itemTable, this.options)
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
      this.confirmDialogTitle = this.$t('Global.Materials.guardarMaterial')
      this.confirmDialogMessage =this.$t('Global.Materials.confirmacionGuardarMaterial')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm) {
        this.getMateriales()
        return
      }
      this.overlay=true
      CrudService.insert(this.itemTable, item)
        .then(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Materials.guardado'), color: 'success', icon:'mdi-check-circle-outline'})
        })
        .catch(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Materials.guardadoError'), color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally(() => this.getMateriales())
    },
    async updateItem(item){
      this.confirmDialogTitle = this.$t('Global.Materials.actualizarMaterial')
      this.confirmDialogMessage = this.$t('Global.Materials.confirmacionActualizarMaterial')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm) {
        this.getMateriales()
        return
      }
      this.overlay=true
      CrudService.update(this.itemTable, item)
        .then(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Materials.actualizado'), color: 'success', icon:'mdi-check-circle-outline'})
        })
        .catch(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Materials.actualizadoError'), color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally(() => this.getMateriales())
    },
    async deleteItem(item){
      this.confirmDialogTitle = this.$t('Global.Materials.eliminarMaterial')
      this.confirmDialogMessage = this.$t('Global.Materials.confirmacionEliminarMaterial')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm) {
        this.getMateriales()
        return
      }
      this.overlay=true
      CrudService.deleteById(this.itemTable, item[this.itemId])
        .then(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Materials.borrado'), color: 'success', icon:'mdi-check-circle-outline'})
        })
        .catch(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Materials.borradoError'), color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally(() => this.getMateriales())
    }
  },
  mounted() {
    this.getMateriales()
  }
}
</script>

<style>

</style>
