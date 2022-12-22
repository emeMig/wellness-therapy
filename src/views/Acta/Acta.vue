<template>
  <v-container fluid class="fill-width" id="acta">
    <v-card class="relief with-radius">
      <v-tabs
        v-model="tab"
        class="relief"
      >
        <v-tab href="#tabDatosPrincipales">{{ $t('Global.Acts.datosPrin') }}</v-tab>
        <v-tab href="#tabOrdenesDeTrabajo">{{ $t('Global.Acts.ordenesTr') }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item
          value="tabDatosPrincipales"
        >
          <acta-formulario :datos="datos" :read-only="readOnly"></acta-formulario>
        </v-tab-item>
        <v-tab-item
          value="tabOrdenesDeTrabajo"
        >
          <acta-ordenes :openOrden="openOrden" :datos="getOrdenes"></acta-ordenes>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import ActaFormulario from '@/components/Acta/ActaFormulario'
import ActaOrdenes from "@/components/Acta/ActaOrdenes"

export default {
  name: 'acta',
  components: {ActaOrdenes, ActaFormulario},
  data () {
    return {
      tab: null,
      datos: {},
      openOrden: null,
      readOnly: false,
    }
  },
  computed:{
    getOrdenes(){
      let data = []
      if(Object.keys(this.$route.params).length !== 0 && Object.keys(this.$route.params).includes('items')){
        data= this.$route.params.items.ordenes
      }
      return data
    }
  },
  created() {
    if(Object.keys(this.$route.params).length !== 0){
      this.readOnly = this.$route.params.readOnly
      this.openOrden = this.$route.params.itemOpenDialog
      this.tab = this.$route.params.tabIndex
      if(Object.keys(this.$route.params).includes('items')){
        this.datos = this.$route.params.items
      }
    }
  },
  mounted() {
    if (this.$route.params.item !== undefined) {
      this.tab = "tabDatosPrincipales"
      this.openOrden = this.$route.params.item
    }
  }
}
</script>

<style>

</style>
