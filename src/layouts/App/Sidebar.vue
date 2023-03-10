<template>
  <v-navigation-drawer
    
    app
    width="260"
    id="app-drawer"
    v-model="drawer"
    enable-resize-watcher
    floating
    mini-variant-width="70"
    class="fs-sidebar"
    :mini-variant="isMinSideNav"
    :expand-on-hover="isMinSideNav"
    :clipped="isClippedOver"
    :dark="semidark"
    :class="!semidark ? 'relief' : ''"
  >
    <!-- App Logo -->
    <v-list-item
      v-if="!isClippedOver"
      :class="{ 'logo-section': true, 'semi-dark': semidark }"
      class="ml-n2 d-flex align-center flex-column" 
      id="nav-title"     
    >
      <v-list-item-avatar tile :height="!isMinSideNav ? 90 : 35" width="140" class="py-0 pl-2 mx-2 mb-0">
        <img :src="require('@/assets/logo/WT-logo1.svg')" alt="PCAMI logo" class="drop-shadowed" />
      </v-list-item-avatar>
      <v-list-item-content v-if="!isMinSideNav" class="py-0 my-0">
        <v-list-item-title class="mx-0 px-0 text-h4 primary--text">
          <h5 class="text-shadowed title-font">{{ $t('Global.Main.appName') }}</h5>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-sheet color="transparent" :height="!isMinSideNav ? 160 : 70" />

    <v-list
      dense
      v-bind="{ ...activeItemStyle }"
      expand="expand"
      class="nav-drawer transparent"
      id="app-sidebar"
    >
      <template v-for="(item, i) in itm">
        <ListGroup v-bind="item" :key="i" v-if="item.items" class="pr-0 pl-2"/>
        <v-subheader
          v-else-if="item.header"
          class="heading-text ml-2 nav-subheader"
          :key="`${i}-item`"
          :class="{ 'mt-3': i !== 0 }"
        >
          <v-icon class="ml-n1">more_horiz</v-icon>
          <span>
            <h3>{{ item.header }}</h3>
          </span>
        </v-subheader>
        <NavigationItem v-else :key="`si-${i}`" v-bind="item" class="pr-0 pl-2"/>
      </template>
      <v-spacer class="mb-5"></v-spacer>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
import ListGroup from "@/components/UI/NavigationItems/ListGroup";
import NavigationItem from "@/components/UI/NavigationItems/NavigationItem";
import has from "lodash/has";

export default {
  components: {
    ListGroup,
    NavigationItem,
  },
  data() {
    return {
      key: 'data'
    };
  },
  computed: {
    activeItemStyle: (state) => state.activeMenuStyle,
    ...mapGetters("navigations", [
      "isVisibleSideNav",
      "isMinSideNav",
      "activeItemStyle",
      "isClippedOver",
    ]),
    ...mapGetters("scheme", ["semidark"]),
    ...mapGetters(["getPatients"]),
    activemenu() {
      return this.$vuetify.theme.activemenu;
    },
    drawer: {
      get() {
        return this.isVisibleSideNav;
      },
      set(value) {
        this.$store.dispatch("navigations/setSidenavVisibility", value);
      },
    },
    patientsMenu() {
      if (this.getPatients.length > 0) {
        const patientsMenu = this.getPatients.map ( patient => {
          return {
            name: patient.id,
            title: patient.name,
            
            prependIcon: 'mdi-account-supervisor-circle',
            icon: 'mdi-account-check',
            i18n: patient.name
          }
        })
      return patientsMenu

      } else return []
    },
    items() {
      const items =[
        { icon: "mdi-view-dashboard", 
          title: "PrivateArea", 
          name: "PrivateArea", 
          i18n: "Mi ??rea Privada" 
        },
        {
          title: "Pacientes",
          group: "pacientes",
          icon: "mdi-account-supervisor-circle",
          i18n: "Mis Pacientes",
          items: this.patientsMenu,
        },
      ]
      return items 
    },
    itm() {
      return this.items.map(this.addLanguagePrefix);
    },
  },
  methods: {
    addLanguagePrefix(item) {
      const { items, ...props } = item;
      const newVal = has(props, "header")
        ? { header: item.i18n }
        : { title: item.i18n };
      const newItem = {
        ...props,
        ...newVal,
      };

      if (items) {
        newItem.items = items.map(this.addLanguagePrefix);
      }

      return newItem;
    },
  }
}
</script>
<style>
  #nav-title:after {
    display:none !important;
  }
</style>

