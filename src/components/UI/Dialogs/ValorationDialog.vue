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
              <v-icon color="primary" size="32" left>mdi-star</v-icon>
              <span class="primary--text">Valorar Profesionales</span>
            </v-toolbar-title>
          </v-toolbar>
          <!-- Contenido -->
          <v-card-text>
            <v-list class="relief-inset mt-3 pa-0">
              <v-list-item
                class="d-flex justify-space-between px-3 mb-3"
              >
                <h4>{{ proName }} / {{ pro }}</h4>
                <star-rating 
                  class="mt-1"
                  :rating="proValoration"
                  :increment=1
                  :star-size=17
                  active-color="#FFA726"
                  :show-rating=false
                  :padding=0.5  
                  @rating-selected="setRating"             
                ></star-rating>
              </v-list-item>
            </v-list>
          </v-card-text>
          <!-- Acciones -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="emitValoration">Valorar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <confirm-dialog 
        ref="confirmDialog"
        message="¿Desea guardar valoraciones?"
      />

    </div>
  </template>
  
<script>
import { db } from '@/firebase'
import { mapGetters } from 'vuex'
import {OPEN_SNACKBAR} from "@/store/actions/snackbar"
import StarRating from 'vue-star-rating'
import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'

export default {
    name: "ValorationDialog",
    components: {
        ConfirmDialog,
        StarRating
    },
    props: {
      activate: { 
        type: Boolean
      },
      pro: {
        type: String
      },
      proName: {
        type: String
      }
    },
    data() {
      return {
        ratingSet: 0,
        proValoration: 5
      }
    },
    computed: {
      ...mapGetters(["getUser","getPros"])
    },
    methods:{
        getProValoration() {
          const checkValoration = db.collection("usuariosProfesionales").doc(this.pro)
          checkValoration.get()
            .then((doc)=> {
              const patients = doc.data().patients
              const patient = patients.filter( p => p.id = this.getUser.email)
              this.proValoration = patient[0].valoration              
            })
        },
        setRating(rating){
          this.ratingSet = rating
        },
        closeDialog() {
          this.$emit('close-dialog')
        },
        emitValoration(){
            const setNewValoration = db.collection("usuariosProfesionales").doc(this.pro)
            setNewValoration.get()
              .then((doc) => {
                const patients = doc.data().patients
                const patient = patients.filter( p => p.id = this.getUser.email)
                patient[0].valoration = this.ratingSet
                for (let p of patients) {
                  if (p.id === this.getUser.email) 
                    p = patient[0]                    
                }
                setNewValoration.update({
                  patients: patients
                })
                .then (()=> {
                  this.$store.dispatch(OPEN_SNACKBAR, {
                    text: "Valoracion añadida",
                    color: 'success',
                    y: 'bottom',
                    x: 'right',
                    icon: "mdi-alert-octagon-outline",
                    timeout: 1000
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
              .finally(()=> this.closeDialog())


              })
        }
    },
    mounted() {
      this.getProValoration()
    }
    
}
</script>

<style>

</style>