<template>
  <div id="actaFormulario">
    <v-card flat class="relief pa-3">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="2">
            <v-text-field
              :label="$t('Global.Acts.codigo')"
              v-model="acta.codigo"
              clearable
              :disabled="readOnly"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              :label="$t('Global.Acts.fechaRecepcion')"
              v-model="acta.fechaRecepcion"
              clearable
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-menu
              :ref="$t('Global.Acts.fechaSolicitud')"
              v-model="fechaSolicitudDialog"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="acta.fechaSolicitud"
                  label="Fecha de Solicitud"
                  clearable
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                :first-day-of-week="1"
                no-title scrollable @change="$refs.fechaSolicitud.save()"
                v-model="acta.fechaSolicitud">
                <v-btn text color="primary" @click="fechaSolicitudDialog =false">
                  Borrar
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="primary"
                       @click="$refs.fechaSolicitud.save(acta.fechaSolicitud);">
                  Guardar
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              :label="$t('Global.Acts.fechaFin')"
              v-model="acta.fechaFin"
              clearable
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              :label="$t('Global.Acts.lote')"
              v-model="acta.lote"
              clearable
              :disabled="readOnly"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              :label="$t('Global.Acts.cantidadLote')"
              v-model="acta.cantidadLote"
              clearable
              :disabled="readOnly"
              :rules="[rules.numeric]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              :label="$t('Global.Acts.referencia')"
              v-model="acta.referencia"
              clearable
              :disabled="readOnly"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-select
              v-model="acta.tipoActa"
              :items="obtenerTiposActa"
              item-text="nombre"
              :label="$t('Global.Acts.tipo')"
              return-object
              single-line
              :disabled="readOnly"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              :label="$t('Global.Acts.cantidadMuestras')"
              v-model="acta.cantidadMuestras"
              clearable
              :disabled="readOnly"
              :rules="[rules.numeric]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <!-- Se asocia a un cliente -> se abre un dialogo con un listado de clientes y se selecciona solo 1 -->
            <v-text-field
              :label="$t('Global.Clients.cliente')"
              v-model="acta.cliente.organismo"
              clearable
              @click="abrirDialogoCliente"
              :disabled="readOnly"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <!-- Se asocia a un fabricante -> se abre un dialogo con un listado de fabricantes y se selecciona solo 1 -->
            <v-text-field
              :label="$t('Global.Manufacturers.fabricante')"
              v-model="acta.fabricante.nombre"
              clearable
              @click="abrirDialogoFabricantes"
              :disabled="readOnly"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <!-- Se asocia a un concurso -> se abre un dialogo con un listado de concursos existentes y se puede seleccionar solo 1 -->
            <v-text-field
              :label="$t('Global.Contest.concurso')"
              v-model="acta.concurso.numeroExpediente"
              clearable
              @click="abrirDialogoConcurso"
              :disabled="readOnly"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <!-- Se asocia a un pliego -> se abre un dialogo con un listado de pliegos existentes y se puede seleccionar solo 1 en funcion del concurso -->
            <v-text-field
              :label="$t('Global.Sheets.pliego')"
              v-model="acta.pliego.codigo"
              clearable
              :disabled="acta.concurso.numeroExpediente === null || acta.concurso.numeroExpediente === '' || readOnly"
              @click="abrirDialogoPliego"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <!-- Adjuntar documentos -->
            <v-text-field
              :label="$t('Global.Acts.archivosAdjuntos')"
              v-model="acta.archivos"
              clearable
              :disabled=" readOnly"
              @click="abrirDialogoDocumentos"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              :label="$t('Global.Acts.descripcion')"
              v-model="acta.descripcion"
              clearable
              :disabled=" readOnly"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-textarea
              :label="$t('Global.Acts.notas')"
              v-model="acta.notas"
              clearable
              rows="3"
              :disabled="readOnly"
            ></v-textarea>
          </v-col>
          <v-col cols="12" sm="6">
            <v-textarea
              :label="$t('Global.Acts.observaciones')"
              v-model="observaciones"
              clearable
              rows="3"
              :disabled="readOnly"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col cols="12" sm="3">
            <v-btn color="primary" text>{{ $t('Global.Actions.imprimirCarátula') }}</v-btn>
          </v-col>
          <v-col cols="12" sm="3" v-if="!readOnly">
            <v-btn color="primary" text @click="guardarDatosPrincipales">{{$t('Global.Actions.guardar')}}</v-btn>
          </v-col>
          <v-col cols="12" sm="3" v-if="datos.estado === $t('Global.Acts.estadoDesuso')">
            <v-btn color="primary" text @click="reabrirActa">{{ $t('Global.Actions.reabrir') }}</v-btn>
          </v-col>
          <v-col cols="12" sm="3" v-else>
            <v-btn color="primary" text @click="cerrarActa">{{ $t('Global.Actions.cerrar') }}</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialogo">
      <select-table :title="title"  :item-key="itemKey" :items="items" :headers="headers" :single-select="singleSelect"
                     :left-btn-event="cerrarDialogo" :right-btn-event="guardar" :left-btn-txt="$t('Global.Actions.cancelar')" :right-btn-txt="$t('Global.Actions.guardar')">
      </select-table>
    </v-dialog>
    <confirm-dialog
      ref="confirmDialog"
      :title="confirmDialogTitle"
      :message="confirmDialogMessage"
    />
    <documents-dialog :read-only="readOnly" :dialogo-archivos="dialogoArchivos" @close-dialog="closeDialogDocuments"
    @save-documents="saveDocuments"></documents-dialog>
  </div>
