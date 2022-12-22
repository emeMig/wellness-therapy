// src/plugins/vuetify.js

import Vue from "vue"
import Vuetify from "vuetify/lib"
import colors from "vuetify/es5/util/colors"
import "material-design-icons-iconfont/dist/material-design-icons.css"
import "@mdi/font/css/materialdesignicons.css"
import es from 'vuetify/lib/locale/es'
import store from "@/store"
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md'
  },
  lang: {
    locales: { es },
    current: 'es'
  },
  rtl: store.state.scheme.theme.rtl,
  theme: {
    dark: store.state.scheme.theme.dark,
    default: "light",
    disable: false,
    options: {
      cspNonce: undefined,
      customProperties: true,
      minifyTheme: undefined,
      themeCache: undefined,
    },
    themes: {
      light: {
        primary: store.state.scheme.theme.primary.base,
        secondary: store.state.scheme.theme.secondary.base,
        accent: colors.deepPurple.accent2,
        error: colors.red.accent4,
        info: colors.blue.lighten1,
        success: colors.green.accent4,
        warning: colors.amber.darken2,
        background: "#f7f7f7", // #ECF0F3
        relief: {
          base: "#f7f7f7",
          darken1: "#DDE4EF", // rgba(210, 218, 230, 0.6)
          lighten1: "#FFFFFF", // rgba(255, 255, 255, 0.6)
        },
        primaryBgText: store.state.scheme.theme.primaryBgText,
        secondaryBgText: store.state.scheme.theme.secondaryBgText,
      },
      dark: {
        primary: store.state.scheme.theme.primary,
        secondary: store.state.scheme.theme.secondary.base,
        accent: colors.deepPurple.accent2,
        error: colors.red.accent4,
        info: colors.blue.lighten1,
        success: colors.green.accent4,
        warning: colors.amber.darken2,
        background: "#292D32",
        relief: {
          base: "#292D32",
          darken1: "#1d1f23", // rgba(210, 218, 230, 0.6)
          lighten1: "#3e4247", // rgba(255, 255, 255, 0.6)
        },
        primaryBgText: store.state.scheme.theme.primaryBgText,
        secondaryBgText: store.state.scheme.theme.secondaryBgText,
      },
    },
  },
});


// import Vue from 'vue'
// import Vuetify from 'vuetify'
// // import 'vuetify/dist/vuetify.min.css'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import colors from 'vuetify/lib/util/colors'
// import es from 'vuetify/es5/locale/es'
// import en from 'vuetify/es5/locale/en'

// Vue.use(Vuetify)

// export default new Vuetify({
//   icons: {
//     iconfont: 'md'
//   },
//   lang: {
//     locales: { en, es },
//     current: 'es'
//   },
//   theme: {
//     themes: {
//       light: {
//         primary: colors.blue.darken4
//       }
//     }
//   }
// })
