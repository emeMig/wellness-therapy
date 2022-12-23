<template>
  <v-app>
    <Snackbar></Snackbar>
    <router-view name="sidebar" v-if="getUser && getUser.category > 1" />
    <router-view name="header" />
    <v-main>
      <transition name="fade" mode="out-in">
        <router-view class="pa-6" />
      </transition>
    </v-main>
    <router-view name="footer" />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Snackbar from '@/components/Snackbar'

export default {
  components: { Snackbar },
  computed: {
    ...mapGetters(["getUser"])
  },
  mounted(){
    console.log(this.$vuetify.application.top)
  }
}
</script>
