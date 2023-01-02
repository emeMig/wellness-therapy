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
                    <v-form
                        @submit.prevent="!validForm ? null : logHandler()"
                        ref="loginForm"
                    >
                      <v-text-field
                          autocomplete="off"
                          prepend-inner-icon="mdi-account"
                          v-model="form.username"
                          @input="validate"
                          :rules="[rules.requiredUser]"
                          placeholder="Correo electrónico"
                          solo
                          flat
                          dense
                      />
                      <v-text-field
                          autocomplete="off"
                          :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="showPwd ? 'text' : 'password'"
                          prepend-inner-icon="vpn_key"
                          v-model="form.password"
                          :rules="[rules.requiredPass]"
                          placeholder="Contraseña"
                          @input="validate"
                          @click:append="showPwd = !showPwd"
                          solo
                          flat
                          dense
                      />
                      <div class="d-flex flex-no-wrap justify-space-between">
                        <router-link
                            to="/forgot-password"
                            class="py-1 no-text-decoration"
                        >
                          {{ $t("Global.Login.forgotPass") }}
                        </router-link>
                      </div>
                      <div class="d-flex flex-no-wrap justify-start">
                        <span class="mt-1">¿No tienes cuenta?</span>
                        <router-link
                            to="/register"
                            class="pa-1 no-text-decoration"
                        >
                          Crear una
                        </router-link>
                      </div>
                      <v-btn :class="{ 'mt-8':true, 'relief-outset': validForm }" block type="submit" :disabled="!validForm"
                      >{{ $t("Global.Login.access") }}
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
  </v-sheet>
</template>

<script>


const defaultForm = {
  username: "",
  password: "",
  rememberMe: false,
};

import { mapActions } from 'vuex'
import validations from '@/utils/validations'

export default {
  name: "Login",
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
    ...mapActions(["logUser"]),
    validate() {
      this.validForm = this.$refs.loginForm.validate()
    },
    logHandler() {
      this.logUser({
        email: this.form.username, 
        password: this.form.password, 
      })
      .then(() => this.resetForm())
    },
    resetForm() {
      this.form = Object.assign({}, defaultForm);
      this.$refs.loginForm.reset();
    }
  }
}
</script>
