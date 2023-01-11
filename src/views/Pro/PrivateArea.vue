<template>
  <v-container fluid>
    <v-row class="pt-4">
      <v-col cols="12" class="d-flex justify-space-between">
        <titulo titulo="Área Privada de Contenidos"/>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mt-3 mx-8 justify-end" @click="addContenido">
          <span class="ma-2">Publicación</span>
          <v-icon dense>mdi-plus-thick</v-icon>
        </v-btn>
      </v-col>    
    </v-row>

    <v-row v-if="!publications || publications.length === 0" class="mt-4 d-flex justify-center">
      <h4 class="pt-16 font-weight-regular">Aún no hay publicaciones</h4>
    </v-row>
    <v-row v-else class="mt-0">
      <v-col 
        v-for="(publication,index) in orderedPublications" 
        :key = "index"
        :cols="publication.size === 'full' ? '12' : '6'"      
      >
        <content-card 
          :publication="publication" 
          :index="index" 
          @delete-publication="deletePublication"
        />
      </v-col>    
    </v-row>
    <content-dialog
      v-if="openContentDialog"
      :activate="openContentDialog"
      @close-dialog="openContentDialog=false"
      @add-publication="addPublication"
    >
    </content-dialog>
    <confirm-dialog 
            ref="confirmDialog"
            message="¿Desea borrar esta publicación?"
        />
  </v-container>
</template>

<script>

import { db, FieldValue } from '@/firebase'
import { mapGetters, mapActions } from 'vuex'
import {OPEN_SNACKBAR} from "@/store/actions/snackbar"
import Titulo from "@/components/Modelos/TituloModelo";
import ContentDialog from "@/components/UI/Dialogs/ContentDialog.vue"
import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'
import ContentCard from '@/views/Pro/ContentCard.vue'

export default {
  name: "AreaPrivada",
  components: {
    Titulo,
    ContentCard,
    ContentDialog,
    ConfirmDialog
  },
  data() {
    return {
      openContentDialog: false,
      publications: null,
      expansion: false
    }
  },
  computed: {
    ...mapGetters(["getUser"]),
    orderedPublications() {
        let orderedPublications = this.publications
        if (orderedPublications.length > 0) {
          return orderedPublications.sort((a,b) => b.date - a.date)
        } else 
          return []
      }
  },
  methods: {
    ...mapActions(["setOverlay"]), 
    getPublications() { 
      this.setOverlay(true)  
      db.collection("usuariosProfesionales").doc(this.getUser.email).get()
      .then( ( doc ) => {
        this.publications = doc.data().publications
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
      
    },
    addContenido() {
      this.openContentDialog = true
    },
    addPublication(publication) {
      console.log(publication)
      const updatePublication = db.collection("usuariosProfesionales").doc(this.getUser.email)
      updatePublication.update({
        publications: FieldValue.arrayUnion(publication)
      })
      .then (()=> this.getPublications() )
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
    },
    async deletePublication(publication) {
      console.log(publication);
      const confirm = await this.$refs.confirmDialog.open() 
        if(!confirm){
            return    
        }
        else {
          const deletePublication = db.collection("usuariosProfesionales").doc(this.getUser.email)
          deletePublication.update({
            publications: FieldValue.arrayRemove(publication)
          })
          .then (()=> {
            this.getPublications() })
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
        }
      }
  },
  mounted() {
    this.getPublications()
  }


}
</script>

<style>

</style>