<template>
  <div>
    <v-dialog v-model="activate" max-width="1200px" persistent>
      <v-card color="background">
        <v-toolbar style="background-color: transparent; padding-right: 24px; padding-left: 24px" class="elevation-0">
          <v-toolbar-title><h3 class="primary--text" >{{ formTitle }}</h3></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" @click="closeDialog"><v-icon>mdi-close-circle</v-icon></v-btn>
        </v-toolbar>
        <v-card-text class="mx-0">
          <v-container class="mx-0" fluid>
            <v-form ref="modelForm">
              <v-sheet class="relief px-6">
                <product-tree
                  :pliego="pliego"
                />
              </v-sheet>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">{{ $t('Global.Actions.cancelar')  }}</v-btn>
          <v-btn color="blue darken-1" text @click="submitItem" :disabled="!validForm">{{ $t('Global.Actions.guardar')  }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <confirm-dialog
      ref="confirmDialog"
      :title="confirmDialogTitle"
      :message="confirmDialogMessage"
    />
  </div>
</template>


<script>



import ProductTree from "@/components/UI/Custom/ProductTree";
import ConfirmDialog from "@/components/UI/Dialogs/ConfirmDialog";

export default {
  name: "ProductTreeDialog",
  components: {
    ProductTree,
    ConfirmDialog
  },
  props: {
    formTitle: {
      type: String,
      default: () => "Elemento"
    },
    activate: {
      type: Boolean,
      default: () => false
    },
    products: {
      type: Array,
      default:() => []
    },
    pliego: {
      type: Object,
      default:() => {}
    }
  },
  data() {
    return {
      validForm: false,
      confirmDialogTitle:"",
      confirmDialogMessage:"",
      editedItem: {}
    }
  },
  methods: {
    validate() {
      this.validForm = this.$refs.modelForm.validate()
    },
    submitItem() {
      this.activate=false
    },
    async closeDialog() {
      if(this.validForm){
        this.confirmDialogTitle = this.$t('Global.Sheets.cerrarFormularioProducto')
        this.confirmDialogMessage = this.$t('Global.Sheets.confirmacionCerrarFormularioProducto')
        const confirm = await this.$refs.confirmDialog.open()
        if(!confirm) return
        this.$emit('close-dialog')
      }else{
        this.$emit('close-dialog')
      }
    },
  },
  mounted(){
    //hacemos la llamada para obtener los productos de ese pliego

    //guardamos los productos en un item auxiliar
  }
}
</script>

<style>

</style>
