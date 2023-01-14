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
              <v-icon color="primary" size="32" left>mdi-account-plus</v-icon>
              <span class="primary--text">Añadir Paciente</span>
            </v-toolbar-title>
          </v-toolbar>
          <!-- Contenido -->
          <v-card-text>
            <v-form ref="form" @submit.prevent >
              <v-container class="pa-0 pt-3">
                <v-row class="py-6">
                  <v-col cols="12" class="mx-2 my-0 py-0">
                    <v-text-field
                        @change="checkPatient"
                        clearable
                        v-model="patientUser" 
                        label="Comprobar usuario"
                    />
                    <div class="mt-n3 mb-6" v-if="userExists">
                      <span class="mr-2">El usuario existe</span>
                      <v-icon dense color="success">mdi-check</v-icon>
                    </div>
                    <v-text-field
                        v-if="userExists"
                        @input="validate" 
                        clearable
                        v-model="patientName" 
                        label="Añadir nombre paciente"
                        :rules="[rules.required]"
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
            <v-btn v-if="userExists" color="blue darken-1" text @click="addPatient" :disabled="!validForm">Añadir</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <confirm-dialog 
        ref="confirmDialog"
        message="¿Desea añadir al paciente?"
      />

    </div>
  </template>
  
  <script>

  import { mapGetters, mapActions } from 'vuex'
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
        patientUser: '',
        patientName: '',
        rules: validations,
        userExists: false
      }
    },
    computed: {
      ...mapGetters(["getUser"]),
    },
    methods: {
      ...mapActions(["updatePatients", "setOverlay"]),
      closeDialog() {
            this.patientUser = ''
            this.patientName = ''
            this.userExists = false
            this.$emit('close-dialog')
      },
      checkPatient(){
        const checkUser = db.collection("usuariosGenericos").doc(this.patientUser)
        checkUser.get()
            .then ((doc) => {
                if (doc.exists) {
                    this.userExists = true
                }                    
                else 
                    this.$store.dispatch(OPEN_SNACKBAR, {
                    text: 'El usuario introducido no existe',
                    color: 'warning',
                    y: 'bottom',
                    x: 'right',
                    icon: "mdi-alert-octagon-outline",
                    timeout: 2000
                    })
                }
            )
      },
      async addPatient(){
        const confirm = await this.$refs.confirmDialog.open()           
          if(!confirm){
              return    
          } else {          
            this.setOverlay(true)
            db.collection("usuariosProfesionales").doc(this.getUser.email).get()
            .then((doc) => {            
                if (!doc.data().patients.map((p) => p.id).includes(this.patientUser)) {
                    const addPatient = db.collection("usuariosProfesionales").doc(this.getUser.email)                
                    addPatient.update({
                        patients: FieldValue.arrayUnion({ 
                            id: this.patientUser,
                            name: this.patientName,
                            valoration: null,
                            patientData: null
                        })
                    })
                    .then(() => {
                      const addPro = db.collection("usuariosGenericos").doc(this.patientUser)
                      addPro.update({
                        pros: FieldValue.arrayUnion(this.getUser.email)
                      })  
                    })
                    .then(() => {
                        this.updatePatients({
                          id: this.patientUser,
                          name: this.patientName,
                          valoration: null,
                          patientData: null
                        })
                        this.closeDialog()
                        this.$store.dispatch(OPEN_SNACKBAR, {
                        text: "Paciente creado correctamente",
                        color: 'success',
                        y: 'bottom',
                        x: 'right',
                        timeout: 4000
                    })
                  })
                } else {
                    this.$store.dispatch(OPEN_SNACKBAR, {
                        text: 'El usuario ya existe como paciente',
                        color: 'warning',
                        y: 'bottom',
                        x: 'right',
                        icon: "mdi-alert-octagon-outline",
                        timeout: 2000
                        }) 
                    this.closeDialog()    
                }                
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
                this.closeDialog()
            })
            .finally(()=> this.setOverlay(false))  
          } 
      },
      validate() {
          this.validForm = this.$refs.form.validate()
      },
    }
  }
  </script>