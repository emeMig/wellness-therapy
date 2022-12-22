<template>
    <div>
        <v-row class="ma-0 pa-0">
            <v-col cols="9">
                <v-row>
                    <v-col class="ma-0 pa-0 pt-2" cols="6">
                        <v-list-item class="ma-0 py-0 px-2" two-line>
                            <v-list-item-content>
                            <v-list-item-title class="mt-n3"><p class="font-weight-bold">Nombre</p></v-list-item-title>
                            <v-list-item-subtitle>{{( item.surname)}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        </v-col>
                        <v-col class="ma-0 pa-0 pt-2" cols="6">
                        <v-list-item class="ma-0 py-0 px-2" two-line>
                            <v-list-item-content>
                            <v-list-item-title class="mt-n3"><p class="font-weight-bold">Apellido</p></v-list-item-title>
                            <v-list-item-subtitle>{{( item.lastname)}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        </v-col>
                        <v-col class="ma-0 pa-0 pt-2" cols="6">
                        <v-list-item class="ma-0 py-0 px-2" two-line>
                            <v-list-item-content>
                            <v-list-item-title class="mt-n3"><p class="font-weight-bold">Especialidad</p></v-list-item-title>
                            <v-list-item-subtitle>{{( item.speciality)}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        </v-col>
                        <v-col class="ma-0 pa-0 pt-2" cols="6">
                        <v-list-item class="ma-0 py-0 px-2" two-line>
                            <v-list-item-content>
                            <v-list-item-title class="mt-n3"><p class="font-weight-bold">Ciudad</p></v-list-item-title>
                            <v-list-item-subtitle>{{( item.city)}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        </v-col>
                        <v-col class="ma-0 pa-0 pt-2" cols="12">
                        <v-list-item class="ma-0 py-0 px-2" two-line>
                            <v-list-item-content>
                            <v-list-item-title class="mt-n3"><p class="font-weight-bold">Descripción</p></v-list-item-title>
                            <v-list-item-subtitle>{{( item.description)}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>                
                </v-row>
            </v-col>
            <v-col cols="3">
                <v-row class="d-flex align-center flex-column">
                    <v-avatar
                        class="mt-2 elevation-3"
                        color="secondary"
                        size="90"
                    >
                        <v-icon size="64">mdi-account</v-icon>
                        <!-- <img
                            src="https://cdn.vuetifyjs.com/images/john.jpg"
                            alt="User Image"
                        > -->
                    </v-avatar>
                    <v-btn color="primary" dark class="mt-5" rounded @click="activateMessage=true">
                        Contactar 
                        <v-icon class="pt-1 pl-2">mdi-message-arrow-right-outline</v-icon>
                    </v-btn>            
                </v-row>
            </v-col>

        </v-row >

        <send-message-dialog
            :activate="activateMessage"
            :destinatario="profesionalFullName"
            @close-dialog="activateMessage=false"
            @send-message="sendMessage"
        />
    </div>
</template>
  
<script> 
import SendMessageDialog from '@/components/UI/Dialogs/SendMessageDialog.vue'

export default {
    name: "ExpansionBusqueda",
    components: {
        SendMessageDialog
    },
    props: {
        item: {
            type: Object,
            default: () => {}
            },
        headers: {
            type: Array,
            default: () => []        
        }    
    },
    data() {
        return {
            activateMessage: false,
        }
    },
    computed: {
        editedHeaders(){
            return this.headers.filter(e => e.value !== 'actions' && e.value !== 'data-table-expand')
        },
        profesionalFullName(){
            if (this.item.surname && this.item.lastname) 
                return `${this.item.surname} ${this.item.lastname}`            
            else 
                return ''    
        }
    },
    methods: {
        sendMessage(message) {
            console.log(message)
        }
    }
}
  </script>