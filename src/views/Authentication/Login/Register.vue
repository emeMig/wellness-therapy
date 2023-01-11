<template>
    <v-sheet height="100%" class="relief-inset">
      <v-container class="fill-height justify-center" fluid>        
        <v-row align="center" justify="center">
          <v-col col="12" align="center" justify="center">
            <v-sheet class="relief with-radius" max-width="480" min-width="400">
              <v-card-text class="pa-0">
                <v-row class="ma-0">
                  <v-col cols="12">
                    <div class="my-6 text-center">
                      <div class="text-h4 d-flex align-center flex-column justify-center">
                        <img :src="require('@/assets/logo/WT-logo1.svg')" class="pl-3 drop-shadowed" alt="WT logo" width="240px" />
                        <span class=" mt-2 mb-4"><h3 class="primary--text title-font text-shadowed">{{ $t('Global.Main.appName') }}</h3></span>
                      </div>
                    </div>
                    <v-sheet max-width="420" min-height="300" class="mx-auto" color="transparent">

                        <div class="text-h5 mt-n3 mb-3">
                            <span >
                                <h4 class="primary--text title-font text-shadowed">
                                    Registro de nueva cuenta
                                </h4>
                            </span>
                        </div>

                        <v-container v-if="!registering">
                            <v-row dense>
                                <v-col cols="12">
                                    <button @click="registerUser(1)">
                                        <v-sheet class="relief with-radius">
                                            <v-card 
                                                class="px-5 py-3 "
                                                color="primary"
                                                dark
                                            >
                                                <v-card-title>
                                                    ALTA DE USUARIO
                                                </v-card-title>
                                                <v-card-subtitle class="text-sm-left">
                                                    Accede a nuestro buscador para contactar con profesionales.
                                                </v-card-subtitle>
                                            </v-card> 
                                        </v-sheet>
                                    </button>
                                </v-col>
                                <v-col cols="12">
                                    <button @click="registerUser(2)">
                                        <v-sheet class="relief with-radius">
                                            <v-card 
                                                class="px-5 py-3 mt-3 "
                                                color="secondary"
                                                dark
                                            >
                                                <v-card-title>
                                                    ALTA DE PROFESIONAL
                                                </v-card-title>
                                                <v-card-subtitle class="text-sm-left">
                                                    Regístrate para ofrecer tus servicios y disfrutar de nuestras herramientas.
                                                </v-card-subtitle>
                                            </v-card> 
                                        </v-sheet>                                       
                                    </button>
                                </v-col>
                            </v-row>
                        </v-container>

                        <v-form
                            v-if="registering"
                            @submit.prevent="!validForm ? null : createHandler()"
                            ref="loginForm"
                            class="mt-8 pb-6"
                        >
                            <v-text-field
                                autocomplete="off"
                                prepend-inner-icon="mdi-account"
                                v-model="form.username"
                                @input="validate"
                                :rules="[rules.requiredUser]"
                                label="Correo electrónico"
                                solo
                                flat
                                dense
                            />
                            <v-row class="ma-0 pa-0">
                                <v-col class="ma-0 pa-0 pr-1" cols="6">
                                    <v-text-field
                                        autocomplete="off"
                                        :append-icon="showPwd1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="showPwd1 ? 'text' : 'password'"
                                        prepend-inner-icon="vpn_key"
                                        v-model="form.password1"
                                        :rules="[rules.requiredPass]"
                                        label="Contraseña"
                                        @input="validate"
                                        @click:append="showPwd1 = !showPwd1"
                                        solo
                                        flat
                                        dense
                                    />
                                </v-col>
                                <v-col class="ma-0 pa-0 pl-1" cols="6">
                                    <v-text-field
                                        autocomplete="off"
                                        :append-icon="showPwd2 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="showPwd2 ? 'text' : 'password'"
                                        prepend-inner-icon="vpn_key"
                                        v-model="form.password2"
                                        :rules="[rules.requiredPass, rules.minLength6, value => value === form.password1 || 'las contraseñas no coinciden',]"
                                        label="Repite contraseña"
                                        @input="validate"
                                        @click:append="showPwd2 = !showPwd2"
                                        solo
                                        flat
                                        dense
                                    />
                                </v-col>
                            </v-row>
                            <v-row class="ma-0 pa-0">
                                <v-col class="ma-0 pa-0 pr-1" cols="6">
                                    <v-text-field
                                        v-if="category === 2"
                                        autocomplete="off"
                                        prepend-inner-icon="mdi-card-account-details"
                                        v-model="form.surname"
                                        @input="validate"
                                        :rules="[rules.requiredUser]"
                                        label="Nombre"
                                        solo
                                        flat
                                        dense
                                    />
                                </v-col>
                                <v-col class="ma-0 pa-0 pl-1" cols="6">
                                    <v-text-field
                                        v-if="category === 2"
                                        autocomplete="off"
                                        prepend-inner-icon="mdi-card-account-details"
                                        v-model="form.lastname"
                                        @input="validate"
                                        :rules="[rules.requiredUser]"
                                        label="Apellidos"
                                        solo
                                        flat
                                        dense
                                    />
                                </v-col>  
                            </v-row>
                            <v-row class="ma-0 pa-0">
                                <v-col class="ma-0 pa-0 pr-1" cols="6">
                                    <v-select
                                        v-if="category === 2"
                                        :items = "specialities"
                                        prepend-inner-icon="mdi-doctor"
                                        v-model="form.speciality"
                                        @input="validate"
                                        :rules="[rules.requiredUser]"
                                        label="Especialidad"
                                        solo
                                        flat
                                        dense
                                    ></v-select>                                    
                                </v-col>
                                <v-col class="ma-0 pa-0 pl-1" cols="6">
                                    <v-text-field
                                        v-if="category === 2"
                                        autocomplete="off"
                                        prepend-inner-icon="mdi-city"
                                        v-model="form.city"
                                        @input="validate"
                                        :rules="[rules.requiredUser]"
                                        label="Ciudad"
                                        solo
                                        flat
                                        dense
                                    />
                                </v-col> 
                                <v-col class="ma-0 pa-2 pr-1" cols="12">
                                    <v-textarea
                                        v-if="category === 2"
                                        v-model="form.description"
                                        @input="validate"
                                        background-color="#FFFFFF"
                                        dense
                                        clearable
                                        auto-grow 
                                        :rules="[rules.maxLength200]"
                                        label="Texto de presentación"
                                        counter
                                        rows="2"
                                        row-height="30"
                                    ></v-textarea>                                    
                                </v-col>
                                <v-row class="ma-0 pa-0">
                                  <v-col class="ma-0 pa-0 pr-1" cols="12">
                                      <v-text-field
                                          v-if="category === 2"
                                          v-model="selectedPlan"
                                          @input="validate"
                                          label="PLAN SELECCIONADO: "
                                          outlined
                                          readonly
                                          dense
                                      ></v-text-field>                                    
                                  </v-col>
                                </v-row> 
                            </v-row>
                            <v-btn v-if="category===2 && selectedPlan===null" :class="{ 'mt-2':true, 'relief-outset': validForm }" block @click="selectPlan" :disabled="!validForm"
                            >
                              Selecciona Plan
                            </v-btn>                            
                            <v-btn v-else :class="{ 'mt-2':true, 'relief-outset': validForm }" block type="submit" :disabled="!validForm"
                            >
                              Crear Cuenta
                            </v-btn>
                        </v-form>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <plan-dialog 
        :activate="planDialog"
        @submit-plan="getPlan"
        @close-dialog="planDialog=false"    
      />
    </v-sheet>
  </template>
  
  <script>
  
  
  const defaultForm = {
    username: "",
    password: "",
    category: "",
    surname: "",
    lastname: "",
    speciality: "",
    city: "",
    plan: "",
    description: ""   
  };
  
  import { mapActions } from 'vuex'
  import validations from '@/utils/validations'
  import PlanDialog from '@/components/UI/Dialogs/PlanDialog.vue'
  
  export default {
    name: "Register",
    components: {
      PlanDialog
    },
    data() {
      return {
        rules: validations,
        form: Object.assign({}, defaultForm),
        showPwd1: false,
        showPwd2: false,
        isError: false,
        validForm: false,
        category: null,
        registering: false,
        selectedPlan: null,
        planDialog: false,
        specialities: ['Psicoterapia', 'Mindfulness', 'Coaching']
      }
    },
    methods: {
      ...mapActions(["createUser"]),
      registerUser(type) {
        this.category = type
        this.registering = true
      },
      validate() {
        this.validForm = this.$refs.loginForm.validate()
      },
      createHandler() {
        console.log(this.form);
        this.createUser({
          email: this.form.username, 
          password: this.form.password1, 
          category: this.category,
          surname: this.form.surname,
          lastname: this.form.lastname,
          speciality: this.form.speciality,
          city: this.form.city,
          plan: this.selectedPlan
        })
        .then(() => this.resetForm())
      },
      selectPlan(){
        this.planDialog=true
      },
      getPlan(plan){
        this.selectedPlan = plan
      },
      resetForm() {
        this.form = Object.assign({}, defaultForm);
        this.$refs.loginForm.reset();
      }
    }
  }
  </script>