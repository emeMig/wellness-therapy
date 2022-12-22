<template>
    <v-container fluid class="fill-width py-2">
      <v-sheet class="relief with-radius">
        <v-card class="relief">
          <v-data-table
            :headers="headers"
            :items="items"
            :single-expand="true"
            :expanded.sync="expanded"
            :item-key="itemKey"
            :sort-by="optionsTable.sorting.column"
            :items-per-page="optionsTable.pagination.pageSize"
            :page="optionsTable.pagination.page"
            :group-desc="!optionsTable.sorting.ascending"
            :server-items-length="totalItems"
            :show-expand="!hideExpansion"
            class="crud-table expanded-crud-table px-6 relief"
            :show-select="showSelect"
            v-model="selectedItems"
            @item-selected="itemSelected"
            @update:options="getOptionsTable"
        >
          <template v-slot:top>
            <v-toolbar flat color="transparent" class="pt-2">
              <v-spacer/>
              <v-btn v-if="!hideButton && !newEnsayo" color="primary" dark class="mb-2" @click="newUser">
                <div class="ma-2">{{ $t('Global.Actions.nuevo') }}</div>
                <v-icon dense>mdi-plus-thick</v-icon>
              </v-btn>
              <v-btn v-else-if="!hideButton && addMaterial" color="primary" dark class="mb-2" @click="dialogMaterial">
                <div class="ma-2">{{ $t('Global.Actions.add') }}</div>
                <v-icon dense>mdi-plus-thick</v-icon>
              </v-btn>
              <v-btn v-else-if="!hideButton && newEnsayo" color="primary" dark class="mb-2" @click="dialogEnsayo">
                <div class="ma-2">{{ $t('Global.Actions.nuevo') }}</div>
                <v-icon dense>mdi-plus-thick</v-icon>
              </v-btn>
              <formulario-modelo
                  v-if="dialogActive"
                  :activate="dialogActive"
                  :item="editedItem"
                  :headers="headers"
                  :is-sheet="isSheet"
                  :form-title="formTitle1"
                  :is-contest="isContest"
                  @create-item="createItem"
                  @update-item="updateItem"
                  @close-dialog="dialogActive=false"
                  :estados-concurso="estadosConcurso"
                />
            </v-toolbar>
          </template>



          <template #[`item.idEstadoConcurso`]="{ item }">
            <v-chip
              :color="getColor(item)"
              dark
              small
              class="px-1"
            >
              <h3 class="px-1"><small>{{ getEstado(item)}}</small></h3>
            </v-chip>
          </template>

            <template #[`item.idEstadoPliego`]="{ item }">
              <v-chip
                :color="getColor(item)"
                dark
                small
                class="px-1"
              >
                <h3 class="px-1"><small>{{ getEstado(item)}}</small></h3>
              </v-chip>
            </template>

            <template #[`item.organismo`]="{ value }">
              <div class="text-truncate" style="max-width: 120px">
                <tooltip-table :value="value" :description="value"></tooltip-table>
              </div>
            </template>

            <template #[`item.direccion`]="{ value }">
              <div class="text-truncate" style="max-width: 90px">
                <tooltip-table :value="value" :description="value"></tooltip-table>
              </div>
            </template>

            <template #[`item.observaciones`]="{ value }">
              <div class="text-truncate" style="max-width: 90px">
                <tooltip-table :value="value" :description="value"></tooltip-table>
              </div>
            </template>

            <template #[`item.personaContacto1`]="{ value }">
              <div class="text-truncate" style="max-width: 80px">
                <tooltip-table :value="value" :description="value"></tooltip-table>
              </div>
            </template>

            <template #[`item.personaContacto2`]="{ value }">
              <div class="text-truncate" style="max-width: 80px">
                <tooltip-table :value="value" :description="value"></tooltip-table>
              </div>
            </template>

            <template #[`item.email1`]="{ value }">
              <div class="text-truncate" style="max-width: 80px">
                <tooltip-table :value="value" :description="value"></tooltip-table>
              </div>
            </template>

            <template #[`item.email2`]="{ value }">
              <div class="text-truncate" style="max-width: 80px">
                <tooltip-table :value="value" :description="value"></tooltip-table>
              </div>
            </template>

          <template #[`item.situacion`]="{ value }">
            <div class="text-truncate" style="max-width: 130px">
              <tooltip-table :value="value" :description="value"></tooltip-table>
            </div>
          </template>

          <template #[`item.descripcion`]="{ value }">
            <div class="text-truncate" style="max-width: 130px">
              <tooltip-table :value="value" :description="value"></tooltip-table>
            </div>
          </template>

          <template #[`item.personal`]="{ value }">
            <div class="text-truncate" style="max-width: 130px">
              <tooltip-table :value="value" :description="value"></tooltip-table>
            </div>
          </template>

          <template #[`item.nombre`]="{ value }">
            <div class="text-truncate" style="max-width: 150px">
              <tooltip-table :value="value" :description="value"></tooltip-table>
            </div>
          </template>

          <template #[`item.listaCondiciones`]="{ value }">
            <div class="text-truncate" style="max-width: 130px">
              <tooltip-table :value="value" :description="value"></tooltip-table>
            </div>
          </template>

          <template #[`item.norma`]="{ value }">
            <div class="text-truncate" style="max-width: 40px">
              <tooltip-table :value="value" :description="value"></tooltip-table>
            </div>
          </template>

          <template #[`item.producto`]="{ value }">
            <div class="text-truncate" style="max-width: 130px">
              <tooltip-table :value="value" :description="value"></tooltip-table>
            </div>
          </template>

          <template #[`item.cliente.organismo`]="{ value }">
            <div class="text-truncate" style="max-width: 80px">
              <tooltip-table :value="value" :description="value"></tooltip-table>
            </div>
          </template>

          <template #[`item.usuario`]="{ value }">
            <div class="text-truncate" style="max-width: 80px">
              <tooltip-table :bottom="true" :value="value" :description="value"></tooltip-table>
            </div>
          </template>

          <template #[`item.fecCreacion`]="{ item }">
            {{ (item.fecCreacion).split('T')[0] }}
          </template>

          <template #[`item.fecRecepcion`]="{ item }">
            {{ (item.fecRecepcion).split('T')[0] }}
          </template>


          <template v-if="!hideExpansion" #[`expanded-item`]="{ headers, item }">
            <td :colspan="headers.length" class="relief-inset">
              <expansion-modelo :item="item" :headers="headers" :is-sheet="isSheet" :estados="estadosConcurso"/>
            </td>
          </template>

          <template v-if="editResultado" #[`item.resultado`]="{ item }">
            <v-text-field
              v-model="item.resultado"
              :label="$t('Global.Test.resultado')"
              clearable
            >

            </v-text-field>
          </template>

          <template  #[`item.rol`]="{ item }">
            <tooltip-table :value="item.rol" :description="item.permisos"></tooltip-table>
          </template>

          <template v-if="!hideActions" #[`item.actions`]="{ item }">

            <tooltip-table v-if="showOrden" :left="true" :is-icon="true" :icon="'mdi-open-in-new'"
                           :description="$t('Global.Test.titulo')" :color="'primary'" :bottom="false"
                           :item="item" @custom-action="openOrden(item)">
            </tooltip-table>

            <tooltip-table v-if="!hideEdit" :left="true" :is-icon="true" :icon="'mdi-pencil'"
                           :description="$t('Global.Actions.editar')" :color="'primary'" :bottom="false"
                           :item="item" @custom-action="editItem(item)">
            </tooltip-table>

            <tooltip-table v-if="!hideDelete" :is-icon="true" :icon="'mdi-delete'"
                           :disabled="(Object.keys(item).includes('pliegos') && item.pliegos.length > 0)
                           || (Object.keys(item).includes('actas') && item.actas.length > 0)"
                           :description=" $t('Global.Actions.borrar')" :color="'primary'" :right="true" :bottom="false"
                           :item="item" @custom-action="deleteItem(item)">
            </tooltip-table>

            <tooltip-table v-if="customAction1.active" :is-icon="true" :icon="getItemIcon(item)"
                           :description="getItemDescription(item)" :color="'primary'"
                           :item="item" @custom-action="$emit('custom-action1',item)">
            </tooltip-table>

            <tooltip-table v-if="customAction2.active" :is-icon="true" :icon="customAction2.icon"
                           :description="customAction2.description" :color="'primary'"
                           :item="item" @custom-action="$emit('custom-action2',item)">
            </tooltip-table>

            <tooltip-table v-if="customAction3.active" :is-icon="true" :icon="customAction3.icon"
                           :description="customAction3.description" :color="'primary'"
                           :item="item" @custom-action="$emit('custom-action3',item)">
            </tooltip-table>
          </template>
        </v-data-table>
        </v-card>
      </v-sheet>
    </v-container>
