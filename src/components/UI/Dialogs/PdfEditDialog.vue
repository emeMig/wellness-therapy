<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      @click:outside="closeDialog"
      max-width="400px"
    >
      <v-card flat class="relief">
        <!-- Titulo -->
        <v-toolbar class="relief">
          <v-toolbar-title class="ml-3 mt-1">
            <v-icon color="primary" size="32" left>mdi-file-pdf-box</v-icon>
            <span class="primary--text">{{ $t("Global.PdfEditDialog.title") }}</span>
          </v-toolbar-title>
        </v-toolbar>
        <!-- Contenido -->
        <v-card-text>
          <v-form ref="form" @submit.prevent="save()">
            <v-container class="pa-0 pt-3">
              <v-row>
                <v-col cols="12" class="mx-2">
                  <v-text-field @input="validate" v-model="nuevaFirma" :label="$t('Global.PdfEditDialog.newSignature')" hide-details="auto" clearable :rules="[]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="mx-2">
                  <v-file-input prepend-icon="" v-model="archivoPdf" prepend-inner-icon="mdi-file-pdf-box" accept=".pdf" :label="$t('Global.PdfEditDialog.upLogo')"
                                :rules="[]"/>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <!-- Acciones -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">{{ $t("Global.PdfEditDialog.cancel") }} </v-btn>
          <v-btn color="blue darken-1" text @click="submitPdf" :disabled="!validForm">{{ $t("Global.PdfEditDialog.edit") }} </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import {OPEN_SNACKBAR} from "@/store/actions/snackbar";

export default {
  name: "PdfEditDialog",
  props: {
    dialog: Boolean
  },
  data () {
    return {
      validForm: false,
      nuevaFirma: null,
      archivoPdf: null
    }
  },
  methods: {
    closeDialog() {
      this.nuevaFirma = null
      this.archivoPdf = null
      this.$emit('closeDialog')
    },
    validate() {
      this.validForm = this.$refs.form.validate()
    },
    submitPdf () {
      let errExtension = false
      const allowedExtension = /(.pdf)$/i
      if (this.archivoPdf !== null && !allowedExtension.exec(this.archivoPdf.name)){
        errExtension = true
      }
      if(this.nuevaFirma !== null && this.archivoPdf !== null && !errExtension){
        // Mostrar snackbar para informar al usuario de la operación exitosa
        this.$store.dispatch(OPEN_SNACKBAR, {
          text: this.$t("Global.ConfirmDialog.submitPdfSignature"),
          color: 'success',
          x: 'right',
          timeout: 4000
        })
        this.closeDialog()
      } else {
        let errMsg = null
        errMsg = this.$t("Global.ConfirmDialog.warningFillForm")
        if(errExtension){
          errMsg = this.$t("Global.ConfirmDialog.errorType")
        }
        // Mostrar snackbar para alertar al usuario
        this.$store.dispatch(OPEN_SNACKBAR, {
          text: errMsg,
          color: 'error',
          x: 'right',
          timeout: 4000
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
