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
              <v-icon color="primary" size="32" left>mdi-clipboard-check-outline</v-icon>
              <span class="primary--text">Añadir Sesión</span>
            </v-toolbar-title>
          </v-toolbar>
          <!-- Contenido -->
          <v-card-text>
            <v-container class="mx-0" fluid>
                <v-form ref="sessionForm" @submit.prevent >
                    <v-sheet class="relief px-6">
                        <v-row class="mt-4">
                            <v-col>
                                <v-text-field
                                    label="Nombre de la sesión:"
                                    v-model="sessionData.name"
                                    :rules="[rules.required]"
                                    clearable
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="mt-n1">
                            <v-col>
                                <!-- <v-text-field
                                label="Duración de la sesión:"
                                v-model="sessionData.duration"
                                clearable
                                >
                            </v-text-field> -->
                            <v-slider
                                v-model="sessionData.duration"
                                color="primary"
                                label="Duración:"
                                hint="Duración en minutos"
                                min="1"
                                max="120"
                                track-color="#a1a1a1"
                                thumb-label
                                dense                               
                                ></v-slider>
                            </v-col>
                    </v-row> 
                    <v-row>
                        <v-col>
                                <h4 class="font-weight-regular" style="color: rgba(0,0,0,.67)">Fecha de la sesión:</h4>
                                <v-date-picker
                                    v-model="sessionData.date"
                                    class="mt-4"
                                ></v-date-picker>
                            </v-col>
                        </v-row>   
                    </v-sheet>
                </v-form>
            </v-container>
          </v-card-text>
          <!-- Acciones -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="createSession">Crear Sesión</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <confirm-dialog 
        ref="confirmDialog"
        message="¿Desea crear esta sesión?"
      />

    </div>
  </template>
  
<script>

import { mapGetters } from 'vuex'
import moment from "moment"
import validations from '@/utils/validations'
import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'

export default {
    name: "Session",
    components: {
        ConfirmDialog
    },
    props: {
        activate: {
            type: Boolean,
            default: false
        },
        items: {
            type: Array,
            default: () => []
        }
    },
    data() {
      return {
        rules: validations,
        sessionData: {
            id: null,
            date: '',
            name:'',
            duration: '',
            anotaciones:'',
            tareas:''
        }
      }
    },
    computed: {
      ...mapGetters(["getUser"])
    },
    methods:{
        async createSession(){
            const confirm = await this.$refs.confirmDialog.open()           
            if(!confirm){
              return    
            }
            else { 
                this.sessionData.id = this.items.length + 1
                this.sessionData.date = moment(this.sessionData.date).format('DD-MM-YYYY')
                this.$emit('create-session', this.sessionData)
                this.closeDialog()
            }
        },
        closeDialog() {
          this.$emit('close-dialog')
        }
    },
    mounted() {

    }
    
}
</script>