</template>

<script>
import ExpansionModelo from './ExpansionModelo.vue'
import FormularioModelo from './FormularioModelo.vue'
import TooltipTable from "@/components/UI/Tooltips/TooltipTable.vue";
import CrudService from "@/services/crud.service";
import {OPEN_SNACKBAR} from "@/store/actions/snackbar";

export default {
    name: "TablaModelo",
    components: {
      ExpansionModelo,
      FormularioModelo,
      TooltipTable
    },
    props: {
      formTitle: {
        type: String,
        default: () => "Elemento"
      },
      items: {
          type: Array,
          default: () => []
      },
      headers: {
          type: Array,
          default: () => []
      },
      estadosConcurso: {type: Array, default: () => []},
      customAction1: {
          type: Object,
          default: () => {
            return {
              icon: 'mdi-gesture-tap',
              active: false,
              description: 'custom action 1'
            }
          }
      },
      customAction2: {
        type: Object,
        default: () => {
          return {
            icon: 'mdi-gesture-tap',
            active: false,
            description: 'custom action 2'
          }
        }
      },
      customAction3: {
        type: Object,
        default: () => {
          return {
            icon: 'mdi-gesture-tap',
            active: false,
            description: 'custom action 3'
          }
        }
      },
      hideButton: {
          type: Boolean,
          default: () => false
      },
      addMaterial: {
        type: Boolean,
        default: () => false
      },
      newEnsayo: {
          type: Boolean,
          default: () => false
      },
      isSheet: {
      type: Boolean,
      default: () => false
      },
      isContest: {
        type: Boolean,
        default: () => false
      },
      showSelect: {
          type: Boolean,
          default: () => false
      },
      hideEdit: {
          type: Boolean,
          default: () => false
      },
      hideExpansion: {
          type: Boolean,
          default: () => false
      },
      hideActions: {
          type: Boolean,
          default: () => false
      },
      hideDelete: {
          type: Boolean,
          default: () => false
      },
      editResultado: {
          type: Boolean,
          default: () => false
      },
      showActaView: {
        type: Boolean,
        default: () => false
      },
      itemKey: {
        type: String,
        default: () => "id"
      },
      optionsTable: {
        type: Object,
        default: () => {}
      },
      totalItems: {
        type: Number,
        default:() => 0
      },
      showOrden: {
        type: Boolean,
        default: () => false
      },
      itemTable: {
        type: String,
        default: () => ""
      },
      itemId: {
        type: String,
        default: () => "id"
      },
      errorText: {
        type: String,
        default: () => "Error al cargar los datos"
      }
    },
    data() {
        return {
          expanded: [],
          dialogActive: false,
          selectedItems: [],
          testHeaders: [
            { text: this.$t('Global.Test.codigo'), value: 'codigo', align: 'left', sortable: false, rules: [] },
            { text: this.$t('Global.Test.nombre'), value: 'nombre', align: 'left', sortable: false, rules: [] }
          ],
          formTitle1: "",
          editedItem:{}
        }
    },
    methods: {
      getOptionsTable(val){
        this.optionsTable.sorting.ascending= !val.sortDesc[0]
        this.optionsTable.sorting.column= val.sortBy[0]
        this.optionsTable.pagination.page= val.page
        this.optionsTable.pagination.pageSize = val.itemsPerPage
        this.$emit('pagination-data',this.optionsTable)
      },
      newUser() {
        if(!this.showActaView){
          this.dialogActive = true
          this.formTitle1 = ""
          this.formTitle1= "Nuevo " + this.formTitle
          this.editedItem = null
        }
        else{
          this.$emit('openNewActa')
        }
      },
      dialogMaterial() {
        this.$emit('dialogMaterial')
      },
      dialogEnsayo() {
        this.$emit('dialogEnsayo')
      },
      editItem(item) {
        if(!this.showActaView){
          this.formTitle1 = ""
          if(this.isSheet) this.formTitle1= "Editar " + this.formTitle + " " + item.concurso.numExpediente + " - " + item.codigo
          else this.formTitle1= "Editar " + this.formTitle
          this.overlay=true
          CrudService.getById(this.itemTable, item[this.itemId])
            .then((response) => {
              this.editedItem = response.data
            })
            .catch(() => {
              this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Clients.guardadoError'), color: 'error', icon:'mdi-alert-circle-outline'})
            })
            .finally(() => {
              this.overlay = false
              this.dialogActive = true
            })
        }
        else{
          this.$emit('openActaEdit',item)
        }
      },
      createItem(item) {
        this.$emit('createItem', item)
      },
      updateItem(item){
          this.$emit('updateItem', item)
      },
      deleteItem(item){
          this.$emit('deleteItem', item)
      },
      downloadDocument(item){
        this.$emit('downloadDocument', item)
      },
      openOrden (item) {
         this.$emit('openOrden',item)
      },
      itemSelected (item) {
          if (item.value) {
            this.selectedItems.push(item.item)
          } else {
            this.selectedItems.splice(this.selectedItems.indexOf(item.item), 1)
          }
          this.$emit('selectedItem', this.selectedItems)
      },
      getColor( status ) {
        let estado = ""
        if(this.isContest) estado =status.idEstadoConcurso.toString()
        else if(this.isSheet) estado = status.idEstadoPliego.toString()
        if ( estado === this.$t('Global.Contest.estadoUso')) return 'success'
        else if ( estado === this.$t('Global.Contest.estadoProceso')) return 'primary'
        else return 'warning'
      },
      getItemDescription( status ) {
        let estado = ""
        if(this.isContest) estado =status.idEstadoConcurso.toString()
        else if(this.isSheet) estado = status.idEstadoPliego.toString()
        if ( estado === this.$t('Global.Contest.estadoUso')) return this.$t('Global.Actions.cerrar')
        if (  estado === this.$t('Global.Contest.estadoProceso')) return this.$t('Global.Actions.abrir')
        else if(  estado === this.$t('Global.Contest.estadoDesuso')) return this.$t('Global.Actions.reabrir')
        else return this.customAction2.descripcion
      },
      getEstado( status ) {
        if(this.isContest){
          const identificador = this.estadosConcurso.map(e => e.idEstadoConcurso).indexOf(status.idEstadoConcurso)
          if(identificador !== -1) return this.estadosConcurso[identificador].identificador
          else return this.customAction2.descripcion
        }
        if(this.isSheet){
          const identificador = this.estadosConcurso.map(e => e.idEstadoPliego).indexOf(status.idEstadoPliego)
          if(identificador !== -1) return this.estadosConcurso[identificador].identificador
        }
      },
      getItemIcon( status ) {
        let estado = ""
        if(this.isContest) estado =status.idEstadoConcurso.toString()
        else if(this.isSheet) estado = status.idEstadoPliego.toString()
        if ( estado === this.$t('Global.Contest.estadoDesuso') || estado === this.$t('Global.Contest.estadoProceso')) return 'mdi-check-bold'
        else return this.customAction1.icon
      }
    }
}
</script>

<style>

</style>
