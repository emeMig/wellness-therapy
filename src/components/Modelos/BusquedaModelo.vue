<template>
  <v-container fluid class="fill-width py-2">
    <v-sheet class="relief with-radius">
      <v-card class="px-5 py-3 relief">
        <v-row id="especialidades" class="mt-1">
          <v-col cols="12" class="pb-1">
            <h5 class="primary--text ml-2 mb-2">ESPECIALIDADES</h5>
          </v-col>
          <v-row class="ml-1 pb-6">
            <v-switch            
              class="ml-4"
              inset
              v-model="filters"
              label="Psicoterpia"
              value="psicoterapia"
              color="warning"
              hide-details
            >   
            </v-switch>
            <v-switch
              class="ml-4"
              inset
              v-model="filters"
              label="Mindfulness"
              value="mindfulness"
              color="success"
              hide-details
            >   
            </v-switch>
            <v-switch
              class="ml-4"
              inset
              v-model="filters"
              label="Coaching"
              value="coaching"
              color="info"
              hide-details
            >   
          </v-switch> 
          </v-row>
        </v-row>
        <!-- <v-row id="ciudades">
          <v-col cols="12" class="pb-1">
            <h5 class="primary--text ml-2 mb-2"> CIUDADES</h5>
          </v-col>
          <v-row class="ml-1 pb-6">
            <v-switch            
              class="ml-4"
              inset
              v-model="filters"
              label="Madrid"
              value="madrid"
              color="red darken-3"
              hide-details
            >   
            </v-switch>
            <v-switch
              class="ml-4"
              inset
              v-model="filters"
              label="Barcelona"
              value="barcelona"
              color="red darken-3"
              hide-details
            >   
            </v-switch>  
          </v-row>
        </v-row> -->
        <v-row justify="center" align="center" class="pt-2">
          <v-col cols="9">
            <v-text-field
              hide-details
              :placeholder="$t('Global.Actions.buscar')"
              single-line
              prepend-inner-icon="mdi-magnify"
              rounded
              dense
              solo
              flat
              v-model="textSearch"
              @keydown.enter="emitirBusqueda"
            >
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-btn color="primary" dark rounded @click="emitirBusqueda"><v-icon>mdi-magnify</v-icon></v-btn>
          </v-col>
        </v-row>
        </v-card>
      </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: "BusquedaModelo",
  data() {
    return {
      textSearch: '',
      filters: ['psicoterapia', 'mindfulness', 'coaching']
    }
  },
  methods: {
    emitirBusqueda() {    
      const search = [...this.textSearch.trim().split(' '), ...this.filters]
      this.$emit('emit-search', search)
    }
  }
}
</script>

<style scoped>
</style>
