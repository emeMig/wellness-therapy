<template>
  <div>
    <v-dialog
      v-model="activate"
      max-width="900px"
      persistent
      :fullscreen="isSheet"
    >
      <v-card color="background">
        <v-toolbar style="background-color: transparent; padding-right: 24px; padding-left: 24px" class="elevation-0">
          <v-toolbar-title><h3 class="primary--text" >{{ formTitle }}</h3></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click="closeDialog"><v-icon>mdi-close-circle</v-icon></v-btn>
        </v-toolbar>
        <v-card-text class="mx-0">
          <v-container class="mx-0" fluid>
            <v-form ref="modelForm">
              <v-sheet class="relief px-6">
                <v-row>
                  <v-col v-for="(value,key) in getColumns(editedItem)" :key="key" cols="12" md="6">
                    <v-autocomplete v-if="key === 'rol'"
                                    v-model="editedItem[key]" :items="rolesItems"
                                    @input="validate" item-text="rol"
                                    :label="key | deCamelCase | capitalize">
                      <template v-slot:item="data">
                        <v-tooltip content-class='custom-tooltip' bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">{{ data.item.rol }}</span>
                          </template>
                          <span>{{ data.item.permisos }}</span>
                        </v-tooltip>
                      </template>
                    </v-autocomplete>
                    <v-autocomplete v-if="key === 'concurso'"
                                    v-model="editedItem[key].value" :items="concursos" return-object
                                    @input="validate" item-text="numExpediente"
                                    :label="key | deCamelCase | capitalize">
                      <template v-slot:item="data">
                            <span>{{ data.item.numExpediente }}</span>
                      </template>
                    </v-autocomplete>
                    <v-menu v-else-if="key === 'fechaRecepcion' && isSheet"
                      ref="menu"
                      v-model="fechaCreacionDialog"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          readonly
                          v-model="editedItem[key].value"
                          :label="key | deCamelCase | capitalize"
                          clearable
                          :rules="editedItem[key].rules"
                          v-on="on" v-bind="attrs"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        :first-day-of-week="1" :max="maxValueDate"
                        no-title scrollable
                        v-model="editedItem[key].value">
                        <v-btn text color="primary" @click="editedItem[key].value ='';fechaCreacionDialog =false">
                          {{ $t('Global.Actions.borrar') }}
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary"
                               @click="fechaCreacionDialog =false">
                          {{ $t('Global.Actions.guardar') }}
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                    <v-checkbox v-else-if="key === 'bloqueado'"
                                v-model="editedItem[key]"
                                :label="key | deCamelCase | capitalize"
                                color="error"
                                @change="validate"
                                hide-details
                    ></v-checkbox>
                    <v-combobox v-else-if="key === 'estadoConcurso'|| key === 'estadoPliego'"
                      v-model="editedItem[key].value" :label="key | deCamelCase | capitalize"
                      small-chips disabled append-icon="">

                    </v-combobox>
                    <v-text-field v-else-if="key !== 'materiales' && key !== 'observaciones' && key !== 'documento' &&
                    key !== 'concesiones'" id="search-input"
                                  v-model="editedItem[key].value" :disabled="getDisabledItems(key)"
                                  @input="validate"
                                  :label="key | deCamelCase | capitalize"
                                  :rules="editedItem[key].rules"
                                  clearable
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" v-if="Object.keys(editedItem).includes('observaciones')">
                    <v-textarea id="search-input" v-model="editedItem.observaciones.value"
                                  @input="validate"
                                  :label="$t('Global.Sheets.observaciones')"
                                  :rules="editedItem.observaciones.rules"
                                  clearable :rows="2"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" md="6" v-if="Object.keys(editedItem).includes('documento')">
                    <template>
                      <v-file-input show-size :label="$t('Global.Sheets.documentoPliego')"></v-file-input>
                    </template>
                  </v-col>
                  <v-col cols="12" md="6" v-if="Object.keys(editedItem).includes('concesiones')">
                    <template>
                      <v-file-input show-size multiple :label="$t('Global.Sheets.concesiones')"></v-file-input>
                    </template>
                  </v-col>
                </v-row>

                <v-row v-if="isSheet" class="ml-n5">
                  <v-col>
                    <product-tree />
                  </v-col>
                </v-row>

              </v-sheet>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">{{ $t('Global.Actions.cancelar')  }}</v-btn>
          <v-btn color="blue darken-1" text @click="submitItem" :disabled="!validForm">{{ $t('Global.Actions.guardar')  }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialogo de añadir materiales -->
    <v-dialog v-model="dialogMaterials" max-width="600px">
      <v-card>
        <v-card-title>
          <h3 class=" pa-0 pb-6" >{{ $t('Global.Actions.addMaterials')  }}</h3>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="12">
              <select-table :headers="materialsHeadersDialog" :subtitle="$t('Global.Materials.tituloDialogo') " :single-select="true"
                            :items="materiales" :left-btn-txt="$t('Global.Actions.cancelar') " :left-btn-event="closeDialogMaterials"
                            :right-btn-txt="$t('Global.Actions.addEnsayos') " :right-btn-event="openDialogTest"
              ></select-table>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Dialogo de añadir ensayos -->
    <v-dialog v-model="dialogTest" max-width="600px">
      <v-card>
        <v-card-title>
          <h3 class=" pa-0 pb-6" >{{ $t('Global.Actions.addEnsayos') }}</h3>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="12">
              <select-table :headers="testHeaders" :subtitle="$t('Global.Test.titulo')" :items="ensayos"
                            :left-btn-txt="$t('Global.Actions.cancelar')" :left-btn-event="closeDialogTest"
                            :right-btn-txt="$t('Global.Actions.guardar')" :right-btn-event="saveMaterialsWithTest"></select-table>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <confirm-dialog
      ref="confirmDialog"
      :title="confirmDialogTitle"
      :message="confirmDialogMessage"
    />
  </div>
</template>

<script>

import SelectTable from "@/components/Modelos/SelectTable"
import materiales from "@/utils/data/materiales-sample.json";
import ensayos from "@/utils/data/ensayos-sample.json";
import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'
import validations from '@/utils/validations'
import moment from "moment";
import ProductTree from "../UI/Custom/ProductTree.vue"
import CrudService from "@/services/crud.service";
import TableNames from '@/config/table-names'
import {OPEN_SNACKBAR} from "@/store/actions/snackbar";


export default {
  name: "FormularioModelo",
  components:{
    SelectTable,
    ConfirmDialog,
    ProductTree
  },
  props: {
    activate: {
        type: Boolean,
        default: false
    },
    item: {
        type: Object,
        default: null
    },
    headers: {
        type: Array,
        default: () => []
    },
    isSheet: {
      type: Boolean,
      default: () => false
    },
    isContest: {
      type: Boolean,
      default: () => false
    },
    estadosConcurso: {type: Array, default:() => []},
    formTitle: {type:String, default:() => "Elemento"}
  },
  data() {
      return {
        editedItem: {},
        defaultItem: {},
        rules: validations,
        validForm: false,
        rolesItems: [
          {rol:'Jefe de Laboratorio',permisos:'Validador laboratorio'},
          {rol:'Jefe de planta', permisos:'Validador planta'},
          {rol:'Técnico de Laboratorio',permisos:'Técnico'},
          {rol:'Secretario', permisos:'Secretaría, Administración'}
        ],
        concursos: [],
        materialsHeaders: [
          { text: this.$t('Global.Materials.codigo'), value: 'codigo', align: 'left', sortable: true, rules: [] },
          { text: this.$t('Global.Materials.nombre'), value: 'nombre', align: 'left', sortable: true, rules: [] },
          { text: this.$t('Global.Actions.acciones'), value: 'actions', align: 'center', sortable: false, width: "130px" },
        ],
        customAction1 : {active: true, icon: 'mdi-help-circle', description: 'listaEnsayos'},
        dialogMaterials: false,
        dialogTest: false,
        materialsHeadersDialog: [
          { text: this.$t('Global.Materials.codigo'), value: 'codigo', align: 'left', sortable: true, rules: [] },
          { text: this.$t('Global.Materials.nombre'), value: 'nombre', align: 'left', sortable: true, rules: [] },
        ],
        testHeaders: [
          { text: this.$t('Global.Materials.codigo'), value: 'codigo', align: 'left', sortable: false, rules: [] },
          { text: this.$t('Global.Materials.nombre'), value: 'nombre', align: 'left', sortable: false, rules: [] }
        ],
        materiales: materiales,
        ensayos: ensayos,
        newMaterial: {
          codigo: '',
          descripcion: '',
          id:'',
          nombre: '',
          ensayos:[]
        },
        materialAux : {},
        ensayosAux : [],
        confirmDialogTitle: "",
        confirmDialogMessage: null,
        fechaCreacionDialog: false,
        maxValueDate: new Date().toISOString().slice(0, 10),
        tablaConcursos : TableNames.CONTEST
      }
  },
  methods: {
    getEstadoConcurso( status ) {
      if(this.isContest){
        const identificador = this.estadosConcurso.map(e => e.idEstadoConcurso).indexOf(status)
        if(identificador !== -1) return this.estadosConcurso[identificador].identificador
      }
      else if(this.isSheet){
        const identificador = this.estadosConcurso.map(e => e.idEstadoPliego).indexOf(status)
        if(identificador !== -1) return this.estadosConcurso[identificador].identificador
      }
    },
    getColumns(item){
      if(this.isSheet)
      return Object.fromEntries(Object.entries(item).filter(([key]) => !key.includes('observaciones') && !key.includes('documento') && !key.includes('concesiones')))
      else return  Object.fromEntries(Object.entries(item).filter(([key]) => !key.includes('observaciones')))
    },
    getDisabledItems(key){
      if ( key === 'estadoConcurso' ||  key === 'estadoPliego' || (key === 'fechaCreacion' && this.isContest)) return true
      else return false
    },
    validate() {
        this.validForm = this.$refs.modelForm.validate()
    },
    async closeDialog() {
      if(this.validForm){
        this.confirmDialogTitle = this.$t('Global.Contest.cerrarFormularioConcurso')
        this.confirmDialogMessage = this.$t('Global.Contest.confirmacionCerrarFormularioConcurso')
        const confirm = await this.$refs.confirmDialog.open()
        if(!confirm) return
        this.dialogTest=false
        this.editedItem = Object.assign({}, this.defaultItem)
        this.$emit('close-dialog')
      }else{
        this.editedItem = Object.assign({}, this.defaultItem)
        this.$emit('close-dialog')
      }
    },
    submitItem() {
        // sustituimos los campos nulos por strings vacios
        // y los cargamos en el item que se emite
        for (const prop in this.editedItem )
            if (this.editedItem[prop].value === null) this.editedItem[prop].value = ""
        if (this.item) {
            for (const prop in this.editedItem ) this.item[prop] = this.editedItem[prop].value
            this.$emit('update-item', this.item)
        }
        else {
          for(const prop in this.editedItem){
            delete this.editedItem[prop]['rules']
            this.editedItem[prop] = this.editedItem[prop].value
          }
            this.$emit('create-item', this.editedItem)
        }
      this.editedItem = Object.assign({}, this.defaultItem)
      this.$emit('close-dialog')
    },
    closeDialogMaterials(){
      this.dialogMaterials=false
      this.materialAux={}
    },
    async closeDialogTest(){
      this.confirmDialogTitle = this.$t('Global.Test.cerrarEnsayo')
      this.confirmDialogMessage = this.$t('Global.Test.confirmacionCerrarEnsayo')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm) return
      this.newMaterial={}
      this.materialAux={}
      this.ensayosAux=[]
      this.dialogTest=false
    },
    openDialogTest(item){
      this.dialogMaterials=false
      this.materialAux = item[0]
      this.dialogTest = true
    },
    async saveMaterialsWithTest(item){
      this.confirmDialogTitle =  this.$t('Global.Test.guardarMaterialEnsayos')
      this.confirmDialogMessage =  this.$t('Global.Test.confirmacionGuardarMaterialEnsayos')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm) return
      this.ensayosAux = item
      this.newMaterial.codigo = this.materialAux.codigo
      this.newMaterial.id = this.materialAux.id
      this.newMaterial.descripcion = this.materialAux.descripcion
      this.newMaterial.nombre= this.materialAux.nombre
      this.newMaterial.ensayos=this.ensayosAux
      this.editedItem.materiales.value.push(this.newMaterial)
      this.dialogTest=false
    },
    getColor( status ) {
      if (status.toString() === this.$t('Global.Contest.estadoUso')) return 'success'
      else if (status.toString() === this.$t('Global.Contest.estadoProceso')) return 'primary'
      else return 'warning'
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
  },
  filters: {
      capitalize: ( text ) => text.charAt(0).toUpperCase() + text.substr(1),
      deCamelCase: ( text ) => text.replace(/[A-Z]/g, ' $&')
  },
  mounted() {
      // generamos deafultItem (vacio)
      for (const element of this.headers) {
          if (element.value !== 'actions' && element.value !== 'data-table-expand' )
            if(element.value === 'numExpediente') this.defaultItem['numeroExpediente'] = {value:"", rules: element.rules}
            else if(element.value === 'fecCreacion') this.defaultItem['fechaCreacion'] = {value:"", rules: element.rules}
            else if(element.value === 'fecRecepcion') this.defaultItem['fechaRecepcion'] = {value:"", rules: element.rules}
            else if(element.value === 'idEstadoConcurso') this.defaultItem['estadoConcurso'] = {value:"", rules: element.rules}
            else if(element.value === 'idEstadoPliego') this.defaultItem['estadoPliego'] = {value:"", rules: element.rules}
            else if(element.value === 'concurso.numExpediente') this.defaultItem['concurso'] = {value:"", rules: element.rules}
            else this.defaultItem[element.value] = {value:"", rules: element.rules}
      }
      if(this.isSheet){
        this.defaultItem['observaciones'] = {value:"", rules: [validations.maxLength700()]}
        this.defaultItem['documento'] = {value:"", rules: []}
        this.defaultItem['concesiones'] = {value:"", rules: []}
        CrudService.all(this.tablaConcursos)
          .then((response) => {
            console.log(response)
            this.concursos = response.data
          })
          .catch(() => {
            this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Contest.errorEstados'), color: 'error', icon:'mdi-alert-circle-outline'})
          })
      }

      // generamos editedItem
      this.editedItem = Object.assign({}, this.defaultItem)
      // cargamos propiedades de item en editedItem
      if (this.item) {
          for (const prop in this.editedItem ) {
            if(Object.prototype.hasOwnProperty.call(this.item, prop))
              this.editedItem[prop].value = this.item[prop]
          }
          if(this.isSheet){
            this.getConcursoPliego(this.item)
            this.editedItem.observaciones = {value:this.item.observaciones, rules:[]}
            this.editedItem.documento = {value:this.item.documento, rules:[]}
            this.editedItem.estadoPliego = {value:this.item.idEstadoPliego, rules:[]}
            this.editedItem.concesiones = {value:this.item.concesiones, rules:[]}
            this.editedItem.fechaRecepcion = {value:moment(this.item.fecRecepcion).format('YYYY-MM-DD'), rules:[]}
            this.editedItem.concurso={value: this.item.concurso, rules: []}
            delete this.editedItem.fechaCreacion
            delete this.editedItem.codigo
          }
          if(this.isContest){
            this.editedItem.fechaCreacion = {value:moment(this.item.fecCreacion).format('YYYY-MM-DD'), rules:[]}
            this.editedItem.estadoConcurso = {value:this.item.idEstadoConcurso, rules:[]}
            this.editedItem.numeroExpediente = {value:this.item.numExpediente, rules:[]}
          }
      }else{
        if(Object.keys(this.editedItem).includes('fechaCreacion'))
          this.editedItem.fechaCreacion.value = moment(new Date()).format('YYYY-MM-DD')
        if(this.isSheet){
          this.editedItem.observaciones = {value: "", rules:[]}
          this.editedItem.documento = {value: "", rules:[]}
          this.editedItem.observaciones = {value: "", rules:[]}
          this.editedItem.fechaRecepcion.value = moment(new Date()).format('YYYY-MM-DD')
          delete this.editedItem.fechaCreacion
          delete this.editedItem.codigo
          this.editedItem.estadoPliego= {value: 1 , rules:[]}
        }
        else if(this.isContest){
          this.editedItem.estadoConcurso= {value: 1, rules:[]}
        }
      }
  }
}
</script>

