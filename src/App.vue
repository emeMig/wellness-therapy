<template>
  <v-app>
    <Snackbar></Snackbar>
    <router-view name="sidebar" />
    <router-view name="header" />
    <v-main >
      <transition name="fade" mode="out-in">
        <router-view class="pa-6" />
      </transition>
    </v-main>
    <router-view name="footer" />
  </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar'

export default {
  components: { Snackbar }
}
</script>
