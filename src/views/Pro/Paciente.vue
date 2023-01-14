<template>
  <v-container fluid>
    <v-row class="pt-4">
      <v-col cols="12">
        <titulo 
          :titulo="patientName" 
          :subtitulo="patientId"
        />
        <v-tooltip content-class='custom-tooltip' right>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-on="on" 
              v-bind="attrs"
              color="primary"
              class="ml-2"
              @click="deletePatient()"
            >
              mdi-delete-circle
            </v-icon>
          </template>
          <span>Borrar paciente</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="3">
        <v-card
          class="px-4 py-3 relief"
        >
        <v-card-title>
          <h3 class="text-shadowed title-font-bold responsive-title">Perfil</h3>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="Nombre"
                v-model="patientData.profile.surname" 
                @blur="savePatientData"         
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Apellido"
                v-model="patientData.profile.lastname" 
                @blur="savePatientData"       
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Dirección"
                v-model="patientData.profile.address" 
                @blur="savePatientData"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="Ciudad"
                v-model="patientData.profile.city"
                @blur="savePatientData" 
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Teléfono"
                v-model="patientData.profile.phone" 
                @blur="savePatientData"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols ="12">
              <v-text-field
                label="Email"
                v-model="patientData.profile.email" 
                @blur="savePatientData"
              ></v-text-field>
            </v-col>
          </v-row>  
          <v-row>
            <v-col cols ="6">
              <v-text-field
                label="Género"
                v-model="patientData.profile.gender"
                @blur="savePatientData" 
              ></v-text-field>
            </v-col>
            <v-col cols ="6">
              <v-text-field
                label="Edad"
                v-model="patientData.profile.age"
                @blur="savePatientData" 
              ></v-text-field>
            </v-col>
          </v-row>  
          <v-row>
            <v-col>
              <v-text-field
                label="Estudios"
                v-model="patientData.profile.formation"
                @blur="savePatientData" 
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Profesión"
                v-model="patientData.profile.job"
                @blur="savePatientData" 
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Medios de pago"
                v-model="patientData.profile.payment" 
                @blur="savePatientData"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Datos bancarios"
                v-model="patientData.profile.bank" 
                @blur="savePatientData"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="3">
        <v-card
          class="px-4 py-3 relief"
        >
        <v-card-title>
          <h3 class="text-shadowed title-font-bold responsive-title">Encuadre</h3>
        </v-card-title>
        <v-card-text class="mt-6">
          <v-row>
            <v-col>
              <v-textarea
                label="ANTECEDENTES" 
                v-model="patientData.encuadre.antecedentes"
                @keyup.enter="savePatientData"
                counter
                clearable
                filled
                shaped
                auto-grow
                rows="4"
                row-height="30"         
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                label="HISTORIAL CLÍNICO" 
                v-model="patientData.encuadre.historial"
                @keyup.enter="savePatientData"
                counter
                clearable
                filled
                shaped
                auto-grow
                rows="4"
                row-height="30"          
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                label="TRATAMIENTOS"
                v-model="patientData.encuadre.tratamientos"
                @blur="savePatientData"
                counter
                clearable
                filled
                shaped
                auto-grow
                rows="4"
                row-height="30"           
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                label="OBSERVACIONES"
                v-model="patientData.encuadre.observaciones"
                @blur="savePatientData"
                counter
                clearable
                filled
                shaped
                auto-grow
                rows="4"
                row-height="30"           
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>  
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <v-card
          class="px-4 py-3 relief"
        >
        <v-card-title>
          <h3 class="text-shadowed title-font-bold responsive-title">Sesiones</h3>
        </v-card-title>
          <v-card-text>
              <v-data-table 
                class="crud-table expanded-crud-table px-6 relief"
                :headers="headers"
                :items="patientData.items"
                :single-expand="true"                
                
                :show-expand="true"
              >

              <template v-slot:top>
                <v-toolbar flat color="transparent" class="py-4">
                  <v-spacer></v-spacer>
                  <v-btn color="primary" dark class="mb-6 mr-n4" @click="newSesion">
                    <div class="px-2">Nueva Sesión</div>
                    <v-icon dense>mdi-plus-thick</v-icon>
                  </v-btn>
                </v-toolbar>
              </template>  

              <template #[`item.duration`]="{ item }">
                <span>
                  {{ item.duration }}m
                </span>
              </template>

              <template #[`item.actions`]="{ item }">
                <v-icon
                  small
                  color="primary"
                  class="mr-2"
                  @click="deleteSession(item)"
                >
                  mdi-delete
                </v-icon>
              </template>

              <template #[`expanded-item`]="{ headers, item }">
                <td :colspan="headers.length" class="relief-inset">
                  <v-row>
                    <v-col cols="6">
                      <v-textarea
                        label="ANOTACIONES"
                        v-model="item.anotaciones"
                        @blur="savePatientData"
                        counter
                        clearable
                        filled
                        shaped
                        auto-grow
                        rows="4"
                        row-height="30"           
                      ></v-textarea>
                    </v-col>
                    <v-col cols="6">
                      <v-textarea
                        label="TAREAS"
                        v-model="item.tareas"
                        @blur="savePatientData"
                        counter
                        clearable
                        filled
                        shaped
                        auto-grow
                        rows="4"
                        row-height="30"           
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <session
      :items = "patientData.items"
      :activate ="openNewSession"
      v-if="openNewSession"
      @close-dialog="openNewSession=false"
      @create-session="createSession"
    ></session>
    <confirm-dialog 
        ref="confirmDialog"
        message="¿Desea completar esta acción?"
      />
  </v-container>  
  
