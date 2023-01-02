<template>
  <v-app-bar
    app
    flat
    v-if="isVisibleHeader"
    v-bind="bindStyle"
  >
    <v-sheet
      color="transparent"
      v-if="isClippedOver || $vuetify.breakpoint.mdAndDown || getUser.category === 1"
    >
      <v-list-item class="pl-0">
        <v-list-item-avatar tile height="40" width="60">
          <img class="drop-shadowed" :src="require('@/assets/logo/WT-logo1.svg')" alt="PCAMI logo" />
        </v-list-item-avatar>
        <v-list-item-content v-if="($vuetify.breakpoint.mdAndUp || getUser.category === 1 && $vuetify.breakpoint.smAndUp)">
          <v-list-item-title class="text-h5"
            ><span class="title-font primary--text text-shadowed">Wellness Therapy</span>
          </v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-action v-if="$vuetify.breakpoint.lgAndUp">
          <v-btn
            v-if="getUser.category > 1 "
            @click.stop="toggleMiniVariant"
            small
            fab
            :class="!bindStyle.color ? 'relief' : ''"
          >
            <v-icon
              :color="!bindStyle.color ? 'primary' : bindStyle.color"
              v-if="isMinSideNav"
              >
                double_arrow
            </v-icon>
            <v-icon
              :color="!bindStyle.color ? 'primary' : bindStyle.color"
              v-else
              >
                menu_open
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-sheet>
    <div v-if="$vuetify.breakpoint.lgAndUp && getUser.category > 1">
      <!-- toggle Mini variant -->
      <v-btn
        @click.stop="toggleMiniVariant"
        small
        fab
        :class="!bindStyle.color ? 'relief' : ''"
        v-if="!isClippedOver"
      >
        <v-icon
          :color="!bindStyle.color ? 'primary' : bindStyle.color"
          v-if="isMinSideNav"
          >double_arrow</v-icon
        >
        <v-icon :color="!bindStyle.color ? 'primary' : bindStyle.color" v-else
          >menu_open</v-icon
        >
      </v-btn>
    </div>
    <v-spacer />

    <!-- abrir navigation drawer -->
    <v-btn
      v-if="($vuetify.breakpoint.mdAndDown && getUser.category > 1)"
      class="mr-3"
      small
      fab
      :class="!bindStyle.color ? 'relief' : ''"
      @click="handleSidenavDrawer()"
    >
      <v-icon :color="!bindStyle.color ? 'primary' : bindStyle.color"
        >menu</v-icon
      >
    </v-btn>

    <!-- abrir Áreas privadas-->
    <v-tooltip content-class='custom-tooltip' bottom>
      <template v-slot:activator="{ on, attrs }">
        <div v-on="on" v-bind="attrs" >
          <v-menu offset-y close-on-click>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" v-if="getUser.category === 1" small fab @click="handleDashboard" class="relief mr-3">
                <v-icon :color="!bindStyle.color ? 'primary' : bindStyle.color">
                  mdi-view-dashboard
                </v-icon>
              </v-btn>
              <v-btn v-on="on" v-else small fab @click="handleAddUser" class="relief mr-3">
                <v-icon :color="!bindStyle.color ? 'primary' : bindStyle.color">
                  mdi-account-plus
                </v-icon>
              </v-btn>
            </template>
          </v-menu>
        </div>
      </template>
      <span v-if="getUser.category === 1" >Mis Contenidos Privados</span>
      <span v-else >Añadir Paciente</span>
    </v-tooltip>

    <!-- abrir búsqueda -->
    <v-tooltip content-class='custom-tooltip' bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="getUser.category === 1" v-on="on" v-bind="attrs" small fab @click="handleSearch" class="relief mr-3">
          <v-icon :color="!bindStyle.color ? 'primary' : bindStyle.color">
            mdi-magnify
          </v-icon>
        </v-btn>
      </template>
      <span>Modo visual</span>
    </v-tooltip>

    <!-- abrir modo visual -->
    <v-tooltip content-class='custom-tooltip' bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-on="on" v-bind="attrs" small fab @click="handleTheme" class="relief mr-3">
          <v-icon :color="!bindStyle.color ? 'primary' : bindStyle.color">
            mdi-theme-light-dark
          </v-icon>
        </v-btn>
      </template>
      <span>Modo visual</span>
    </v-tooltip>


    <!-- abrir mensajes -->
    <v-tooltip content-class='custom-tooltip' bottom>
      <template v-slot:activator="{ on, attrs }">
        <div v-on="on" v-bind="attrs" >
          <v-menu offset-y close-on-click>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" small fab @click="openMessageManager" class="relief mr-3">
                <v-badge
                  :value="getMessages.length"
                  color="secondary"
                  :content="getMessages.length"
                >
                  <v-icon :color="!bindStyle.color ? 'primary' : bindStyle.color">
                    mdi-message-text
                  </v-icon>
                </v-badge> 
              </v-btn>
            </template>
          </v-menu>
        </div>
      </template>
      <span>Mis Mensajes</span>
    </v-tooltip>

    <!-- User Profile Menu -->
    <v-tooltip content-class='custom-tooltip' bottom>
      <template v-slot:activator="{ on, attrs }">
        <div v-on="on" v-bind="attrs" >
          <v-menu offset-y min-width="160">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" small fab class="relief mr-3">
                <v-icon :color="!bindStyle.color ? 'primary' : bindStyle.color">
                  mdi-account
                </v-icon>
              </v-btn>
            </template>
            <v-list nav class="relief-primary with-radius">
              <template>
                <v-list-item v-for="(item, index) in menuProfile" :key="index" @click="item.action" class="ma-0" >
                  <v-list-item-icon class="pl-2 mr-5">
                    <v-icon class="pa-0" v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="ma-0 pa-0">
                    <v-list-item-title><p class="ma-0 pa-0">{{ item.text }}</p></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-menu>
        </div>
      </template>
      <span>Mi Perfil</span>
    </v-tooltip>
    
    <!-- User Info -->
    <v-sheet class="mx-7" color="transparent"  v-if="$vuetify.breakpoint.mdAndUp">
      <v-row class="truncate-text">
        <p class="ma-0 pa-0">
          <span>{{ $t('Global.Main.welcome') }} </span>
        </p>
      </v-row>
      <v-row >
        <span class="font-weight-bold">{{ getUser.email }}</span>
      </v-row>
    </v-sheet>
    <confirm-dialog
      ref="confirmDialog"
      :title="confirmDialogTitle"
      :message="confirmDialogMessage"
    />
    <profile-card
      v-if="profileView"
      :activate="profileView"
      @close-profile="profileView=false"
    />
    <!-- Dialogs -->
    <message-manager-dialog :activate="messageManager" :items="getUser.messages" @close-dialog="messageManager=false"></message-manager-dialog>
  </v-app-bar>
