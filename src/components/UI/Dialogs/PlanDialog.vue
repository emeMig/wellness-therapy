<template>
    <div class="text-center">
      <v-dialog
        v-model="activate"
        @click:outside="closeDialog"
        max-width="500px"
      >
        <v-card flat class="relief">
          <!-- Titulo -->
          <v-toolbar class="relief">
            <v-toolbar-title class="ml-3 mt-1">
              <v-icon color="primary" size="32" left>mdi-credit-card</v-icon>
              <span class="primary--text">Selecciona tu Suscripción</span>
            </v-toolbar-title>
          </v-toolbar>
          <!-- Contenido -->
              <v-container class="pa-0 pt-3">
                <v-row class="px-5">
                    <v-col cols="6" xs="12"  >
                        <button @click="selectOption('Mensual')">
                            <v-card 
                                class="pa-3"
                                :color="plan === 'Mensual' ? 'gray' : 'primary'"
                                dark
                            >
                                <v-card-title>
                                    PLAN 1
                                </v-card-title>
                                <v-card-subtitle class="text-sm-left">
                                    Presencia en nuestro buscador y opciones básicas.<br>
                                    Pago mensual: <span class="font-weight-bold">9,95€</span>
                                </v-card-subtitle>
                            </v-card> 
                        </button>
                    </v-col>
                    <v-col cols="6" xs="12" >
                        <button @click="selectOption('Mensual Plus')">
                            <v-card 
                            class="pa-3"
                                :color="plan === 'Mensual Plus' ? 'gray' : 'secondary'"
                                dark
                            >
                                <v-card-title>
                                    PLAN 2
                                </v-card-title>
                                <v-card-subtitle class="text-sm-left">
                                    Presencia en buscador, gestor de clientes y opciones avanzadas.<br>
                                    Pago mensual: <span class="font-weight-bold">14,95€</span>
                                </v-card-subtitle>
                            </v-card> 
                        </button>
                    </v-col>
                    <v-col cols="6" xs="12"  >
                        <button @click="selectOption('Anual')">
                            <v-card 
                                class="pa-3"
                                :color="plan === 'Anual' ? 'gray' : 'info'"
                                dark
                            >
                                <v-card-title>
                                    PLAN 3
                                </v-card-title>
                                <v-card-subtitle class="text-sm-left">
                                    Presencia en buscador, gestor de clientes y opciones avanzadas.<br>
                                    Pago mensual: <span class="font-weight-bold">14,95€</span>
                                </v-card-subtitle>
                            </v-card> 
                        </button>
                    </v-col>
                    <v-col cols="6" xs="12" >
                        <button @click="selectOption('Anual Plus')">
                            <v-card 
                                class="pa-3"
                                :color="plan === 'Anual Plus' ? 'gray' : 'success'"
                                dark
                            >
                                <v-card-title>
                                    PLAN 4
                                </v-card-title>
                                <v-card-subtitle class="text-sm-left">
                                    Presencia en buscador, gestor de clientes y opciones avanzadas.<br>
                                    Pago anual: <span class="font-weight-bold">149,95€</span>
                                </v-card-subtitle>
                            </v-card> 
                        </button>
                    </v-col>
                </v-row>
              </v-container>

          <!-- Acciones -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="selectPlan" :disabled="!plan">Seleccionar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <confirm-dialog 
        ref="confirmDialog"
        :message="'¿Desea seleccionar el plan ' + plan + '?'" 
      />

    </div>
  </template>
  
  <script>
  
  import validations from '@/utils/validations'
  import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'
  
  export default {
    name: "PlanDialog",
    components: {
        ConfirmDialog
    },
    props: {
      activate: { 
        type: Boolean
      },
      destinatario: {
        type: String
      }
    },
    data () {
      return {
        plan: null,
        validForm: false,
        rules: validations,
      }
    },
    methods: {
        selectOption(plan) {
            this.plan = plan
        },
        closeDialog() {
            this.plan = null
            this.$emit('close-dialog')
        },
        async selectPlan() {
            const confirm = await this.$refs.confirmDialog.open()           
            if(!confirm){
                return    
            }
            else {
                this.$emit('submit-plan', this.plan)
                this.closeDialog()
            }
        },
        validate() {
            this.validForm = this.$refs.form.validate()
        }
    }
  }
  </script>