</template>
  
<script>
  import { db, FieldValue } from '@/firebase'
  import { mapGetters, mapActions } from 'vuex'
  import { OPEN_SNACKBAR } from "@/store/actions/snackbar";
  import Titulo from "@/components/Modelos/TituloModelo"
  import Session from "./Session.vue"
  import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'

  export default {
    name: "Paciente",
    components: {
      Titulo,
      Session,
      ConfirmDialog
    },
    data() {
      return {
        openNewSession: false,
        patientId: this.$route.params.id,
        patient: null,
        patientName: null,
        patientData: {
          profile: {
            surname: '',
            lastname:'',
            adress:'',
            phone:'',
            city:'',
            email:'',
            gender:'',
            age:'',
            formation:'',
            job:'',
            payment:'',
            bank:''
          },
          encuadre: {
            antecedentes: '',
            historial:'',
            tratamientos:'',
            observaciones:''
          },
          items: [
            // { id: 1, date: '28-12-2022', name: 'sesión inicial', duration: '50m', anotaciones:'loren', tareas:'loren'},
            // { id: 2, date: '04-01-2023', name: 'sesión de encuadre', duration: '50m', anotaciones:'loren', tareas:'loren'},
            // { id: 3, date: '10-01-2023', name: 'sesión autoestima', duration: '50m', anotaciones:'loren', tareas:'loren'}
        ],
        },
        headers: [
          { text: '', value: 'data-table-expand' },
          { text: 'Nombre Sesión', value: 'name', align: 'center', sortable: true},
          { text: 'Fecha', value: 'date', align: 'left', sortable: true},
          { text: 'Duración', value: 'duration', align: 'center', sortable: true},
          { text: 'Borrar', value: 'actions', align: 'center', sortable: false, length: "40px"}
        ]
      }
    },
    computed:{
      ...mapGetters(["getUser"])
    },
    methods: {
      ...mapActions(["deletePat","setOverlay"]), 
      getPatient(){
        this.setOverlay(true)
        const patientInfo = db.collection("usuariosProfesionales").doc(this.getUser.email)
        patientInfo.get()
          .then( async(doc) => {
            const patients = await doc.data().patients
            const patient = await patients.filter( p => p.id = this.patientId)            
            this.patientName = patient[0].name
            if (patient[0].patientData !== null) {
              this.patientData = patient[0].patientData
            }
          })
          .finally(()=> this.setOverlay(false))
      },
      savePatientData(){
        const patientUpdate = db.collection("usuariosProfesionales").doc(this.getUser.email)
        patientUpdate.get()
        .then((doc) => {
          const patients = doc.data().patients
          const patient = patients.filter( p => p.id = this.patientId)
          patient[0].patientData = this.patientData
          for (let p of patients) {
            if (p.id === this.patientId) 
              p = patient[0]                    
          }
          patientUpdate.update({
            patients: patients
          })
        })        
      },
      async deletePatient(){
        const confirm = await this.$refs.confirmDialog.open()           
          if(!confirm){
              return    
          } else { 
            this.setOverlay(true)
            db.collection("usuariosProfesionales").doc(this.getUser.email).get()
            .then( doc => {
              const patients = doc.data().patients
              const newPatients = patients.filter( p => !(p.id = this.patientId))
              const updatePatients = db.collection("usuariosProfesionales").doc(this.getUser.email)
                updatePatients.update({
                  patients: newPatients
                })
            })
            .then(() => {
              const deletePro = db.collection("usuariosGenericos").doc(this.patientId)
              deletePro.update({
                pros: FieldValue.arrayRemove(this.getUser.email)
              })  
            })
            .then(()=> {              
              this.deletePat(this.patientId)
              this.$store.dispatch(OPEN_SNACKBAR, {
                text: "Paciente borrado correctamente",
                color: 'success',
                y: 'bottom',
                x: 'right',
                timeout: 4000
              })
              this.$router.push('/private')
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
            .finally(()=> this.setOverlay(false)) 
          }
      },
      newSesion(){
        this.openNewSession=true
      },
      createSession(sessionData){
        this.patientData.items.push(sessionData)
        this.savePatientData()

      },
      async deleteSession(item) {
        const confirm = await this.$refs.confirmDialog.open()           
            if(!confirm){
              return    
            }
            else {
              this.patientData.items = this.patientData.items.filter( i => !(i === item))
              this.savePatientData()
            }
        
      }
    },

    mounted(){
      this.getPatient()
    }
  }
  </script>
  
  <style>
  
  </style>