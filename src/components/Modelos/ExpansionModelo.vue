<template>
  <div>
    <v-row class="ma-0 pa-0">
      <v-col v-for="(item, index) in editedHeaders" :key="index" class="ma-0 pa-0 pt-2" cols="6">
        <v-list-item class="ma-0 py-0 px-2" two-line>
          <v-list-item-content>
            <v-list-item-title class="mt-n3"><p class="font-weight-bold">{{ item.text }}</p></v-list-item-title>
            <v-list-item-subtitle class="mt-n3">
              <v-chip class="px-1" v-if="item.value === 'idEstadoPliego'" :color="getColor(editedItem[item.value])" dark small>
                  <h3><small>{{ getEstado(editedItem[item.value]) }}</small></h3>
              </v-chip>
              <span v-else-if="item.value === 'fecRecepcion'">{{ editedItem[item.value].split('T')[0].split('-').reverse().join('/') }} </span>
              <span v-else>{{ editedItem[item.value] }} </span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="12" sm="6" class="ma-0 pa-0 pt-2" v-if="isSheet">
        <v-list-item class="ma-0 px-2 py-0">
          <v-list-item-content>
            <v-list-item-title class="mt-n3"><p class="font-weight-bold">{{ $t('Global.Sheets.observaciones')  }}</p></v-list-item-title>
            <v-list-item-subtitle class="mt-n3">
              <span>{{ item.observaciones }} </span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="12" sm="6" class="ma-0 pa-0 pt-2"  v-if="isSheet">
        <v-list-item class="ma-0 px-2 py-0">
          <v-list-item-content>
            <v-list-item-title class="mt-n3"><p class="font-weight-bold">{{ $t('Global.Sheets.documentoPliego')  }}</p></v-list-item-title>
            <v-list-item-subtitle class="mt-n3">
              <a>{{ item.documento }} </a>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="12" sm="6" class="ma-0 pa-0 pt-2" v-if="isSheet">
        <v-list-item class="ma-0 px-2 py-0">
            <v-list-item-content>
              <v-list-item-title class="mt-n3"><p class="font-weight-bold">{{ $t('Global.Sheets.concesiones')  }}</p></v-list-item-title>
              <v-list-item-subtitle class="mt-n3" v-for="(concesion, index) in item.concesiones" :key="index">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle><a>{{ concesion.nombre }} </a></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
      </v-col>
      <v-col class="px-2" cols="12" v-if="isSheet">
        <h4>{{ $t('Global.Sheets.productos')  }}</h4>
          <ProductTree 
            :isEditable="editable"
          />
      </v-col>
    </v-row >
  </div>
</template>

<script>
import ProductTree from "../UI/Custom/ProductTree.vue"

export default {
  name: "ExpansionModelo",
  components: {
    ProductTree
  },
  props: {
    item: {
      Type: Object,
      default: () => {
      }
    },
    headers: {
      Type: Array,
      default: () => []
    },
    isSheet: {
      Type: Boolean,
      default: () => false
    },
    estados:{
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      editable: false,
      concesionesHeaders: [
        {text: this.$t('Global.Materials.nombre'), value: 'nombre', align: 'left', sortable: true, rules: []},
        { text: this.$t('Global.Actions.acciones'), value: 'actions', align: 'center', sortable: false, width: "130px" },
      ],
      customAction2 : {active: true, icon: 'mdi-download', description: 'descargar'},
    }
  },
  computed: {
    editedHeaders(){
      return this.headers.filter(e => e.value !== 'actions' && e.value !== 'data-table-expand')
    },
    editedItem(){
      let newItemAux= {}
      for (const element of this.headers) {
        if (element.value !== 'actions' && element.value !== 'data-table-expand' && !element.value.includes('.'))
          newItemAux[element.value] = this.item[element.value]
        else if(element.value !== 'actions' && element.value !== 'data-table-expand' && element.value.includes('.'))
          newItemAux[(element.value).split('.')[1]] = this.item[(element.value).split('.')[0]]
      }
      if(newItemAux.numExpediente){
        delete newItemAux['numExpediente']
        newItemAux['concurso.numExpediente'] = this.item.concurso.numExpediente
      }
      if(newItemAux.cliente){
        newItemAux.cliente = newItemAux.cliente.nombreCompleto
      }
      if(newItemAux.concurso){
        newItemAux.concurso = newItemAux.concurso.numeroExpediente
      }
      if(newItemAux.pliego){
        newItemAux.pliego = newItemAux.pliego.codigo
      }
      return newItemAux
    }
  },
  methods:{
    getColor( status ) {
      if ( status.toString() === this.$t('Global.Contest.estadoUso')) return 'success'
      else if (status.toString() === this.$t('Global.Contest.estadoProceso')) return 'primary'
      else return 'warning'
    },
    getEstado( status ) {
        const identificador = this.estados.map(e => e.idEstadoPliego).indexOf(status)
        if(identificador !== -1) return this.estados[identificador].identificador
    },
  }
}
</script>
<style>
</style>
