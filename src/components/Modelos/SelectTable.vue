<template>
    <v-card class="px-5 py-3 relief">
      <titulo :titulo="title" :subtitle="subtitle"/>
      <busqueda id="busqueda"></busqueda>
      <v-card-text class="px-0">
        <v-container fluid class="fill-width py-1">
          <v-form ref="modelForm">
            <v-sheet class="relief with-radius">
              <v-data-table
            v-model="selected"
            :headers="headers"
            :items="items"
            :single-select="singleSelect"
            :item-key="itemKey"
            show-select
            :items-per-page="5"
            @input="validate"
            class="elevation-1 crud-table expanded-crud-table px-6 relief"
          >
          </v-data-table>
            </v-sheet>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions v-if="!hideActions">
        <v-btn color="blue darken-1" text @click="funcionBotonIzquierdo">{{ leftBtnTxt }}</v-btn>
        <v-btn color="blue darken-1" text @click="guardarResultado" :disabled="!validForm">{{ rightBtnTxt }}</v-btn>
      </v-card-actions>
    </v-card>
</template>
<script>
import Busqueda from "@/components/Modelos/BusquedaModelo"
import Titulo from "@/components/Modelos/TituloModelo";
export default {
  name: "SelectTable",
  components:{
    Titulo,
    Busqueda
  },
  props: {
    title: String,
    leftBtnTxt: String,
    rightBtnTxt: String,
    leftBtnEvent: Function,
    rightBtnEvent: Function,
    headers: Array,
    items:Array,
    dialog: Boolean,
    singleSelect: Boolean,
    itemKey: String,
    subtitle: {
      type: String,
      default: () => null
    },
    hideActions: {
      type: Boolean,
      default: () => false
    }
  },
  data(){
    return {
      selected: [],
      validForm: false,
    }
  },
  methods:{
    validate() {
      if(this.selected.length >0){
        this.validForm = true
      }else{
        this.validForm=false
      }
    },
    funcionBotonIzquierdo(){
      this.leftBtnEvent()
      this.selected=[]
    },
    guardarResultado(){
      this.rightBtnEvent(this.selected)
      this.selected=[]
    }
  }
}
</script>
