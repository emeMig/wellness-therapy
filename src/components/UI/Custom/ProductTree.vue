<template>
    <div>
        <v-row v-if="isEditable">
            <v-col cols="4">
                <v-text-field
                class="pl-4"
                    v-model="productName"
                    :label="$t('Global.ProductTree.addProduct')"
                    clearable
                    @keydown.enter="addProduct"
                    @change="$emit('update-product',products)"
                >
                </v-text-field>
            </v-col>
            <v-col cols="2">
                <v-icon dark class="pl-1 pt-6 no-ripple" size="30" color="primary" @click="addProduct">mdi-arrow-down-box</v-icon>
            </v-col>
        </v-row>
        <v-row v-if="products.length" class="py-5 px-0">
            <v-col>
                <v-expansion-panels
                    multiple
                    v-model="expandedProduct"
                >
                    <v-expansion-panel
                        style="background-color: transparent"
                        class="relief-outset"
                        v-for="(product,i) in products"
                        :key = i
                    >
                        <v-expansion-panel-header
                            class="py-0"
                            :disable-icon-rotate="true"
                        >
                            <v-col class="ma-0 pa-0" cols="10">{{ product.name }}</v-col>
                            <template v-slot:actions>
                                    <v-icon v-if="isEditable" dark class="pr-2 no-ripple" color="primary" @click.stop="addMaterial(i)">mdi-plus</v-icon>
                                    <v-icon v-if="isEditable" dark class="pr-2 no-ripple" color="primary" @click.stop="deleteProduct(i)">mdi-delete</v-icon>
                                    <v-icon dark class="pr-2 no-ripple" color="primary">$expand</v-icon>
                            </template>

                        </v-expansion-panel-header>
                        <v-expansion-panel-content v-if="product.materials.length > 0">
                            <!-- NEST MATERIALES -->
                            <v-row class="mb-1" >
                                <v-col cols="4" class="pl-10 font-weight-bold">{{ $t('Global.ProductTree.materialCode') }}</v-col>
                                <v-col cols="8" class="pl-6 font-weight-bold">{{ $t('Global.ProductTree.materialName') }}</v-col>
                            </v-row>
                            <v-expansion-panels
                                multiple
                                v-model="expandedMaterial"
                            >
                                <v-expansion-panel
                                    style="background-color: transparent"
                                    class="relief-outset"
                                    v-for="(material,j) in product.materials"
                                    :key = j
                                >
                                        <v-expansion-panel-header
                                            class="py-0"
                                            :disable-icon-rotate="true"
                                        >
                                            <v-col class="pb-0" cols="4">
                                                <p >{{ material.code }}</p>
                                            </v-col>
                                            <v-col class="pb-0" cols="8">
                                                <p>{{ material.name }}</p>
                                            </v-col>
                                            <template v-slot:actions>
                                                <v-icon v-if="isEditable" dark class="pr-2 no-ripple" color="primary" @click.stop="addTests(i,j)">mdi-plus</v-icon>
                                                <v-icon v-if="isEditable" dark class="pr-2 no-ripple" color="primary" @click.stop="deleteMaterial(i,j)">mdi-delete</v-icon>
                                                <v-icon dark class="pr-2 no-ripple" color="primary">$expand</v-icon>
                                            </template>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                        <!-- NEST ENSAYOS -->
                                            <v-data-table
                                                style="background-color: transparent"
                                                class="relief px-2 mb-2"
                                                :headers="testHeaders"
                                                :items="material.tests"
                                            >
                                                <template #[`item.actions`]="{ item }">
                                                    <tooltip-table
                                                        v-if="isEditable"
                                                        :is-icon="true"
                                                        :icon="'mdi-delete'"
                                                        :description=" $t('Global.Actions.borrar')"
                                                        :color="'primary'"
                                                        :right="true"
                                                        :bottom="false"
                                                        :item="item"
                                                        @custom-action="deleteTest(i,j,item)">
                                                    </tooltip-table>
                                                </template>
                                            </v-data-table>
                                        </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
        <v-row v-else >
            <v-col>
                <p>{{ $t('Global.ProductTree.noProducts') }}</p>
            </v-col>
        </v-row>
        <!-- Dialogo de añadir materiales -->
        <v-dialog v-model="dialogMaterials" max-width="600px">
        <v-card>
            <v-card-title>
            <h3 class=" pa-0 pb-6" >{{ $t('Global.Actions.addMaterials')  }}</h3>
            </v-card-title>
            <v-card-text>
            <v-row>
                <v-col cols="12" sm="12">
                <select-table
                    :headers="materialsHeadersDialog"
                    :subtitle="$t('Global.Materials.tituloDialogo') "
                    :single-select="false"
                    :items="AllMaterials"
                    :left-btn-txt="$t('Global.Actions.cancelar') "
                    :left-btn-event="closeDialogMaterials"
                    :right-btn-txt="$t('Global.Actions.addMaterials') "
                    :right-btn-event="submitDialogMaterials"
                ></select-table>
                </v-col>
            </v-row>
            </v-card-text>
        </v-card>
        </v-dialog>
        <!-- Dialogo de añadir ensayos -->
        <v-dialog v-model="dialogTests" max-width="600px">
        <v-card>
            <v-card-title>
            <h3 class=" pa-0 pb-6" >{{ $t('Global.Actions.addEnsayos') }}</h3>
            </v-card-title>
            <v-card-text>
            <v-row>
                <v-col cols="12" sm="12">
                <select-table
                    :headers="testsHeadersDialog"
                    :subtitle="$t('Global.Test.titulo')"
                    :items="AllTests"
                    :left-btn-txt="$t('Global.Actions.cancelar')"
                    :left-btn-event="closeDialogTests"
                    :right-btn-txt="$t('Global.Actions.guardar')"
                    :right-btn-event="submitDialogTests"
                >
                </select-table>
                </v-col>
            </v-row>
            </v-card-text>
        </v-card>
        </v-dialog>
    </div>
