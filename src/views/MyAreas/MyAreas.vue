<template>
  <v-container fluid>
    <v-row class="pt-4">
      <v-col cols="12" class="d-flex justify-space-between">
        <titulo titulo="Mis Contenidos Privados"/>
        <v-spacer></v-spacer>

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
        <content-card-user 
          :publication="publication" 
          :index="index" 
          @open-valoration="openValoration"
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
    <valoration-dialog 
      v-if="openValorationDialog"
      :activate="openValorationDialog"
      :pro="proId"
      :proName="proName"
      @close-dialog="openValorationDialog=false"
    />

  </v-container>
</template>

<script>

import { db } from '@/firebase'
import { mapGetters, mapActions } from 'vuex'
import {OPEN_SNACKBAR} from "@/store/actions/snackbar"
import Titulo from "@/components/Modelos/TituloModelo";
import ContentDialog from "@/components/UI/Dialogs/ContentDialog.vue"
import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'
import ValorationDialog from '@/components/UI/Dialogs/ValorationDialog.vue'
import ContentCardUser from '@/views/MyAreas/ContentCardUser.vue'

export default {
  name: "MyAreas",
  components: {
    Titulo,
    ContentCardUser,
    ContentDialog,
    ConfirmDialog,
    ValorationDialog
  },
  data() {
    return {
      openContentDialog: false,
      allPublications: [],
      expansion: false,
      openValorationDialog: false,
      proId: '',
      proName:''
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
    ...mapActions(["setOverlay"]),
    getPublications() {  
      this.setOverlay(true)
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
        .finally(()=> this.setOverlay(false))
      }            
    },
    openValoration(pro) {
      this.proId = pro.id
      this.proName = pro.name
      this.openValorationDialog = true
    }
  },
  mounted() {    
    this.getPublications()
  }


}
</script>

<style>

</style>