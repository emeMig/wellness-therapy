<template>
  <div>
    <!-- Dialogo de adjuntar archivos -->
    <v-dialog v-model="dialogoArchivos" max-width="900px" persistent>
      <v-card class="px-4" color="background">
        <v-card-title>
          <v-row>
            <v-col cols="12" sm="8">
              <h3 class=" pa-0 pb-6" >{{ titleArchivos }}</h3>
            </v-col>
            <v-col cols="12" sm="4" align="right">
              <v-btn color="primary" text icon dark class="mb-2" ><v-icon dense @click="closeDialog" color="primary">mdi-close-circle</v-icon></v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-container class="mb-2 pa-0">
            <v-form ref="modelForm">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-file-input
                    v-model="selected"
                    show-size
                    :label=" $t('Global.Actions.adjuntarArchivos')"
                    multiple
                    @change="validate"
                  ></v-file-input>
                </v-col>
              </v-row>
                <v-row>
                  <v-col cols="12" sm="12">
                    <TablaModelo :headers="archivosHeaders" :items="archivos" item-key="nombre" :hide-expansion="true" :hide-button="true"
                                 :hide-edit="true" @download-document = "downloadDocument" :custom-action2="customAction2"></TablaModelo>
                  </v-col>
                </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">{{  $t('Global.Actions.cancelar') }}</v-btn>
          <v-btn color="blue darken-1" text @click="saveDoc" :disabled="!validForm">{{  $t('Global.Actions.guardar') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import TablaModelo from "@/components/Modelos/TablaModelo"
export default {
  name: 'dialogoDocumentos',
  components: {TablaModelo},
  props:{
    readOnly: {type: Boolean, default: () => false},
    dialogoArchivos: {type: Boolean, required :  true}
  },
  data () {
    return {
      titleArchivos: this.$t('Global.Acts.archivosAdjuntos'),
      archivosHeaders: [
        {text:this.$t('Global.Acts.nombreArchivo'), value:'name'},
        {text:this.$t('Global.Acts.size'), value:'size'},
        { text: this.$t('Global.Actions.acciones'), value: 'actions', align: 'center', sortable: false, width: "130px" }
      ],
      archivos: [
        {name:"Archivo 1", size: "100Kb"},
        {name:"Archivo 3", size: "200Kb"},
        {name:"Archivo 4", size: "300Kb"},
      ],
      editedItem:[],
      defaultItem: [],
      dialogoAddDocument: false,
      customAction3: {active: true, description: this.$t('Global.Actions.add'), icon: 'mdi-paperclip'},
      customAction2: {active: true, description: this.$t('Global.Actions.descargar'), icon: 'mdi-download'},
      validForm : false,
      selected:[]
    }
  },
  methods: {
    downloadDocument(item) {
      console.log('descarga documento' + item.nombre)
    },
    closeDialog() {
      this.selected = []
      this.$emit('close-dialog')
    },
    saveDoc() {
      this.$emit('save-documents', this.selected)
      this.closeDialog()
    },
    validate() {
      this.validForm = this.$refs.modelForm.validate()
    },
  }
}
</script>

<style>

</style>
