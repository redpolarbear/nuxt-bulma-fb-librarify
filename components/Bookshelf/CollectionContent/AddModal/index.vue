<template>
  <div class="modal" v-bind:class="{ 'is-active': showNewBookModal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-justified is-flex">
          <span class="icon is-medium"><i class="fa fa-folder-open fa-lg" aria-hidden="true"></i></span>&nbsp;{{ collection.name }}</p>
        <button class="delete" aria-label="close" @click="onDismissModal"></button>
      </header>
      <section class="modal-card-body">
        <app-book-search></app-book-search>
        <app-bookinfo-box></app-bookinfo-box>
      </section>
      <footer class="modal-card-foot is-inline-block has-text-right">
        <button class="button" @click="onDismissModal">Cancel</button>
        <button class="button is-success" @click="onSaveBookIntoCollection">Save</button>
      </footer>
    </div>
  </div>
</template>

<script>
import * as types from '@/types'

import BookInfoBoxComponent from './BookInfobox'
import BookSearchComponent from './BookSearch'

export default {
  name: 'newBookModal',
  components: {
    'app-bookinfo-box': BookInfoBoxComponent,
    'app-book-search': BookSearchComponent
  },
  props: [ 'collection', 'showNewBookModal' ],
  methods: {
    async onSaveBookIntoCollection () {
      switch (this.collection.slug) {
        case 'my-favorite':
          await this.$store.dispatch(types.ACTION_SAVE_THE_BOOK_INTO_FAVORITE_IN_FB)
          break
        case 'my-wishlist':
          await this.$store.dispatch(types.ACTION_SAVE_THE_BOOK_INTO_WISHLIST_IN_FB)
          break
        default:
          await this.$store.dispatch(types.ACTION_SAVE_THE_BOOK_INTO_COLLECTION_IN_FB, { collectionUid: this.collection.uid })
          break
      }
    },
    onDismissModal () {
      this.$emit('dismissNewBookModal', false)
      this.$store.commit(types.SET_BOOK_INFO, null)
      this.isbnCode = null
    }
  }
}
</script>

<style>

</style>
