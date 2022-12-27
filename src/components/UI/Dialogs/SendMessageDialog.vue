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

  import { mapGetters } from 'vuex'
  import { db, FieldValue } from '@/firebase'
  import { OPEN_SNACKBAR } from "@/store/actions/snackbar";
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
    computed: {
      ...mapGetters(["getUser"]),
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
              // ENVIAMOS EL MENSAJE DESDE AQUI
              const collection = this.getUser.category === 1 ? "usuariosProfesionales" : "usuariosGenericos"
              const addMessage = await db.collection(collection).doc(this.destinatario)
              addMessage.update ({
                messages: FieldValue.arrayUnion({
                  date: new Date().getTime(),
                  text: this.messageText,
                  from: this.getUser.email
                })
              })
              .then(() => {
                this.$store.dispatch(OPEN_SNACKBAR, {
                text: "Mensaje enviado correctamente",
                color: 'success',
                y: 'bottom',
                x: 'right',
                timeout: 4000
              })
              })
              .catch(error => {
                this.$store.dispatch(OPEN_SNACKBAR, {
                  text: error.message,
                  color: 'error',
                  y: 'bottom',
                  x: 'right',
                  icon: "mdi-alert-octagon-outline",
                  timeout: 4000
                })
              })
              this.closeDialog()
          }
      },
      validate() {
          this.validForm = this.$refs.form.validate()
      },
    }
  }
  </script>