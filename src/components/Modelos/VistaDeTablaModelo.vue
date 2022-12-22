<template>
  <div>
    <titulo titulo="Título de tabla"/>
    <busqueda />
    <v-btn class="ml-3" @click="confirmAction">test confirmation</v-btn>
    <tabla-modelo
      :headers="headers"
      :items="items"
    ></tabla-modelo>
    <confirm-dialog
      ref="confirmDialog"
      :title="confirmDialogTitle"
      :message="confirmDialogMessage"
    />
  </div>
</template>

<script>
import TablaModelo from '@/components/Modelos/TablaModelo.vue';
import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'
import Titulo from "@/components/Modelos/TituloModelo";
import Busqueda from "@/components/Modelos/BusquedaModelo";
export default {
  name: "GestionClientes",
  components: {
    TablaModelo,
    Titulo,
    Busqueda,
    ConfirmDialog
  },
  data() {
    return {
      headers: [],
      items: [],
      confirmDialogTitle: "",
      confirmDialogMessage: null,
    }
  },
  methods: {
    async confirmAction(){
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm) return
      // aqui insertamos acción confirmada
    }
  }

}
</script>
