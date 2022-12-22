<template>
    <div class="text-center">
      <v-dialog
        v-model="activate"
        @click:outside="closeDialog"
        max-width="500px"
      >
        <v-card flat class="relief">
          <!-- Titulo -->
          <v-toolbar class="relief">
            <v-toolbar-title class="ml-3 mt-1">
              <v-icon color="primary" size="32" left>mdi-message-arrow-right-outline</v-icon>
              <span class="primary--text">Enviar mensaje</span>
            </v-toolbar-title>
          </v-toolbar>
          <!-- Contenido -->
          <v-card-text>
            <v-form ref="form" @submit.prevent="save()">
              <v-container class="pa-0 pt-3">
                <v-row>
                  <v-col cols="12" class="mx-2">
                    <v-list-item class="ma-0 py-0 px-2" two-line>
                        <v-list-item-content>
                        <v-list-item-title class="mt-n3 mb-0"><p class="font-weight-bold">Destinatario:</p></v-list-item-title>
                        <v-list-item-subtitle class="mt-n2 mb-0">{{ destinatario }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>                                         
                  </v-col>
                  <v-col cols="12" class="mx-2 my-0 py-0">
                    <v-textarea 
                        @input="validate" 
                        clearable
                        filled
                        shaped
                        auto-grow
                        v-model="messageText" 
                        label="Escribir mensaje:"
                        :rules="[rules.required, rules.maxLength200]"
                        counter
                        prepend-icon="mdi-comment"
                        rows="4"
                        row-height="30"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <!-- Acciones -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="sendMessage" :disabled="!validForm">Enviar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <confirm-dialog 
        ref="confirmDialog"
        message="¿Desea enviar el mensaje?"
      />

    </div>
  </template>
  
  <script>
  
  import {OPEN_SNACKBAR} from "@/store/actions/snackbar"
  import validations from '@/utils/validations'
  import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'
  
  export default {
    name: "sendMessageDialog",
    components: {
        ConfirmDialog
    },
    props: {
      activate: { 
        type: Boolean
      },
      destinatario: {
        type: String
      }
    },
    data () {
      return {
        validForm: false,
        messageText: '',
        rules: validations
      }
    },
    methods: {
        closeDialog() {
            this.messageText = null
            this.$emit('close-dialog')
        },
        async sendMessage() {
            const confirm = await this.$refs.confirmDialog.open()           
            if(!confirm){
                return    
            }
            else {
                this.$emit('send-message', this.messageText)
                this.closeDialog()
            }
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