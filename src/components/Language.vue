<template>
  <v-menu bottom offset-y transition="slide-y-transition">
    <template slot="activator" slot-scope="{ on }">
      <v-btn text v-on="on" class='transparent' :light="light" :dark="dark" :color="color">
        {{$i18n.locale}}
        <v-icon right>outlined_flag</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="lang in languages"
        :key="lang"
        active-class="highlighted"
        :class="$i18n.locale === lang ? 'font-weight-bold' : ''"
        @click="changeLang(lang)">
        <v-list-item-title>{{ $t("languages." + lang) }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>

import { loadLanguageAsync } from '@/plugins/i18n'

export default {
  name: 'languageSelector',
  props: {
    dark: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      languages: ['en', 'es']
    }
  },
  methods: {
    changeLang (lang) {
      loadLanguageAsync(lang)
      this.$vuetify.lang.current = lang
    }
  }
}
</script>

<style scoped>

</style>