</template>

<script>

import SelectTable from "@/components/Modelos/SelectTable"
import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'
import DocumentsDialog from "@/components/UI/Dialogs/DocumentsDialog";
import validations from '@/utils/validations'

export default {
  name: 'actaFormulario',
  components: {SelectTable, ConfirmDialog, DocumentsDialog},
  props:{
    datos: {type: Object, default: () => {}},
    readOnly: {type: Boolean, default: () => false}
  },
  data () {
    return {
      rules: validations,
      acta:{},
      items: [],
      headers:[],
      itemKey:'',
      dialogo: false,
      singleSelect: true,
      fechaSolicitudDialog: false,
      title: '',
      tipo: '',
      codigo: '',
      fechaRecepcion: '',
      tipoActa: {},
      referencia: '',
      materiales: [],
      cliente: {},
      fabricante: {},
      lote: '',
      cantidad: '',
      concurso: {},
      pliego: {},
      observaciones: '',
      dialogoArchivos: false,
      titleArchivos: this.$t('Global.Acts.archivosAdjuntos'),
      archivosHeaders: [
        {text:this.$t('Global.Acts.nombreArchivo'), value:'nombre'},
        {text:this.$t('Global.Acts.size'), value:'size'},
        {text: this.$t('Global.Actions.acciones'), value: 'actions', align: 'center', sortable: false, width: "130px" }
      ],
      archivos: [
        {nombre:"Archivo 1", size: "100Kb"},
        {nombre:"Archivo 3", size: "200Kb"},
        {nombre:"Archivo 4", size: "300Kb"},
      ],
      dialogoAddDocument: false,
      confirmDialogTitle: "",
      confirmDialogMessage: null,
    }
  },
  computed:{
    getMateriales(){
      let materiales=''
      if(this.acta.materiales.length > 0) {
        for (let m of this.acta.materiales) {
          materiales = materiales + "  " + m.codigo + "-" + m.nombre
        }
      }
      return materiales
    },
    obtenerTiposActa(){
      let tiposActa = []
      tiposActa = [
        {
          nombre: "Vestimenta",
          abreviatura: "V",
        },
        {
          nombre: "Bromatología (comida)",
          abreviatura: "B",
        }
      ]
      return tiposActa
    },
    obtenerClientes(){
      //TODO: Cambiar cuando este el back hecho para obtener el listado de clientes
      let clientes = []
      clientes = [
        {
          id: 2,
          organismo: "Organismo 2",
          direccion: "Calle cliente 2",
          observaciones: "Observaciones 2",
          personaContacto1: "Persona de contacto 1",
          telefono1: "+3467895435",
          email1: "contacto1@sample.es",
          personaContacto2: "Persona de contacto 2",
          telefono2: "+3467895435",
          email2: "contacto2@sample.es"
        },
        {
          id: 3,
          organismo: "Organismo 3",
          direccion: "Calle cliente 3",
          observaciones: "Observaciones 3",
          personaContacto1: "Persona de contacto 1",
          telefono1: "+3467895435",
          email1: "contacto1@sample.es",
          personaContacto2: "Persona de contacto 2",
          telefono2: "+3467895435",
          email2: "contacto2@sample.es"
        },
        {
          id: 4,
          organismo: "Organismo 4",
          direccion: "Calle cliente 4",
          observaciones: "Observaciones 4",
          personaContacto1: "Persona de contacto 1",
          telefono1: "+3467895435",
          email1: "contacto1@sample.es",
          personaContacto2: "Persona de contacto 2",
          telefono2: "+3467895435",
          email2: "contacto2@sample.es"
        }
      ]
      return clientes
    },
    clientesHeaders(){
      return [
        { text: this.$t('Global.Clients.organismo'), align: 'left', filterable: false, value: 'organismo'},
        { text: this.$t('Global.Clients.direccion'), value: 'direccion' },
        { text: this.$t('Global.Clients.observaciones'), value: 'observaciones' },
        { text: this.$t('Global.Clients.personaContacto1'), value: 'personaContacto1' },
        { text: this.$t('Global.Clients.telefono1'), value: 'telefono1' },
        { text: this.$t('Global.Clients.email1'), value: 'email1' },
        { text: this.$t('Global.Clients.personaContacto2'), value: 'personaContacto2' },
        { text: this.$t('Global.Clients.telefono2'), value: 'telefono2' },
        { text: this.$t('Global.Clients.email2'), value: 'email2' }
      ]
    },
    obtenerFabircantes(){
      //TODO: Cambiar cuando este el back hecho para obtener el listado de fabricantes
      let fabricantes = []
      fabricantes = [
        {
          codigo: 0,
          nombre: "Fabricante 1",
        },
        {
          codigo: 1,
          nombre: "Fabricante 2",
        },
        {
          codigo: 2,
          nombre: "Fabricante 3",
        }
      ]
      return fabricantes
    },
    fabricantesHeaders(){
      return [
        { text: this.$t('Global.Manufacturers.nombre'), value: 'nombre' }
      ]
    },
    obtenerConcursos(){
      //TODO: Cambiar cuando este el back hecho para obtener el listado de concursos
      let concursos = []
      concursos = [
        {
          numeroExpediente: "EXP-0000001",
          descripcion: "Descripción de ejemplo",
          estado: "Pendiente de validar",
        },
        {
          numeroExpediente: "EXP-0000002",
          descripcion: "Descripción de ejemplo",
          estado: "Pendiente de validar",
        }
      ]
      return concursos
    },
    concursoHeaders(){
      return [
        { text: this.$t('Global.Contest.numeroExpediente'), align: 'left', filterable: false, value: 'numeroExpediente'},
        { text: this.$t('Global.Contest.descripcion'), value: 'descripcion' },
        { text: this.$t('Global.Contest.estado'), value: 'estado' }
      ]
    },
    obtenerPliegos(){
      //TODO: Cambiar cuando este el back hecho para obtener el listado de pliegos en funcion del concurso
      let pliegos = []
      pliegos = [
        {
          codigo: 0,
          concurso: {numeroExpediente: "EXP-0000001"},
          observaciones: "Observacion de ejemplo 1",
        },
        {
          codigo: 1,
          concurso: {numeroExpediente: "EXP-0000001"},
          observaciones: "Observacion de ejemplo 2",
        }
      ]
      return pliegos
    },
    pliegoHeaders(){
      return [
        { text: this.$t('Global.Sheets.codigo'), align: 'left', filterable: false, value: 'codigo'},
        { text: this.$t('Global.Contest.numeroExpediente'), align: 'left', value: 'concurso.numeroExpediente'},
        { text: this.$t('Global.Sheets.observaciones'), value: 'observaciones' }
      ]
    }
  },
  methods: {
    guardarDatosPrincipales() {
      console.log(this.codigo)
      console.log(this.concurso)
      console.log(this.fechaRecepcion)
      console.log(this.referencia)
      console.log(this.pliego)
      console.log(this.materiales)
      console.log(this.cliente)
      console.log(this.fabricante)
      console.log(this.lote)
      console.log(this.cantidad)
    },
    async cerrarActa() {
      this.confirmDialogTitle = this.$t('Global.Acts.cerrarActa')
      this.confirmDialogMessage = this.$t('Global.Acts.mensajeConfirmacionCerrar')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm) return
      this.datos.estado= this.$t('Global.Acts.estadoDesuso')
    },
    async reabrirActa() {
      this.confirmDialogTitle = this.$t('Global.Acts.reabrirActa')
      this.confirmDialogMessage = this.$t('Global.Acts.mensajeConfirmacionReabrir')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm) return
      this.datos.estado= this.$t('Global.Acts.estadoUso')
    },
    abrirDialogoCliente() {
      this.dialogo = true
      this.headers = this.clientesHeaders
      this.items = this.obtenerClientes
      this.itemKey = this.$t('Global.Clients.key')
      this.singleSelect = true
      this.title = this.$t('Global.Clients.tituloDialogo')
      this.tipo = "cliente"
    },
    abrirDialogoFabricantes() {
      this.dialogo = true
      this.headers = this.fabricantesHeaders
      this.items = this.obtenerFabircantes
      this.singleSelect = true
      this.title =this.$t('Global.Manufacturers.tituloDialogo')
      this.tipo = "fabricante"
      this.itemKey = this.$t('Global.Manufacturers.nombre')
    },
    abrirDialogoConcurso() {
      this.dialogo = true
      this.headers = this.concursoHeaders
      this.items = this.obtenerConcursos
      this.singleSelect = true
      this.title =this.$t('Global.Contest.tituloDialogo')
      this.tipo = "concurso"
      this.itemKey = this.$t('Global.Contest.numeroExpediente')
    },
    abrirDialogoDocumentos(){
      this.dialogoArchivos = true
    },
    abrirDialogoPliego() {
      this.dialogo = true
      this.headers = this.pliegoHeaders
      this.items = this.obtenerPliegos
      this.singleSelect = true
      this.itemKey = this.$t('Global.Sheets.codigo')
      this.title =this.$t('Global.Sheets.tituloDialogo')
      this.tipo = "pliego"
    },
    cerrarDialogo() {
      this.dialogo = false
    },
    closeDialogDocuments() {
      this.dialogoArchivos = false
    },
    saveDocuments(items) {
      console.log('se guardan los documentos' + items)
    },
    guardar(selected) {
      if(this.tipo === 'concurso'){
        if (selected[0] === null || selected[0] === undefined) {
          selected[0] = {"numeroExpediente": ""}
        }
        this.acta.concurso = selected[0]
      }
      else if (this.tipo === 'pliego'){
        if (selected[0] === null || selected[0] === undefined) {
          selected[0] = {"codigo": ""}
        }
        this.acta.pliego = selected[0]
      }
      else if ( this.tipo === 'cliente'){
        if (selected[0] === null || selected[0] === undefined) {
          selected[0] = {"nombreCliente": ""}
        }
        this.acta.cliente = selected[0]
      }
      else if( this.tipo === 'fabricante'){
        if (selected[0] === null || selected[0] === undefined) {
          selected[0] = {"nombre": ""}
        }
        this.acta.fabricante = selected[0]
      }
      else if( this.tipo === 'material'){
        for( let m of selected){
          if(!this.acta.materiales.includes(m)){
            this.acta.materiales.push(m)
          }
        }
      }
      this.dialogo = false
    },
    downloadDocument(item) {
      console.log('descarga documento' + item.nombre)
    }
  },
  created() {
    if(Object.keys(this.datos).length !== 0){
      this.acta = this.datos
    }else{
      this.acta.codigo=''
      this.acta.fechaRecepcion=''
      this.acta.lote=''
      this.acta.cantidadLote=''
      this.acta.cantidadMuestras=''
      this.acta.referencia=''
      this.acta.tipoActa=''
      this.acta.cliente = {}
      this.acta.cliente.nombreCompleto =''
      this.acta.fabricante={}
      this.acta.fabricante.nombreCompleto =''
      this.acta.concurso={}
      this.acta.concurso.numeroExpediente= null
      this.acta.pliego={}
      this.acta.materiales=[]
      this.acta.notas=''
      this.acta.fechaSolicitud = ''
      this.acta.fechaFin = ''
      this.acta.descripcion = ''
    }

  }

}
</script>

<style>

</style>