</template>

<script>
import materiales from "@/utils/data/materiales-sample.json"
import ensayos from "@/utils/data/ensayos-sample.json"
import SelectTable from "@/components/Modelos/SelectTable"
import TooltipTable from "@/components/UI/Tooltips/TooltipTable.vue"
import CrudService from "@/services/crud.service"
import TableNames from '@/config/table-names'
import {OPEN_SNACKBAR} from "@/store/actions/snackbar";
import {pliegoService} from "@/services/pliego.service";

export default {
    name: "ProductTree",
    components: {
        SelectTable,
        TooltipTable
    },
    props: {
      isEditable: {
          type: Boolean,
          default: () => true
      },
      pliego: {
          type: Object,
          default: () => {}
          }        
    },
    data() {
        return {
            productName: '',
            expandedProduct: [],
            expandedMaterial: [],
            dialogMaterials: false,
            dialogTests: false,
            AllMaterials: materiales,
            AllTests: ensayos,
            selectedProduct: '',
            selectedMaterial:'',
            products: [
                // {
                //     name: 'Product1',
                //     materials: [
                //         {
                //             name: "Material1",
                //             code: "0001",
                //             tests: [
                //                 {
                //                     name: "test1", code: "0001", minValue: "0", maxValue: "100"
                //                 }
                //             ]
                //         }
                //     ]
                // },
                //                 {
                //     name: 'Product2',
                //     materials: []
                // },
            ],
            materialsHeadersDialog: [
                { text: this.$t('Global.Materials.codigo'), value: 'codigo', align: 'left', sortable: true, rules: [] },
                { text: this.$t('Global.Materials.nombre'), value: 'nombre', align: 'left', sortable: true, rules: [] },
            ],
            testsHeadersDialog: [
                { text: this.$t('Global.Materials.codigo'), value: 'codigo', align: 'left', sortable: false, rules: [] },
                { text: this.$t('Global.Materials.nombre'), value: 'nombre', align: 'left', sortable: false, rules: [] }
            ],
            testHeaders: [
                { text: this.$t('Global.ProductTree.testCode'), value: 'code', sortable: 'true' },
                { text: this.$t('Global.ProductTree.testName'), value: 'name', sortable: 'true' },
                { text: this.$t('Global.ProductTree.minValue'), value: 'minValue', sortable: 'true' },
                { text: this.$t('Global.ProductTree.maxValue'), value: 'maxValue', sortable: 'true' },
                { text: this.$t('Global.Actions.acciones'), value: 'actions', align: 'center', sortable: false },
            ]
        }
    },
    methods: {
        addProduct(){
          if(this.productName !== ""){
            // TODO insert producto - callback
            this.insertProduct(this.productName)
            //this.products.push( { name: this.productName, materials: [] } )            
          }
        },
        addMaterial(index){
            this.expandedProduct.push(index)
            this.selectedProduct = index
            this.openDialogMaterials()
        },
        addTests(indexProduct, indexMaterial) {
            this.expandedMaterial.push(indexMaterial)
            this.selectedProduct = indexProduct
            this.selectedMaterial= indexMaterial
            this.openDialogTests()
        },
        deleteProduct(index){
            this.products.splice(index,1)
            this.expandedProduct.splice(index,1)
        },
        deleteMaterial(indexProduct,indexMaterial){
            this.products[indexProduct].materials.splice(indexMaterial,1)
            this.expandedMaterial.splice(indexMaterial,1)
        },
        deleteTest(indexProduct,indexMaterial,item){
            this.products[indexProduct].materials[indexMaterial].tests =
            this.products[indexProduct].materials[indexMaterial].tests.filter( i => !(i.code === item.code))
        },
        openDialogMaterials(){
            this.dialogMaterials=true
        },
        openDialogTests(){
            this.dialogTests=true
        },
        closeDialogMaterials(){
            this.dialogMaterials=false
        },
        closeDialogTests(){
            this.dialogTests=false
        },
        submitDialogMaterials(items) {
            // TODO insert materiales - callback
            for( let item of items) {
                this.products[this.selectedProduct].materials.push(
                    { name: item.nombre, code: item.codigo, tests: []}
                )
            }
            this.closeDialogMaterials()
        },
        submitDialogTests(items) {
            // TODO insert ensayos - callback
            for( let item of items) {
                this.products[this.selectedProduct].materials[this.selectedMaterial].tests.push(
                    { name: item.nombre, code: item.codigo, minValue: item.valorMinimo, maxValue: item.valorMaximo }
                )
            }
            this.closeDialogTests()
        },
        insertProduct(nombreProducto){
            CrudService.insert(TableNames.PRODUCT, { 
                nombreProducto,
                stTdPliego: this.pliego                
            })
                .then(() => {
                this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Contest.guardado'), color: 'success', icon:'mdi-check-circle-outline'})
                })
                .catch(() => {
                this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Contest.guardadoError'), color: 'error', icon:'mdi-alert-circle-outline'})
                })
                .finally(() => this.loadProductos())
        },
        loadProducts() {
            pliegoService.getPliego(this.pliego)
                .then((response) => {
                this.products = response.data
                })
                .catch(() => {
                this.$store.dispatch(OPEN_SNACKBAR, {text: this.$t('Global.Contest.guardadoError'), color: 'error', icon:'mdi-alert-circle-outline'})
                })
                .finally(() => this.productName = '')
        }
    },
    mounted() {
        console.log(this.pliego);
    }
}
</script>

<style>
    .v-icon.no-ripple::after {
        background: transparent
    }
</style>
