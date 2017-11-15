<template>
  <div class="modal" v-bind:class="{ 'is-active': showNewBookModal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ collection.name }}</p>
        <button class="delete" aria-label="close" @click="onDismissModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="field has-addons has-addons-centered">
          <p class="control"><a class="button is-static is-large"><span class="icon is-medium"><i class="fa fa-barcode fa-lg"></i></span></a></p>
          <p class="control">
            <input class="input is-large" type="text" placeholder="ISBN10 or ISBN13" v-model="isbnCode">
          </p>
          <p class="control">
            <button class="button is-large">
              <span class="icon is-medium">
                <i class="fa fa-camera fa-lg"></i>
              </span>
            </button>
          </p>
        </div>
        <p class="has-text-centered">
          <a class="button is-info is-medium" @click.prevent="searchBook" v-bind:disabled="$v.isbnCode.$invalid">
            <span>Search</span>
          </a>
        </p>
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
import validator from 'validator'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import * as types from '@/types'

import BookInfoBoxComponent from '@/components/MyBookshelf/BookInfobox'

export default {
  name: 'newBookModal',
  mixins: [ validationMixin ],
  components: {
    'app-bookinfo-box': BookInfoBoxComponent
  },
  data () {
    return {
      isbnCode: ''
    }
  },
  validations: {
    isbnCode: {
      required
    }
  },
  props: [ 'collection', 'showNewBookModal' ],
  methods: {
    async searchBook () {
      if (validator.isISBN(this.isbnCode.trim())) {
        await this.$store.dispatch(types.ACTION_SEARCH_BOOK_BY_ISBN_ASYNC, { isbn: this.isbnCode.trim() })
      }
    },
    async onSaveBookIntoCollection () {
      // console.log(this.collection.uid)
      await this.$store.dispatch(types.ACTION_SAVE_THE_BOOK_INTO_COLLECTION_IN_FB, { collectionUid: this.collection.uid })
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
