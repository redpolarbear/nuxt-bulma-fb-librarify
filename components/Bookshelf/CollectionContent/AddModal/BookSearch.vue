<template>
  <section>
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
      <button class="button is-info is-medium" @click="searchBook" v-bind:disabled="!isbnCode">
        <span>Search</span>
      </button>
    </p>
  </section>
</template>

<script>
import * as types from '@/types'
import validator from 'validator'

export default {
  name: 'bookSearch',
  data () {
    return {
    }
  },
  computed: {
    isbnCode: {
      get () {
        return this.$store.getters[types.ISBN_CODE]
      },
      set (value) {
        this.$store.commit(types.SET_ISBN_CODE, value)
      }
    }
  },
  methods: {
    async searchBook () {
      if (validator.isISBN(this.isbnCode.trim())) {
        await this.$store.dispatch(types.ACTION_SEARCH_BOOK_BY_ISBN_ASYNC, { isbn: this.isbnCode.trim() })
      } else {
        console.log('illegal isbn code.')
      }
    }
  }
}
</script>

<style>

</style>
