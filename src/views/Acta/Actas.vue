<template>
  <div>
    <titulo :titulo="$t('Global.Acts.titulo')" :pliego-id="getPliegoId"/>
    <busqueda id="busqueda"/>
    <tabla-modelo
      :headers="headers"
      :items="getItems"
      item-key="codigo"
      :custom-action2="customAction2"
      show-ordenes
      show-acta-view
      @openActaView="openActaToRead"
      @openActaEdit="openActa"
      @custom-action2="openNewActa"
    ></tabla-modelo>
  </div>
</template>

<script>
import TablaModelo from '@/components/Modelos/TablaModelo.vue';
import json from '@/utils/data/actas-sample.json';
import Titulo from "@/components/Modelos/TituloModelo";
import Busqueda from "@/components/Modelos/BusquedaModelo";
export default {
  name: "GestionActas",
  components: {
    TablaModelo,
    Titulo,
    Busqueda
  },
  data() {
    return {
      headers: [
        { text: '', value: 'data-table-expand' },
        { text: this.$t('Global.Acts.codigo'), value: 'codigo', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Acts.fechaRecepcion'), value: 'fechaRecepcion', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Acts.usuario'), value: 'usuario', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Acts.referencia'), value: 'referencia', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Clients.cliente'), value: 'cliente.nombreCompleto', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Manufacturers.fabricante'), value: 'fabricante.nombreCompleto', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Contest.concurso'), value: 'concurso.codigo', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Sheets.pliego'), value: 'pliego.codigo', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Acts.lote'), value: 'lote', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Acts.cantidadLote'), value: 'cantidad', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Acts.tipo'), value: 'tipo', align: 'left', sortable: true, rules: [] },
        { text: this.$t('Global.Actions.acciones'), value: 'actions', align: 'center', sortable: false, width: "130px" }
      ],
      customAction2 : {active: true, icon: 'mdi-eye', description:  this.$t('Global.Actions.ver') }
    }
  },
  computed:{
    getItems() {
      let items = json
      if(Object.keys(this.$route.params).length !== 0){
        items= this.$route.params.items.actas
      }
      return items
    },
    getPliegoId() {
      let pliegoId = ''
      if(Object.keys(this.$route.params).length !== 0){
        pliegoId = this.$route.params.items.nombre
      }
      return pliegoId
    }
  },
  methods:{
    openActaToRead(item) {
      this.$router.push({name: 'acta', params: { readOnly: true, items: item}})
    },
    openActa(item) {
      this.$router.push({name: 'acta', params: { readOnly: false,items: item}})
    },
    openNewActa() {
      this.$router.push({name: 'acta', params: { readOnly: false}})
    }
  }
}
</script>

<style>

</style>
