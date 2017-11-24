<template>
  <app-my-collection :field="field" v-if="field.type === 0 || field.type === 2"></app-my-collection>
  <app-my-collections :field="field" v-else-if="field.type === 1"></app-my-collections>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '@/types'

import MyCollectionComponent from '@/components/Bookshelf/CollectionContent/MyCollection'
import MyCollectionsComponent from '@/components/Bookshelf/CollectionContent/MyCollections'

export default {
  name: 'collectionContent',
  components: {
    'app-my-collection': MyCollectionComponent,
    'app-my-collections': MyCollectionsComponent
  },
  data () {
    return {
      field: {}
    }
  },
  computed: {
    ...mapGetters({
      myBookshelf: types.BOOKSHELF
    })
  },
  created () {
    this.field = {}
    switch (this.$route.params.collectionName) {
      case 'my-favorite':
        this.field.name = 'favorite' // for the firebase ref
        this.field.type = 0
        break
      case 'my-wishlist':
        this.field.name = 'wishlist' // for the firebase ref
        this.field.type = 0
        break
      case 'my-collections':
        this.field.name = 'collections' // for the firebase ref
        this.field.type = 1
        break
      default:
        this.field.collectionIndex = this.findCollectionIndex(this.$route.params.collectionName)
        this.field.name = 'collections' // for the firebase ref
        this.field.type = 2
        break
    }
  },
  methods: {
    findCollectionIndex (name) {
      const myCollections = this.myBookshelf.collections
      return myCollections.findIndex(item => item.slug === name)
    }
  }
}
</script>

<style scoped>

</style>
