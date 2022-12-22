<template>
  <div>
    <titulo :titulo="$t('Global.Sheets.titulo')" :concurso-id="getConcursoId"/>
    <busqueda id="busqueda" :text="options.textFilter.text" @save-filter="saveFilter"/>
    <tabla-modelo
      :headers="headers"
      :items="items"
      :item-table="itemTable"
      :item-id="itemId"
      :error-text="$t('Global.Contest.errorById')"
      :form-title="$t('Global.Sheets.pliego')"
      item-key="fecCreacion"
      is-sheet
      :options-table="options"
      :total-items="totalItems"
      @createItem="createItem"
      @updateItem="updateItem"
      @deleteItem="deleteItem"
      :custom-action1="customAction1"
      @custom-action1="cerrarPliego"
      :custom-action2="customAction2"
      @custom-action2="openActa"
      :custom-action3="customAction3"
      @custom-action3="openProductDialog"
      :estados-concurso="estadosPliego"
      @pagination-data="changePaginationData"
    ></tabla-modelo>
    <confirm-dialog
      ref="confirmDialog"
      :title="confirmDialogTitle"
      :message="confirmDialogMessage"
    />
    <product-tree-dialog
      :activate="productDialog"
      :form-title="$t('Global.Sheets.productos')"
      :products="productos"
      @close-dialog="closeDialogProduct"
      :pliego="payloadPliego"
    />
    <overlay :overlay="overlay"></overlay>
  </div>
</template>

<script>
import TablaModelo from '@/components/Modelos/TablaModelo';
import Titulo from "@/components/Modelos/TituloModelo";
import Busqueda from "@/components/Modelos/BusquedaModelo";
import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'
import validations from "@/utils/validations";
import TableNames from "@/config/table-names";
import CrudService from "@/services/crud.service";
import {OPEN_SNACKBAR} from "@/store/actions/snackbar";
import {pliegoService} from "@/services/pliego.service";
import Overlay from "@/components/Overlay"
import ProductTreeDialog from "@/components/UI/Custom/ProductTreeDialog.vue";

