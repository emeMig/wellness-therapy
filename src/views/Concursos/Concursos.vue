<template>
  <div>
    <titulo :titulo="$t('Global.Contest.titulo')"/>
    <busqueda id="busqueda" :text="options.textFilter.text" @save-filter="saveFilter"/>
    <tabla-modelo
      :headers="headers"
      :items="items"
      :item-table="itemTable"
      :item-id="itemId"
      :error-text="$t('Global.Contest.errorById')"
      item-key="itemId"
      :form-title="$t('Global.Contest.concurso')"
      :options-table="options"
      :total-items="totalItems"
      is-contest
      hide-expansion
      @createItem="createItem"
      @updateItem="updateItem"
      @deleteItem="deleteItem"
      :custom-action1="customAction1"
      :custom-action2="customAction2"
      @custom-action2="openPliego"
      @custom-action1="cerrarConcurso"
      :estados-concurso="estadosConcurso"
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
import Titulo from "@/components/Modelos/TituloModelo"
import Busqueda from "@/components/Modelos/BusquedaModelo"
import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'
import validations from "@/utils/validations"
import CrudService from '@/services/crud.service'
import { concursoService } from '@/services/concurso.service'
import TableNames from '@/config/table-names'
import {OPEN_SNACKBAR} from "@/store/actions/snackbar"
import Overlay from "@/components/Overlay"

