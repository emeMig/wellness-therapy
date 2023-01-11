<template>
  <div>
    <titulo titulo="Búsqueda de especialistas"/>
    <busqueda id="busqueda" 
      @emit-search="executeSearch"
    />

    <resultados
      :headers="headers"
      :items= "filteredItems"
      @lauch-message="activateMessage=true"
    />

    <confirm-dialog
      ref="confirmDialog"
      :title="confirmDialogTitle"
      :message="confirmDialogMessage"
    />

  </div>
</template>

<script>

import { db } from "../../firebase"
import { mapActions } from "vuex"
import Titulo from "@/components/Modelos/TituloModelo"
import Busqueda from "@/components/Modelos/BusquedaModelo"
import Resultados from "./Resultados.vue"
import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'
import TableNames from '@/config/table-names'

export default {
  name: "GestionConcursos",
  components: {
    Titulo,
    ConfirmDialog,
    Busqueda,
    Resultados
  },
  data() {
    return {
      headers: [
                { text: '', value: 'data-table-expand' },
                { text: 'Nombre', value: 'surname', align: 'left', sortable: true, },
                { text: 'Apellidos', value: 'lastname', align: 'left', sortable: true },
                { text: 'Especialidad', value: 'speciality', align: 'left', sortable: true },
                { text: 'Ciudad', value: 'city', align: 'left', sortable: true },
                { text: 'Valoración', value: 'patients', align: 'left', sortable: true }
            ],
      
      confirmDialogTitle: "",
      confirmDialogMessage: null,
      filteredItems: [],
      customAction1 : {active: true, icon: 'mdi-lock', description: this.$t('Global.Actions.cerrar')},
      customAction2 : {active: true, icon: 'mdi-note-multiple-outline', description:  this.$t('Global.Sheets.tituloDialogo') },
      overlay: false,
      itemTable: TableNames.CONTEST,
      itemId: "idConcurso",
      estadosConcurso: [],
      options :{
        sorting: {
          ascending: false,
          column: "fecCreacion"
        },
        pagination:{
          pageSize: 10,
          page: 1
        },
        textFilter: {
          text: ""
        }
      },
      totalItems: 0
    }
  },

  methods: { 
    ...mapActions(["setOverlay"]), 
    async executeSearch(search){
      this.setOverlay(true)
      this.filteredItems = []
      const results = await this.filterSearch(search)
      for (let result of results) {
        for (let value in result) {
          if (typeof (result[value]) === 'string' && result[value].toLowerCase().includes(search.term.toLowerCase())) {
            if (!this.filteredItems.includes(result)) this.filteredItems.push(result)
          }
        }
      }
      this.setOverlay(false)
    },
    async filterSearch(search) {
      let results = []
      for (let filter of search.filters) {
        const resultado = await db.collection("usuariosProfesionales").where("speciality", "==", filter)
        .get()
        resultado.forEach((doc) => {
          const result = doc.data()
          result.id = doc.id
          results.push(result)
        })

      }
      return results
    }   
  }
  
}
</script>

<style>

</style>
