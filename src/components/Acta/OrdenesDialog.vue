<template>
  <div id="ordenesDialog" class="text-center">
    <v-dialog
      v-model="dialog"
      @click:outside="closeDialog"
      max-width="1366"
    >

      <v-card flat class="relief">
        <v-card-title>
          <titulo-modelo :titulo="$t('Global.WorkOrders.titleDialog')"></titulo-modelo>
        </v-card-title>

        <v-card-text>
          <tabla-modelo
            :headers="headers"
            :items="items"
            item-key="codigo"
            new-ensayo
            @dialogEnsayo="openDialogAlta"
            @deleteItem="deleteItem"
            orden-trabajo
            hide-edit
            edit-resultado
          ></tabla-modelo>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
          color="primary"
          text
          @click="closeDialog"
          >
            {{ $t('Global.Actions.cancelar') }}
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            text
            @click="closeDialog"
          >
            {{ $t('Global.Actions.validar') }}
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="closeDialog"
          >
            {{ $t('Global.Actions.dictaminar') }}
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="printReport"
          >
            {{ $t('Global.Actions.imprimirInforme') }}
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="printLabel"
          >
            {{ $t('Global.Actions.imprimirEtiqueta') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <ensayos-dialog :item="item" :dialog.sync="dialogAlta" @selectedEnsayos="closeEnsayos" @closeDialog="closeEnsayosWithoutSaving"></ensayos-dialog>
    <confirm-dialog
      ref="confirmDialog"
      :title="confirmDialogTitle"
      :message="confirmDialogMessage"
    />
  </div>
</template>

<script>
import EnsayosDialog from "@/components/Acta/ensayosDialog";
import TablaModelo from "@/components/Modelos/TablaModelo";
import TituloModelo from "@/components/Modelos/TituloModelo";
import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'
import { OPEN_SNACKBAR } from "@/store/actions/snackbar";
export default {
  components: {TituloModelo, EnsayosDialog, TablaModelo , ConfirmDialog },
  props: {
    item: Object
  },
  data () {
    return {
      dialog: false,
      dialogAlta: false,
      headers: [
        { text: this.$t('Global.Test.codigo'), value: 'codigo' },
        { text: this.$t('Global.Test.estado'), value: 'estado' },
        { text: this.$t('Global.Test.ensayo'), value: 'nombre' },
        { text: this.$t('Global.Test.resultado'), value: 'resultado' },
        { text: this.$t('Global.Actions.acciones'), value: 'actions', align: 'center' }
      ],
      items: [
        {'codigo': '001', 'nombre': 'Ensayo 1', 'resultado': 'Resultado 1', 'estado':'completo'},
        {'codigo': '002', 'nombre': 'Ensayo 2', 'resultado': 'Resultado 2', 'estado':'completo'},
        {'codigo': '003', 'nombre': 'Ensayo 3', 'resultado': 'Resultado 3', 'estado':'incompleto'},
        {'codigo': '004', 'nombre': 'Ensayo 4', 'resultado': 'Resultado 4', 'estado':'incompleto'},
      ],
      confirmDialogTitle: "",
      confirmDialogMessage: null
    }
  },
  watch: {
    'item': function (item) {
      this.item = item
      this.dialog = item.open
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$emit('closeDialog')
    },
    closeEnsayos (items) {
      items.forEach((item) => {
        item.id = this.items.length + 1
        this.items.push(item)
      })
    },
    closeEnsayosWithoutSaving () {
      this.dialogAlta = false
    },
    openDialogAlta () {
      this.dialogAlta = true
    },
    async deleteItem(item){
      this.confirmDialogTitle = this.$t('Global.Test.eliminarEnsayo')
      this.confirmDialogMessage = this.$t('Global.Test.confirmacionEliminarEnsayo')
      const confirm = await this.$refs.confirmDialog.open()
      if(!confirm) return
      this.items.splice(this.items.indexOf(item), 1)
      for (let i = item.id - 1; i < this.items.length; i++) {
        this.items[i].id = i + 1
      }
    },
    async printReport() {
      this.confirmDialogTitle = this.$t('Global.ConfirmDialog.printReportTitle')
      this.confirmDialogMessage = this.$t('Global.ConfirmDialog.printReportMessage')
      const confirm = await this.$refs.confirmDialog.open()
      if (confirm) {
        // Mostrar snackbar para alertar al usuario de que se va a imprimri el informe
        this.$store.dispatch(OPEN_SNACKBAR, {
          text: this.$t('Global.ConfirmDialog.printReportSuccess'),
          color: 'success',
          y: 'top',
          x: 'right',
          icon: "mdi-printer",
          timeout: 4000
        })
      }
    },
    async printLabel() {
      this.confirmDialogTitle = this.$t('Global.ConfirmDialog.printLabelTitle')
      this.confirmDialogMessage = this.$t('Global.ConfirmDialog.printLabelMessage')
      const confirm = await this.$refs.confirmDialog.open()
      if (confirm) {
        // Mostrar snackbar para alertar al usuario de que se va a imprimri el informe
        this.$store.dispatch(OPEN_SNACKBAR, {
          text: this.$t('Global.ConfirmDialog.printLabelSuccess'),
          color: 'success',
          y: 'top',
          x: 'right',
          icon: "mdi-printer",
          timeout: 4000
        })
      }
    }
  }
}
</script>