export default {
  name: "GestionPliegos",
  components: {
    TablaModelo,
    Titulo,
    Busqueda,
    ConfirmDialog,
    Overlay,
    ProductTreeDialog
  },
  data() {
    return {
      headers: [
        { text: '', value: 'data-table-expand' },
        { text: this.$t('Global.Contest.numeroExpediente'), value: 'concurso.numExpediente', align: 'left', sortable: true, rules: [validations.requiredAutocomplete] },
        { text: this.$t('Global.Sheets.codigo'), value: 'codigo', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Sheets.nombre'), value: 'nombre', align: 'left', sortable: true, rules: [validations.required, validations.maxLength200] },
        { text: this.$t('Global.Sheets.fechaRecepcion'), value: 'fecRecepcion', align: 'left', sortable: true, rules: [validations.required] },
        { text: this.$t('Global.Sheets.estado'), value: 'idEstadoPliego', align: 'left', sortable: true, rules: [validations.required] },
        { text: this.$t('Global.Actions.acciones'), value: 'actions', align: 'center', sortable: false, width: "200px" },
      ],
      confirmDialogTitle: "",
      confirmDialogMessage: null,
      items: [],
      payloadPliego: { },
      customAction1 : {active: true, icon: 'mdi-lock', description: this.$t('Global.Actions.cerrar')},
      customAction2 : {active: true, icon: 'mdi-tab', description: this.$t('Global.Acts.actas')},
      customAction3 : {active: true, icon: 'mdi-clipboard-list', description: this.$t('Global.Sheets.productos')},
      overlay: false,
      itemTable: TableNames.SHEET,
      itemId: "idPliego",
      estadosPliego: [],
      options :{
        sorting: {
          ascending: false,
          column: "fecCreacion"
        },
        pagination:{
          pageSize: 10,
          page: 1
        },
        textFilter: {
          text: ""
        }
      },
      totalItems: 0,
      productDialog: false,
      productos:[]
    }
  },
  computed:{
    getConcursoId() {
      let concursoId = ''
      if(Object.keys(this.$route.params).length !== 0){
        concursoId = this.$route.params.items.nombre
      }
      return concursoId
    }
  },
  methods:{
    //Paginacion
    changePaginationData(options){
      this.options = options
    },
    //Filtrado
    saveFilter(text){
      this.options.textFilter.text=text
      this.getPliegos()
    },
    getPliegos(){
      this.overlay=true
      CrudService.count(TableNames.MANUFACTURE, this.options)
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
              this.$store.dispatch(OPEN_SNACKBAR, {text: e.response.data.errorKey, color: 'error', icon: 'mdi-alert-circle-outline'})
            })
            .finally(() => {
              for (const item of this.items) {
                this.getConcursoPliego(item)
              }
            })
        })
    },
    getConcursoPliego(item){
      CrudService.getById(TableNames.CONTEST,item.idConcurso)
        .then((response) => {
          item.concurso = response.data
        })
        .catch((e) => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: e.message, color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally(() => {
          this.overlay=false
        })
    },
    /**
     * Redirige a la vista de gestion de actas, filtrado por el concurso
     */
    openActa(item) {
      // Abre la pagina de gestion de pliegos con los items seleccionados
      this.$router.push({name: 'GesActas', params: {items:item}})
    },

    openProductDialog(item) {
      //Buscamos los pliegos de los productps
      pliegoService.getProducto( item)
        .then((response) => {
          this.productos = response.data
        })
        .catch((error) => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: error.message, color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally(() => {
          this.payloadPliego = item
          this.productDialog= true
        })
    },
    closeDialogProduct(){
      this.productDialog =false
    },
    async createItem(item){
      this.confirmDialogTitle = this.$t('Global.Sheets.guardarPliego')
      this.confirmDialogMessage = this.$t('Global.Sheets.confirmacionGuardarPliego')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm){
        this.getPliegos()
        return
      }
      item['fecCreacion']= new Date()
      item['usuCreacion']= "SAMPLE"
      item['idEstadoPliego']= item.estadoPliego
      item['fecRecepcion'] = new Date(item.fechaRecepcion)
      item['idConcurso'] = item.concurso.idConcurso
      delete item['concurso']
      delete item['fechaCreacion']
      delete item['estadoPliego']
      delete item['documento']
      delete item['concesiones']
      delete item['fechaRecepcion']
      this.overlay=true
      pliegoService.createPliego( item)
        .then(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Sheets.guardado'), color: 'success', icon:'mdi-check-circle-outline'})
        })
        .catch(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Sheets.guardadoError'), color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally(() => this.getPliegos())
    },
    async updateItem(item){
      this.confirmDialogTitle = this.$t('Global.Sheets.actualizarPliego')
      this.confirmDialogMessage = this.$t('Global.Sheets.confirmacionActualizarPliego')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm){
        this.getConcursos()
        return
      }
      this.overlay = true
      item['idEstadoPliego']= item.estadoPliego
      item['fecRecepcion'] = new Date(item.fechaRecepcion)
      item['idConcurso'] = item.concurso.idConcurso
      delete item['concurso']
      delete item['fechaCreacion']
      delete item['estadoPliego']
      delete item['documento']
      delete item['concesiones']
      delete item['fechaRecepcion']
      delete item['stTcEstadoPliego']
      item['fecModificacion'] = new Date()
      item['usuModificacion'] = "SAMPLE"

      pliegoService.updatePliegoData( item)
        .then(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Contest.guardado'), color: 'success', icon:'mdi-check-circle-outline'})
        })
        .catch(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Contest.guardadoError'), color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally(() => this.getPliegos())
    },
    async deleteItem(item){
      this.confirmDialogTitle = this.$t('Global.Sheets.eliminarPliego')
      this.confirmDialogMessage = this.$t('Global.Sheets.confirmacionEliminarPliego')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm){
        this.getPliegos()
        return
      }
      this.overlay=true
      CrudService.deleteById(this.itemTable, item.idPliego)
        .then(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Sheets.borrado'), color: 'success', icon:'mdi-check-circle-outline'})
        })
        .catch(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Sheets.borradoError'), color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally(() => this.getPliegos())
    },
    /**
     * Abre el dialogo de confirmación para cerrar un concurso
     * @param item concurso a cerrar
     */
    async cerrarPliego(item) {
      let idEstado = 0
      // cierra el concurso si esta vigente
      if( item.idEstadoPliego === parseInt(this.$t('Global.Contest.estadoUso'))) {
        this.confirmDialogTitle = this.$t('Global.Sheets.cerrarPliego')
        this.confirmDialogMessage = this.$t('Global.Sheets.confirmacionCerrarPliego')
        idEstado=3
      }
      else if( item.idEstadoPliego === parseInt(this.$t('Global.Contest.estadoProceso'))) {
        this.confirmDialogTitle = this.$t('Global.Sheets.abrirPliego')
        this.confirmDialogMessage = this.$t('Global.Sheets.abrirPliego')
        idEstado = 2
      } else if( item.idEstadoPliego === parseInt(this.$t('Global.Contest.estadoDesuso'))) {
        this.confirmDialogTitle = this.$t('Global.Sheets.reabrirPliego')
        this.confirmDialogMessage = this.$t('Global.Sheets.confirmacionReabrirPliego')
        idEstado = 2
      }
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm) return
      this.overlay=true
      item.idEstadoPliego = idEstado
      pliegoService.updatePliego(item)
        .then(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Sheets.cambioEstado'), color: 'success', icon:'mdi-check-circle-outline'})
        })
        .catch(error => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: error , color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally( () => this.getPliegos())
    }
  },
  mounted() {
    this.getPliegos()
    CrudService.all(TableNames.SHEET_STATUS)
      .then((response) => {
        this.estadosPliego = response.data
      })
      .catch(() => {
        this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Sheets.errorEstados'), color: 'error', icon:'mdi-alert-circle-outline'})
      })
  }

}
</script>

<style>

</style>
