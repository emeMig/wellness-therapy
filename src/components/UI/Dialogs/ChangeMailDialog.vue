<template>
  <div>
    <v-dialog
        v-if="changeDialog"
        v-model="changeDialog"
        max-width="400px"
        overlay-opacity=.1
        persistent
    >
      <v-card class="relief">
        <v-card-title class="px-3 pt-6 pb-4 ml-5">
            <v-icon color="primary" size="30" left>mdi-account-box</v-icon>
            <span class="primary--text">{{ $t('Global.Profile.changeEmail') }}</span>                    
        </v-card-title>
        <v-card-text>
          <v-form ref="changeEmailForm">
            <v-sheet class="relief-outset px-10 py-6">
              <v-row>
                <v-text-field
                    v-model="firstEmail"
                    @input="validate"
                    :label="$t('Global.Profile.enterEmail')+'*'"
                    :rules="[ validEmail ]"
                    required
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                    v-model="secondEmail"
                    @input="validate"
                    :label="$t('Global.Profile.reenterEmail')+'*'"
                    :rules="[ validEmail, matchEmail ]"
                    required
                ></v-text-field>
              </v-row>
            </v-sheet>
          </v-form>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions class="d-flex justify-space-between">
          <v-btn color="blue darken-1" text @click="submitChange" :disabled="!validForm">{{ $t('Global.Profile.save') }}</v-btn>
          <v-btn color="blue darken-1" text @click="cancelDialog">{{ $t('Global.Profile.cancel') }}</v-btn>
        </v-card-actions>
      </v-card>
      <confirm-dialog
          ref="confirmDialog"
          :title="$t('Global.ConfirmDialog.changeEmailTitle')"
          :message="$t('Global.ConfirmDialog.changeEmailMessage')"
      />
    </v-dialog>
  </div>

</template>

<script>

import ConfirmDialog from "@/components/UI/Dialogs/ConfirmDialog"


export default {
    name: "changeMailDialog",
    components: {
        ConfirmDialog
    },
    props: {
        changeDialog: {
            Type: Boolean,
            default: false
        }
    },
    data() {
        return {
            firstEmail: "",
            secondEmail: "",
            validEmail: v => v.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/) ? true : this.$t('Global.FormRules.invalidFormat'),
            matchEmail: v => v === this.firstEmail ? true : this.$t('Global.FormRules.emailError'),
            validForm: false
        }
    },
    methods: {
        validate() {
            if (this.$refs.changeEmailForm.validate())
                this.validForm = true
            else
                this.validForm = false
        },
        cancelDialog() {
            this.firstEmail = ""
            this.secondEmail = ""
            this.$emit('close-dialog')
        },
        async submitChange(){
            this.confirmDialogTitle = this.$t("Global.ConfirmDialog.changeEmailTitle")
            const confirm = await this.$refs.confirmDialog.open()
            if (!confirm) return
            console.log(this.firstEmail)
            this.$emit('reload-profile', this.firstEmail)
            this.cancelDialog()

          // try {
          //   this.setLoader(true)
          //   await this.changeEmail(this.firstEmail)
          //   this.setLoader(false)
          //   await this.launchSnackbar(this.$t("Global.Profile.changeMailOk"),'success','4000','mdi-check-circle')
          //   this.cancelDialog()
          //   this.$emit('reload-profile')
          // }catch (e) {
          //   console.error('[CHANGE_MAIL_DIALOG][submitChange] ERROR:', e)
          //   this.setLoader(false)
          //   if(this.isErrorText(e)){
          //     this.launchSnackbar(this.getErrorText(e), 'error', "2000", 'mdi-alert-octagon')
          //   }
          //   this.cancelDialog()
          // }
        }
    }
}
</script>

<style>

</style>
