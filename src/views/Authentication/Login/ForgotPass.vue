<template>
    <v-sheet height="100%" class="relief-inset">
      <v-container class="fill-height justify-center" fluid>
        <v-row align="center" justify="center">
          <v-col col="12" align="center" justify="center">
            <v-sheet class="relief with-radius" max-width="400" min-width="360">
              <v-card-text class="pa-0">
                <v-row class="ma-0">
                  <v-col cols="12">
                    <div class="my-6 text-center">
                      <div class="text-h4 d-flex align-center flex-column justify-center">
                        <img :src="require('@/assets/logo/WT-logo1.svg')" class="pl-3 drop-shadowed" alt="WT logo" width="240px" />
                        <span class=" mt-2 mb-4"><h3 class="primary--text title-font text-shadowed">{{ $t('Global.Main.appName') }}</h3></span>
                      </div>
                    </div>
                    <v-sheet max-width="300" height="280" class="mx-auto" color="transparent">

                        <div class="text-h5 mt-n3 mb-9">
                            <span >
                                <h6 class="primary--text title-font text-shadowed">
                                    Introduce tu email y recibirás <br> un correo para restaurar tu contraseña:
                                </h6>
                            </span>
                        </div>  

                      <v-form
                          @submit.prevent="!validForm ? null : handleEmail()"
                          ref="loginForm"
                      >
                        <v-text-field
                            autocomplete="off"
                            prepend-inner-icon="mdi-account"
                            v-model="form.username"
                            @input="validate"
                            :rules="[rules.requiredUser, rules.email]"
                            placeholder="Correo electrónico"
                            solo
                            flat
                            dense
                        />
                        <v-btn :class="{ 'mt-8':true, 'relief-outset': validForm }" block type="submit" :disabled="!validForm"
                        >enviar email
                        </v-btn
                        >
                      </v-form>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <confirm-dialog 
          ref="confirmDialog"
          message="¿Desea restaurar correo?"
        />
    </v-sheet>
  </template>
  
  <script>
  
  
  const defaultForm = {
    username: "",
  };
  
  import validations from '@/utils/validations'
  import ConfirmDialog from '@/components/UI/Dialogs/ConfirmDialog.vue'
  import { OPEN_SNACKBAR } from "@/store/actions/snackbar"
  
  export default {
    name: "Login",    
    components: {
        ConfirmDialog
    },
    data() {
      return {
        rules: validations,
        form: Object.assign({}, defaultForm),
        showPwd: false,
        isError: false,
        validForm: false
      }
    },
    methods: {
      validate() {
        this.validForm = this.$refs.loginForm.validate()
      },
      async handleEmail() {
        const confirm = await this.$refs.confirmDialog.open()           
          if(!confirm){
              return    
          } else 
        // todo RECOVER SERVICE
        this.$store.dispatch(OPEN_SNACKBAR, {
                    text: 'Email de restauración enviado',
                    color: 'success',
                    y: 'bottom',
                    x: 'right',
                    icon: "mdi-alert-octagon-outline",
                    timeout: 2000
                    })
        this.resetForm()
      },
      resetForm() {
        this.form = Object.assign({}, defaultForm);
        this.$refs.loginForm.reset();
        this.$router.push('/login')
      }
    }
  }
  </script>