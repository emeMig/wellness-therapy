import Vue from 'vue'
import App from '@/App.vue'
import router from './router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import './sass/main.scss'
import { createI18n } from '@/i18n'
import './registerServiceWorker'


const i18n = createI18n(store.state.translation.locale).i18n

Vue.config.productionTip = false

// import { auth } from './firebase'

// auth.onAuthStateChanged(user => {
//   if (user) {
//     store.dispatch("detectUser", {
//       email: user.email,
//       uid: user.uid
//     })
//   }
//   else 
//     store.dispatch("detectUser", user) 
//   })

// render vue app
export const app = new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");





