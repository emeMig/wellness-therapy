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
    <overlay :overlay="getOverlay"></overlay> 
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Snackbar from '@/components/Snackbar'
import Overlay from '@/components/Overlay'

export default {
  components: { Snackbar, Overlay },
  computed: {
    ...mapGetters(["getUser", "getOverlay"])
  },
  methods: {
    ...mapActions(["loadLocalStorage"])
  },
  created(){
    this.loadLocalStorage()
  }

}
</script>