export default {
  name: "GestionConcursos",
  components: {
    TablaModelo,
    Titulo,
    ConfirmDialog,
    Busqueda,
    Overlay
  },
  data() {
    return {
      headers: [
        { text: this.$t('Global.Contest.numeroExpediente'), value: 'numExpediente', align: 'left', sortable: true, rules: [validations.maxLength45, validations.required] },
        { text: this.$t('Global.Contest.fechaRecepcion'), value: 'fecCreacion', align: 'left', sortable: true, rules: [validations.required] },
        { text: this.$t('Global.Contest.nombre'), value: 'nombre', align: 'left', sortable: true, rules: [validations.maxLength200,validations.required] },
        { text: this.$t('Global.Contest.estado'), value: 'idEstadoConcurso', align: 'left', sortable: true, rules: [validations.requiredAutocomplete] },
        { text: this.$t('Global.Actions.acciones'), value: 'actions', align: 'center', sortable: false, width: "130px" }
      ],
      confirmDialogTitle: "",
      confirmDialogMessage: null,
      items: [],
      customAction1 : {active: true, icon: 'mdi-lock', description: this.$t('Global.Actions.cerrar')},
      customAction2 : {active: true, icon: 'mdi-note-multiple-outline', description:  this.$t('Global.Sheets.tituloDialogo') },
      overlay: false,
      itemTable: TableNames.CONTEST,
      itemId: "idConcurso",
      estadosConcurso: [],
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
      totalItems: 0
    }
  },

  mounted() {
    this.getConcursos()
    CrudService.all(TableNames.CONTEST_STATUS)
      .then((response) => {
        this.estadosConcurso = response.data
      })
      .catch(() => {
        this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Contest.errorEstados'), color: 'error', icon:'mdi-alert-circle-outline'})
      })
  },

  methods: {
    //Paginacion
    changePaginationData(options){
      this.options = options
      this.getConcursos()
    },
    //Filtrado
    saveFilter(text){
      this.options.textFilter.text=text
      this.getConcursos()
    },
    getConcursos(){
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
            .then((response) => {
              console.log(response.data)
              this.items = response.data
            })
            .catch((e) => {
              this.$store.dispatch(OPEN_SNACKBAR, {text: e.message, color: 'error', icon: 'mdi-alert-circle-outline'})
            })
            .finally(() => this.overlay = false)
        })
    },
    async createItem(item){
      this.confirmDialogTitle = this.$t('Global.Contest.guardarConcurso')
      this.confirmDialogMessage = this.$t('Global.Contest.confirmacionGuardarConcurso')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm){
        this.getConcursos()
        return
      }
      const newConcurso = {}
      newConcurso['numExpediente']=item.numeroExpediente
      newConcurso['fecCreacion']= new Date()
      newConcurso['nombre']=item.nombre
      newConcurso['usuCreacion']= "SAMPLE"
      const identificador = this.estadosConcurso.map(e => e.idEstadoConcurso).indexOf(item.estadoConcurso)
      if(identificador !== -1) {
        newConcurso['idEstadoConcurso'] = this.estadosConcurso[identificador].idEstadoConcurso
      }
      this.overlay=true
      CrudService.insert(this.itemTable, newConcurso)
        .then(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Contest.guardado'), color: 'success', icon:'mdi-check-circle-outline'})
        })
        .catch(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Contest.guardadoError'), color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally(() => this.getConcursos())
    },
    async updateItem(item){
      this.confirmDialogTitle = this.$t('Global.Contest.actualizarConcurso')
      this.confirmDialogMessage = this.$t('Global.Contest.confirmacionActualizarConcurso')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm){
        this.getConcursos()
        return
      }
      this.overlay=true
      const newConcurso = {}
      newConcurso['idConcurso'] = item.idConcurso
      newConcurso['numExpediente']=item.numeroExpediente
      newConcurso['fecModificacion']= new Date()
      newConcurso['nombre']=item.nombre
      newConcurso['usuCreacion']= item.usuCreacion
      newConcurso['usuModificacion'] = "SAMPLE"
      const identificador = this.estadosConcurso.map(e => e.idEstadoConcurso).indexOf(item.estadoConcurso)
      const concurso = this.items.map(c => c.idConcurso).indexOf(item.idConcurso)
      if(identificador !== -1) {
        newConcurso['idEstadoConcurso'] = this.estadosConcurso[identificador].idEstadoConcurso
      }
      if(concurso !== -1) newConcurso['fecCreacion'] = this.items[concurso].fecCreacion
      CrudService.update(this.itemTable, newConcurso)
        .then(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Contest.guardado'), color: 'success', icon:'mdi-check-circle-outline'})
        })
        .catch(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Contest.guardadoError'), color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally(() => this.getConcursos())
    },
    /**
     * Borra el concurso seleccionado
     * @param item concurso
     * @returns {Promise<void>}
     */
    async deleteItem(item){
      this.confirmDialogTitle = this.$t('Global.Contest.eliminarConcurso')
      this.confirmDialogMessage = this.$t('Global.Contest.confirmacionEliminarConcurso')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm){
        this.getConcursos()
        return
      }
      this.overlay=true
      CrudService.deleteById(this.itemTable, item.idConcurso)
        .then(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Contest.borrado'), color: 'success', icon:'mdi-check-circle-outline'})
        })
        .catch(() => {
          this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Contest.borradoError'), color: 'error', icon:'mdi-alert-circle-outline'})
        })
        .finally(() => this.getConcursos())
    },
    /**
     * Abre la vista de pliegos con la tbala de pliegos rellena si tiene pliegos asociados y vacía en caso contrario para poder añadir pliegos
     * @param item concurso
     */
    openPliego(item) {
      // Abre la pagina de gestion de pliegos con los items seleccionados
      this.$router.push({name: 'GesPliegos', params: {items:item.idConcurso}})
    },
    /**
     * Abre el dialogo de confirmación para cerrar un concurso
     * @param item concurso a cerrar
     */
    async cerrarConcurso(item) {
      // cierra el concurso si esta en uso
      if( item.idEstadoConcurso === parseInt(this.$t('Global.Contest.estadoUso'))) {
        this.confirmDialogTitle = this.$t('Global.Contest.cerrarConcurso')
        this.confirmDialogMessage = this.$t('Global.Contest.confirmacionCerrarConcurso')
        const confirm = await this.$refs.confirmDialog.open()
        if(!confirm) return
        concursoService.updateConcurso({"idConcurso": item.idConcurso, "idEstadoConcurso": 3}).then(response => {
          if (response.data !== null) {
            item.estado = this.$t('Global.Contest.estadoDesuso')
          }
        }).catch(error => {
          console.log(error)
        })
      }
      else if( item.idEstadoConcurso === parseInt(this.$t('Global.Contest.estadoProceso'))) {
        this.confirmDialogTitle = this.$t('Global.Contest.ABrirConcurso')
        this.confirmDialogMessage = this.$t('Global.Contest.confirmacionAbrirConcurso')
        const confirm = await this.$refs.confirmDialog.open()
        if(!confirm) return
        concursoService.updateConcurso({"idConcurso": item.idConcurso, "idEstadoConcurso": 2}).then(response => {
          if (response.data !== null) {
            item.estado = this.$t('Global.Contest.estadoUso')
          }
        }).catch(error => {
          console.log(error)
        })
      }
      else{
        this.confirmDialogTitle = this.$t('Global.Contest.abrirConcurso')
        this.confirmDialogMessage = this.$t('Global.Contest.confirmacionAbrirConcurso')
        const confirm = await this.$refs.confirmDialog.open()
        if(!confirm) return
        concursoService.updateConcurso({"idConcurso": item.idConcurso, "idEstadoConcurso": 2}).then(response => {
          if (response.data !== null) {
            item.estado = this.$t('Global.Contest.estadoUso')
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
}
</script>

<style>

</style>
