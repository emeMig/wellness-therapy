<template>
  <v-container fluid>
    <v-row class="pt-4">
      <v-col cols="12" class="d-flex justify-space-between">
        <titulo titulo="Mis Contenidos Privados"/>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mt-3 mx-8 justify-end" @click="emitValorations">
          <span class="ma-2">Valorar</span>
          <v-icon dense>mdi-star</v-icon>
        </v-btn>
      </v-col>    
    </v-row>

    <v-row v-if="!allPublications || allPublications.length === 0" class="mt-4 d-flex justify-center">
      <h4 class="pt-16 font-weight-regular">No hay publicaciones</h4>
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

import { db } from '@/firebase'
import { mapGetters } from 'vuex'
import {OPEN_SNACKBAR} from "@/store/actions/snackbar"
import Titulo from "@/components/Modelos/TituloModelo";
import ContentDialog from "@/components/UI/Dialogs/ContentDialog.vue"
import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'
import ContentCard from '@/views/MyAreas/ContentCardUser.vue'

export default {
  name: "MyAreas",
  components: {
    Titulo,
    ContentCard,
    ContentDialog,
    ConfirmDialog
  },
  data() {
    return {
      openContentDialog: false,
      allPublications: [],
      expansion: false
    }
  },
  computed: {
    ...mapGetters(["getUser"]),
    orderedPublications() {
        let orderedPublications = this.allPublications
        if (orderedPublications.length > 0) {
          return orderedPublications.sort((a,b) => b.date - a.date)
        } else 
          return []
      }
  },
  methods: {
    getPublications() {  
      for(let pro of this.getUser.pros) {
        db.collection("usuariosProfesionales").doc(pro).get()
          .then( (doc) => {
            if (doc.exists) {
              const proPublications = doc.data().publications
              proPublications.forEach((publication) => publication.authorId = doc.id)
              proPublications.forEach((publication) => publication.authorName = doc.data().surname + ' ' + doc.data().lastname)
              this.allPublications = [ ...this.allPublications, ...proPublications]
            } else 
              console.log('doc no existe');
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
      }            
    },
    emitValorations() {
      console.log('emite valoracion');
    }
  },
  mounted() {    
    this.getPublications()
  }


}
</script>

<style>

</style>