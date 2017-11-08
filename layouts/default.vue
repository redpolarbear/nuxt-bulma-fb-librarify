<template>
  <div>
    <app-navigation></app-navigation>
    <nuxt/>
  </div>
</template>

<script>
import NavigationComponent from '@/components/Shared/Navigation'
// import * as firebase from 'firebase'
// import * as types from '@/types'

export default {
  name: 'defaultLayout',
  components: {
    'app-navigation': NavigationComponent
  }
  // created () {
  //   const fbConfig = {
  //     apiKey: 'AIzaSyBp-VoO4yMdfcJjHeG8rCLYmlovp634-yY',
  //     authDomain: 'vuejs-firebase-01-55b96.firebaseapp.com',
  //     databaseURL: 'https://vuejs-firebase-01-55b96.firebaseio.com',
  //     projectId: 'vuejs-firebase-01-55b96',
  //     storageBucket: 'vuejs-firebase-01-55b96.appspot.com',
  //     messagingSenderId: '687212823219'
  //   }
  //   !firebase.apps.length ? firebase.initializeApp(fbConfig) : firebase.app()
  //   // firebase.initializeApp(fbConfig)
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       this.$store.dispatch(types.ACTION_AUTO_SIGNIN, user)
  //     }
  //   })
  // }
}
</script>

<style>

</style>
