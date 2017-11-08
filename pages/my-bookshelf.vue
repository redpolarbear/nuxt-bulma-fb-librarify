<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <!-- START: aside menu column -->
        <div class="column is-3">
          <app-my-bookshelf-menu
            :myCollections="getCollections"
            :myFavorite="getFavorite"
            :myWishlist="getWishlist">
          </app-my-bookshelf-menu>
        </div>
        <!-- END: aside menu column -->
        <div class="column is-9">
          <div class="box">
            <nav class="level">
              <!-- Left side -->
              <div class="level-left">
                <div class="level-item">
                  <div class="field has-addons">
                    <p class="control">
                      <input class="input" type="text" placeholder="Find a collection">
                    </p>
                    <p class="control">
                      <button class="button">
                        Search
                      </button>
                    </p>
                  </div>
                </div>
              </div>
              <!-- Right side -->
              <div class="level-right">
                <p class="level-item"><a class="button is-success">New</a></p>
              </div>
            </nav>
          </div>
          <nuxt-child />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
// import localStorage from 'localStorage'
import * as types from '@/types'
import MyBookShelfMenuComponent from '@/components/MyBookShelf/Menu'

export default {
  name: 'mybookshelf',
  components: {
    'app-my-bookshelf-menu': MyBookShelfMenuComponent
  },
  async asyncData ({store}) {
    const myCollections = store.dispatch(types.ACTION_LOAD_COLLECTIONS_ASYNC)
    const myFavorite = store.dispatch(types.ACTION_LOAD_FAVORITE_ASYNC)
    const myWishlist = store.dispatch(types.ACTION_LOAD_WISHLIST_ASYNC)
    await Promise.all([myCollections, myFavorite, myWishlist])
  },
  computed: {
    ...mapGetters({
      getCollections: types.COLLECTIONS,
      getFavorite: types.FAVORITE,
      getWishlist: types.WISHLIST,
      getUser: types.USER
    })
  },
  beforeDestroy () {
    this.$store.commit(types.SET_COLLECTIONS, null)
    this.$store.commit(types.SET_FAVORITE, null)
    this.$store.commit(types.SET_WISHLIST, null)
  }
  // async created () {
  //   const myCollections = store.dispatch(types.ACTION_LOAD_COLLECTIONS_ASYNC)
  //   const myFavorite = store.dispatch(types.ACTION_LOAD_FAVORITE_ASYNC)
  //   const myWishlist = store.dispatch(types.ACTION_LOAD_WISHLIST_ASYNC)
  //   await Promise.all([myCollections, myFavorite, myWishlist])
  // }
}
</script>

<style>

</style>
