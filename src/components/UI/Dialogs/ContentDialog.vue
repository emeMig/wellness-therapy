<template>
    <div>
        <v-dialog
            v-model="activate"
            max-width="600px"
            @click:outside="closeDialog"
            persistent
        >
        <v-card flat class="relief">
          <!-- Titulo -->
          <v-toolbar class="relief">
            <v-toolbar-title class="ml-3 mt-1">
                <v-icon color="primary" size="32" left>mdi-content-duplicate</v-icon>
                <span class="primary--text">Crear Publicación</span>               
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="mx-0">
            <v-container class="mx-0" fluid>
                <v-form ref="modelForm">
                    <v-row>
                        <v-col cols="12" class="d-flex flex-row">
                            <span style="font-size: 16.5px; padding-top: 21px">Tamaño mediano</span>
                            <v-switch            
                                class="ml-4"
                                inset
                                v-model="editedItem.size"
                                label="Tamaño grande"
                                value="full"
                            >   
                            </v-switch>     
                        </v-col>
                        <v-col>
                            <v-select                                
                                :items = "types"
                                v-model="editedItem.type"
                                @input="validate"
                                :rules="[rules.required]"
                                label="Tipo de publicación"
                                solo
                                flat
                                dense
                            ></v-select> 
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="editedItem.header"
                                label="Encabezado"
                                clearable 
                            ></v-text-field>                                
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="editedItem.title"
                                label="Título"
                                @input="validate"
                                clearable
                                :rules="[rules.required]"
                            ></v-text-field>                                
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                                v-model="editedItem.content"
                                label="Contenido"
                                @input="validate"
                                clearable
                                filled
                                shaped
                                auto-grow
                                counter
                                rows="4"
                                row-height="30"
                                :rules="[rules.required]"
                            ></v-textarea>                                
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-if="editedItem.type === 'Imagen' || editedItem.type === 'Video'"
                                @input="validate"
                                v-model="editedItem.url"
                                label="URL"
                                clearable                                
                                :rules="[rules.required]"
                            ></v-text-field>                                
                        </v-col>
                    </v-row>
                </v-form>
                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="submitItem" :disabled="!validForm">Publicar</v-btn>
                </v-card-actions>
            </v-container>
          </v-card-text>

        </v-card>  
        </v-dialog>
        <confirm-dialog
            ref="confirmDialog"
            message="¿Desea añadir esta publicación?"
        />
    </div>
</template>

<script>
import validations from '@/utils/validations'
import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'

export default {
    name: "ContentDialog",
    components: {
        ConfirmDialog
    },
    props: {
      activate: { 
        type: Boolean
      },
    },
    data() {
        return {
            types: ['Texto', 'Imagen', 'Video'],
            rules: validations,
            validForm: false,
            editedItem: {
                header:'',
                title:'',
                content:'',
                size: '',
                type: '',
                url:''
            },
            defaultItem: {
                header:'',
                title:'',
                content:'',
                size: '',
                type: '',
                url:''                
            }
        }
    },
    methods: {
        validate() {
            this.validForm = this.$refs.modelForm.validate()
        },
        closeDialog(){
            this.editedItem = Object.assign({}, this.defaultItem)
            this.$emit('close-dialog')
        },
        async submitItem(){
            const confirm = await this.$refs.confirmDialog.open()           
            if(!confirm){
                return    
            }
            else {    
                this.$emit('add-publication', this.editedItem)
                this.closeDialog()
            }
        }
    }
}
</script>

<style>

</style>