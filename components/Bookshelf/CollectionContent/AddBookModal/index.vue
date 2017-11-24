<template>
  <div class="modal" v-bind:class="{ 'is-active': showAddBookModal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-justified is-inline-flex">
          <span class="icon is-medium"><i class="fa fa-folder-open fa-lg" aria-hidden="true"></i></span>&nbsp;{{ collection.name }}</p>
        <button class="delete" aria-label="close" @click="onDismissModal"></button>
      </header>
      <section class="modal-card-body">
        <app-book-search></app-book-search>
        <app-bookinfo-box></app-bookinfo-box>
      </section>
      <footer class="modal-card-foot is-inline-block has-text-right">
        <button class="button" @click="onDismissModal">Cancel</button>
        <button class="button is-success" @click="onSaveBookIntoCollection" v-bind:disabled="!getBookInfo">Save</button>
      </footer>
    </div>
  </div>
</template>

<script>
import * as types from '@/types'
import { mapGetters } from 'vuex'

import BookInfoBoxComponent from './BookInfobox'
import BookSearchComponent from './BookSearch'

export default {
  name: 'addBookModal',
  computed: {
    ...mapGetters({
      getBookInfo: types.BOOK_INFO
    })
  },
  components: {
    'app-bookinfo-box': BookInfoBoxComponent,
    'app-book-search': BookSearchComponent
  },
  props: [ 'collection', 'showAddBookModal' ],
  methods: {
    async onSaveBookIntoCollection () {
      switch (this.collection.slug) {
        case 'my-favorite':
          await this.$store.dispatch(types.ACTION_SAVE_ONE_BOOK_INTO_FAVORITE_IN_FB)
          break
        case 'my-wishlist':
          await this.$store.dispatch(types.ACTION_SAVE_ONE_BOOK_INTO_WISHLIST_IN_FB)
          break
        default:
          await this.$store.dispatch(types.ACTION_SAVE_ONE_BOOK_INTO_COLLECTION_IN_FB, { collectionUid: this.collection.uid })
          break
      }
      this.onDismissModal()
    },
    onDismissModal () {
      this.$emit('dismissAddBookModal', false)
      this.$store.commit(types.SET_BOOK_INFO, null)
      this.$store.commit(types.SET_ISBN_CODE, null)
    }
  }
}
</script>

<style>

</style>
