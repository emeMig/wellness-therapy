<template>
  <div id="resultados">
    <titulo :titulo="$t('Global.Results.titulo')"/>
    <busqueda></busqueda>
    <tabla-modelo
      :headers="headers"
      :items="items"
      orden-trabajo
      @openOrden="openOrdenes"
      item-key="serie"
      sort-by="serie"
      show-orden
      hide-edit
      hide-button
      hide-delete
    ></tabla-modelo>
  </div>
</template>

<script>
import json from "@/utils/data/ordenes-sample.json";
import Busqueda from "@/components/Modelos/BusquedaModelo";
import TablaModelo from "@/components/Modelos/TablaModelo";
import Titulo from "@/components/Modelos/TituloModelo";

export default {
  name: 'resultados',
  components: {Busqueda, Titulo,TablaModelo},
  data () {
    return {
      headers: [
        { text: this.$t('Global.Acts.acta'), value: 'serie' },
        { text: this.$t('Global.WorkOrders.estado'), value: 'estado', align: 'left' },
        { text: this.$t('Global.WorkOrders.fecha'), value: 'fecha' },
        { text: this.$t('Global.WorkOrders.situacion'), value: 'situacion' },
        { text: this.$t('Global.WorkOrders.descripcion'), value: 'descripcion' },
        { text: this.$t('Global.WorkOrders.personalGestor'), value: 'personal' },
        { text: this.$t('Global.Clients.cliente'), value: 'cliente' },
        { text: this.$t('Global.Actions.acciones'), value: 'actions' }
      ],
      confirmDialogTitle: "",
      confirmDialogMessage: null,
      items: json.filter(i => i.estado === 'incompleto')
    }
  },
  methods: {
    openOrdenes (item) {
      this.$router.push({name: 'acta', params: {items: item.acta, tabIndex: 'tabOrdenesDeTrabajo', itemOpenDialog: item}})
    }
  }
}
</script>

<style>

</style>
