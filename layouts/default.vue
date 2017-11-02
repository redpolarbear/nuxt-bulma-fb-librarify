<template>
  <div>
    <app-navigation></app-navigation>
    <nuxt/>
  </div>
</template>

<script>
import NavigationComponent from '@/components/Shared/Navigation'
import * as types from '@/types'

export default {
  name: 'defaultLayout',
  components: {
    'app-navigation': NavigationComponent
  },
  created () {
    this.$firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch(types.ACTION_AUTO_SIGNIN, user)
      }
    })
  }
}
</script>

<style>

</style>