</template>

<script>

import moment from "moment"
import { mapGetters, mapActions } from 'vuex'
import { availableLocale } from "@/config/locale";
// import AuthApi from "@/mixins/Services/AuthApi";
// import logoutSession from "@/mixins/Logout";
import ConfirmDialog from "@/components/UI/Dialogs/ConfirmDialog";
import ProfileCard from "./ProfileCard.vue"
import messageManagerDialog from '@/components/UI/Dialogs/MessageManagerDialog.vue';

export default {
  name: "Toolbar",
  components: {
    ConfirmDialog,
    messageManagerDialog,
    ProfileCard
  },
  props: {
    handleSettingsDrawer: Function,
  },
  // mixins: [AuthApi, logoutSession],
  data() {
    return {
      // user: userData,
      // receivedMessages: "3",
      menuProfile: [
        { icon: "person", text: this.$t("Global.Main.profileMenu"), action: () => { this.profileView=true } },
        { icon: "power_settings_new", text: this.$t("Global.Main.logoutMenu"), action: () => this.handleLogout() }
      ],
      // menuMessages: [
      //   { icon: "inbox", text: 'Mensajes recibidos', action: () => { this.openMessageManager() } },
      //   { icon: "mdi-message-arrow-right-outline", text: 'Enviar Mensaje', action: () => '' }
      // ],
      confirmDialogTitle: "",
      confirmDialogMessage: null,
      profileView: false,
      langs: availableLocale,
      messageManager: false
    };
  },
  computed: {  
    activeItemStyle: (state) => state.activeMenuStyle,
    ...mapGetters("navigations", [
      "isVisibleHeader",
      "isSidenavPostionRight",
      "isClippedOver",
      "isMinSideNav",
      "isDense",
      "isProminent",
      "isHideOnScroll",
      "isShrinkOnScroll",
      "isFloating",
    ]),

    ...mapGetters(["getUser", "getMessages"]),

    ...mapGetters(["locale"]),
    formatPreviousAccessDateTime() {
      return this.getPreviousAccessDateTime ? moment(this.getPreviousAccessDateTime).format('DD-MM-YYYY hh:mm') : 'no time'
    },

    bindStyle() {
      return {
        class: {
          "fs-header": true,
          "with-radius": true,
          "relief": true,
          "mx-6 mt-3": this.isFloating && !this.isClippedOver,
        }
      };
    },
    currentLocaleImg() {
      return this.langs.find((item) => item.value === this.locale).img;
    },
  },
  methods: {
    ...mapActions(["logoutSession"]),
    openMessageManager() {
      this.messageManager = true
    },
    toggleMiniVariant() {
      this.$store.dispatch("navigations/setMiniVariant");
    },
    handleSidenavDrawer() {
      this.$store.dispatch("navigations/setSidenavVisibility");
    },
    handleDashboard(){
      this.$router.push('/myareas')
    },
    handleSearch(){
      this.$router.push('/buscador')
    },
    handleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    handleInternationalization(value) {
      this.$store.dispatch("setLocale", value)
    },
    handleAddUser() {
      console.log('addUser');
    },
    async handleLogout() {
      this.confirmDialogTitle = this.$t("Global.ConfirmDialog.logoutTitle")
      this.confirmDialogMessage = this.$t("Global.ConfirmDialog.logoutMessage")
      const response = await this.$refs.confirmDialog.open()
      if (response) {
        this.logoutSession()
        .then (() => this.$router.push({name: 'Login'}))
      }
    }
  }
};
</script>

