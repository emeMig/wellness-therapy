<template>
    <v-dialog
        v-model="activate"
        max-width="400px"
        overlay-opacity=.05
        persistent
        content-class="profile-dialog"
    >
        <v-card class="relief">
            <v-toolbar class="relief">
                <v-toolbar-title class="ml-3 mt-1">
                    <v-icon color="primary" size="32" left>mdi-account-box</v-icon>
                    <span class="primary--text">{{ $t('Global.Profile.userProfile') }}</span> 
                </v-toolbar-title>
            </v-toolbar>                  
            <v-card-text class="pa-0 mt-2 mb-4">
                <v-row class="ma-0 mb-n8">
                    <v-col cols="6">
                        <v-list-item two-line >
                            <v-list-item-content>
                                <v-list-item-title><p class="font-weight-bold">{{ $t('Global.Profile.firstName') }}</p></v-list-item-title>
                                <v-list-item-subtitle><p>{{ getUser.nombre }}</p></v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                    <v-col cols="6">
                        <v-list-item two-line >
                            <v-list-item-content>
                                <v-list-item-title><p class="font-weight-bold">{{ $t('Global.Profile.lastName') }}</p></v-list-item-title>
                                <v-list-item-subtitle><p>{{ getUser.apellidos }}</p></v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                </v-row>    
                <!-- <v-row class="ma-0 mb-n8">
                    <v-col cols="6">
                        <v-list-item two-line >
                            <v-list-item-content>
                                <v-list-item-title><p class="font-weight-bold">{{ $t('Global.Profile.role') }}</p></v-list-item-title>
                                <v-list-item-subtitle><p>{{ getUser.rol }}</p></v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                    <v-col cols="6">
                        <v-list-item two-line >
                            <v-list-item-content>
                                <v-list-item-title><p class="font-weight-bold">{{ $t('Global.Profile.phone') }}</p></v-list-item-title>
                                <v-list-item-subtitle><p>{{ getUser.telefono }}</p></v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                </v-row> -->
                <v-row class="ma-0 mb-n4">
                    <v-col>
                        <v-list-item two-line >
                            <v-list-item-content>
                                <v-list-item-title><p class="font-weight-bold">{{ $t('Global.Profile.email') }}</p></v-list-item-title>
                                <v-list-item-subtitle>
                                    <p>{{ computedMail }}
                                        <v-icon class="ml-6" dense color="primary" @click="changeDialog=true">mdi-square-edit-outline</v-icon>
                                    </p>
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-row class="ml-n2 mb-3 d-flex justify-space-between">
                    <v-btn color="blue darken-1" text @click="changePassword"> {{ $t('Global.Profile.changePassword') }} </v-btn>
                    <v-btn color="blue darken-1" text @click="$emit('close-profile')"> {{ $t('Global.Profile.close') }}</v-btn>
                </v-row>
            </v-card-actions>
        </v-card>
        <change-mail-dialog
            :changeDialog= "changeDialog"
            @close-dialog="changeDialog=false"
            @close-all="$emit('close-profile')"
            @reload-profile="updateMail"
        />
    </v-dialog>
</template>

<script>
// import userData from '@/utils/data/user-sample.json'
import { mapGetters } from 'vuex'
import ChangeMailDialog from '@/components/UI/Dialogs/ChangeMailDialog'

export default {
    name: "ProfileCard",
    components: {
        ChangeMailDialog
    },
    props: {
        activate: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // user: userData,
            // userMail: this.getUser.email,
            changeDialog: false
        }
    },
    computed: {
        ...mapGetters(["getUser"]),
        computedMail() {
            return this.getUser.email        
        }
    },
    methods: {
        changePassword() {
            console.log('change password');
        },
        updateMail(mail) {
            this.userMail = mail
        }
    }
}
</script>
