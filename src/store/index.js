import Vue from 'vue'
import Vuex from 'vuex'
import user from "./modules/user";
import sidebar from "./modules/sidebar";
import header from "./modules/header";
import translation from "./modules/translation";
import notifications from "./modules/notifications";
import theme from "./modules/theme";
import loader from "./modules/loader"
import auth from '@/store/modules/auth'
import snackbar from '@/store/modules/snackbar'
import search from '@/store/modules/search'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user,
    search,
    snackbar,
    navigations: {
      namespaced: true,
      modules: {
        header,
        sidebar
      },
    },
    scheme: {
      namespaced: true,
      modules: {
        theme,
      },
    },
    translation,
    notifications,
    loader
  }
})
