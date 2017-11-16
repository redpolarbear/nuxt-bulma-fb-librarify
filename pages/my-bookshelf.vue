<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <!-- START: aside menu column -->
        <div class="column is-3">
          <app-bookshelf-menu
            :myBookshelf="myBookshelf">
          </app-bookshelf-menu>
        </div>
        <!-- END: aside menu column -->
        <div class="column is-9">
          <nuxt-child :key="$route.params.collectionName"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
// import localStorage from 'localStorage'
import * as types from '@/types'
import BookShelfMenuComponent from '@/components/Bookshelf/BookshelfMenu'

export default {
  name: 'mybookshelf',
  components: {
    'app-bookshelf-menu': BookShelfMenuComponent
  },
  async asyncData ({store}) {
    await store.dispatch(types.ACTION_LOAD_MY_BOOKSHELF_ASYNC)
    // const myCollections = store.dispatch(types.ACTION_LOAD_MY_COLLECTIONS_ASYNC)
    // const myFavorite = store.dispatch(types.ACTION_LOAD_MY_FAVORITE_ASYNC)
    // const myWishlist = store.dispatch(types.ACTION_LOAD_MY_WISHLIST_ASYNC)
    // await Promise.all([myCollections, myFavorite, myWishlist])
    // store.commit(types.SET_BOOKSHELF)
  },
  computed: {
    ...mapGetters({
      myBookshelf: types.BOOKSHELF
    })
  },
  beforeDestroy () {
    this.$store.commit(types.SET_COLLECTIONS, null)
    this.$store.commit(types.SET_FAVORITE, null)
    this.$store.commit(types.SET_WISHLIST, null)
    this.$store.commit(types.SET_BOOKSHELF)
  }
}
</script>

<style>

</style>
