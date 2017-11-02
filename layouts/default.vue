<template>
  <div>
    <app-navigation></app-navigation>
    <nuxt/>
  </div>
</template>

<script>
import NavigationComponent from '@/components/Shared/Navigation'

export default {
  name: 'defaultLayout',
  components: {
    'app-navigation': NavigationComponent
  }
}
</script>

<style>

</style>
