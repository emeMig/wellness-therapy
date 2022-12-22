<template>
  <div id="actaOrdenes" class="relief">
    <busqueda></busqueda>
    <tabla-modelo
      :headers="headers"
      :items="getDatos"
      orden-trabajo
      @openOrden="openOrdenes"
      show-orden
      @createItem="createItem"
      @updateItem="updateItem"
      @deleteItem="deleteItem"
    ></tabla-modelo>
    <ordenes-dialog
      :item="itemOpenDialog"
      @closeDialog="closeOrdenes"
    ></ordenes-dialog>
    <confirm-dialog
      ref="confirmDialog"
      :title="confirmDialogTitle"
      :message="confirmDialogMessage"
    />
  </div>
</template>

<script>
import OrdenesDialog from "@/components/Acta/OrdenesDialog";
import TablaModelo from "@/components/Modelos/TablaModelo";
import Busqueda from '@/components/Modelos/BusquedaModelo';
import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'

export default {
  name: 'actaOrdenes',
  components: {Busqueda, TablaModelo, ConfirmDialog, OrdenesDialog},
  props: {
    datos: {type:Array},
    openOrden: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      itemOpenDialog: {},
      headers: [
        { text:  this.$t('Global.WorkOrders.estado'), value: 'estado' },
        { text: this.$t('Global.WorkOrders.tipo'), value: 'serie' },
        { text: this.$t('Global.WorkOrders.fecha'), value: 'fecha' },
        { text: this.$t('Global.WorkOrders.situacion'), value: 'situacion' },
        { text: this.$t('Global.WorkOrders.descripcion'), value: 'descripcion' },
        { text: this.$t('Global.WorkOrders.personalGestor'), value: 'personal' },
        { text: this.$t('Global.Clients.cliente'), value: 'cliente' },
        { text: this.$t('Global.Actions.acciones'), value: 'actions' }
      ],
      confirmDialogTitle: "",
      confirmDialogMessage: null
    }
  },
  computed:{
    getDatos(){
      let data = []
      if(this.datos.length !== 0){
        data = this.datos
      }
      return data
    }
  },
  methods: {
    openOrdenes (item) {
      item.open = true
      item.edit = false
      this.itemOpenDialog = item
    },
    closeOrdenes () {
      this.itemOpenDialog = {open: false, edit: false}
    },
    async createItem(item){
      this.confirmDialogTitle = this.$t('Global.WorkOrders.guardarOrden')
      this.confirmDialogMessage = this.$t('Global.WorkOrders.confirmacionGuardarOrden')
      const confirm = await this.$refs.confirmDialog.open()
      if (confirm) {
        item.id = this.datos.length + 1
        this.datos.push(item)
      }
    },
    async updateItem(item){
      this.confirmDialogTitle = this.$t('Global.WorkOrders.actualizarOrden')
      this.confirmDialogMessage = this.$t('Global.WorkOrders.confirmacionActualizarOrden')
      const confirm = await this.$refs.confirmDialog.open()
      if (confirm) {
        this.datos.splice(item.id - 1, 1, item)
      }
    },
    async deleteItem(item){
      this.confirmDialogTitle = this.$t('Global.WorkOrders.eliminarOrden')
      this.confirmDialogMessage = this.$t('Global.WorkOrders.confirmacionEliminarOrden')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm) return
      this.datos.splice(this.datos.indexOf(item), 1)
      for (let i = item.id - 1; i < this.datos.length; i++) {
        this.datos[i].id = i + 1
      }
    }
  },
  mounted() {
    if (this.openOrden !== null) {
      this.openOrdenes(this.openOrden)
    }
  }

}
</script>

<style>

</style>
