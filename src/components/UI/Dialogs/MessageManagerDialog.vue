<template>
    <div class="text-center">
      <v-dialog
        v-model="activate"
        @click:outside="closeDialog"
        max-width="600px"
        persistent
      >
        <v-card flat class="relief">
          <!-- Titulo -->
          <v-toolbar class="relief">
            <v-toolbar-title class="ml-3 mt-1">
              <v-icon color="primary" size="32" left>mdi-message-text</v-icon>
              <span class="primary--text">Mensajes recibidos</span>
            </v-toolbar-title>
          </v-toolbar>
          <!-- Contenido -->
          <v-card-text v-if="messages.length === 0" class="mt-10">
            <h3 class="pl-2">No hay mensajes recibidos</h3>
          </v-card-text>
          <v-card-text v-else class="mt-10">
            <v-row v-for="(message, index) in messages" :key="index">
                <v-card
                    class="relief-inset mb-3"
                    shaped
                    width="100%"
                >
                    <v-card-title class="d-flex justify-space-between mx-3">
                        <h5>From: <span class="pl-2" style="font-weight: 500">{{ message.from }} </span></h5>
                        <h5 style="font-weight: 600"> {{ formatDate(message.date) }} </h5>                           
                    </v-card-title>
                    <v-card-text class="my-0 py-0">
                        <v-col>
                            <span>
                                {{ message.text }}
                            </span>
                        </v-col>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-end mx-3 mb-2">
                        <!-- Boton contestar -->
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon 
                                    color="primary" 
                                    size="26" 
                                    class="mr-4" 
                                    v-bind="attrs" 
                                    v-on="on" 
                                    delay-open="200"
                                    @click="replyMessage(message)"
                                >
                                    mdi-reply
                                </v-icon>
                            </template>
                            <span>Responder</span>
                        </v-tooltip>
                        <!-- Boton borrar -->
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon 
                                    color="primary" 
                                    size="24" 
                                    class="mr-3" 
                                    v-bind="attrs" 
                                    v-on="on" 
                                    delay-open="200"
                                    @click="deleteMessage(message)"
                                >
                                    mdi-delete
                                </v-icon>
                            </template>
                            <span>Borrar</span>
                        </v-tooltip>
                    </v-card-actions>   
                </v-card>
            </v-row>
          </v-card-text>
          <!-- Acciones -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Cerrar</v-btn>
            <!-- <v-btn color="blue darken-1" text @click="sendMessage" :disabled="!validForm">Enviar</v-btn> -->
          </v-card-actions>
        </v-card>
        </v-dialog>
            <confirm-dialog 
            ref="confirmDialog"
            message="¿Desea borrar el mensaje?"
        />
        <send-message-dialog
            :activate="sendMessageDialog"
            :destinatario="toSendMessage.from"
            @close-dialog="sendMessageDialog=false"
        />
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex'
  import moment from "moment"
  import { db, FieldValue } from '@/firebase'
  import {OPEN_SNACKBAR} from "@/store/actions/snackbar"
  import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'
  import SendMessageDialog from '@/components/UI/Dialogs/SendMessageDialog.vue'
  
  export default {
    name: "messageManagerDialog",
    components: {
        ConfirmDialog,
        SendMessageDialog
    },
    props: {
      activate: { 
        type: Boolean
      },
      destinatario: {
        type: String
      },
      items: {
        type: Array
      }
    },
    data () {
      return {
        toSendMessage: { },
        sendMessageDialog: false
      }
    },
    computed: {
      ...mapGetters(["getUser"]),
      messages() {
        const messages = this.items
        if (messages.length > 0) {
          return messages.sort((a,b) => b.date - a.date)
        } else 
          return []
      }
    },
    methods: {
      ...mapActions(["updateMessages"]),
        async deleteMessage(message){
            const confirm = await this.$refs.confirmDialog.open() 
            if(!confirm){
                return    
            }
            else {
              // BORRAMOS MENSAJE AQUI
              const collection = this.getUser.category === 2 ? "usuariosProfesionales" : "usuariosGenericos"
              const deleteMessage = await db.collection(collection).doc(this.getUser.email)
              deleteMessage.update ({
                messages: FieldValue.arrayRemove(message)
              })
              .then(() => {
                const collection = this.getUser.category === 2 ? "usuariosProfesionales" : "usuariosGenericos"
                db.collection(collection).doc(this.getUser.email).get()
                .then((doc) => {
                  this.updateMessages(doc.data().messages)
                  this.$store.dispatch(OPEN_SNACKBAR, {
                    text: "Mensaje borrado correctamente",
                    y: 'bottom',
                    color: 'success',
                    x: 'right',
                    timeout: 4000
                  })
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
        replyMessage(message) {
            this.toSendMessage = message
            this.sendMessageDialog = true
        },
        formatDate(time) {
            return moment(time).format('hh:mm DD-MM-YYYY') 
        },
        closeDialog() {
            // submitimos lista de mensajes
            this.$emit('close-dialog')
        },

    // TODO: para copiar el snackbar de mensaje enviado

    }
  }
  </script>