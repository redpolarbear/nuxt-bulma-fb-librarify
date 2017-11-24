<template>
  <section class="section">
    <div class="box" v-if="getBookInfo">
      <article class="media">
        <div class="media-left">
          <figure class="image" v-if="getBookInfo.imageLinks['thumbnail']">
            <img :src="getBookInfo.imageLinks['thumbnail']">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <h4>
              <strong>{{getBookInfo.title}}<span v-if="getBookInfo.subtitle">: {{getBookInfo.subtitle}}</span></strong><br>
            </h4>
            <p v-if="getBookInfo.authors">by {{ getBookInfo.authors ? getBookInfo.authors.join(', ') : null }} <span class="has-text-grey"> (Author)</span></p>
            <ul style="list-style-type: none; margin-left: 0px; font-size: 15px;">
              <li v-if="getBookInfo.pageCount"><strong>Pages:</strong> {{getBookInfo.pageCount}}</li>
              <li v-if="getBookInfo.publisher && getBookInfo.publishedDate"><strong>Publisher:</strong> {{getBookInfo.publisher}} <span class="has-text-grey">({{ getBookInfo.publishedDate}})</span></li>
              <li v-if="language"><strong>Language:</strong> {{language}}</li>
              <li v-if="getBookInfo.isbn10"><strong>ISBN10:</strong> {{getBookInfo.isbn10}}</li>
              <li v-if="getBookInfo.isbn13"><strong>ISBN13:</strong> {{getBookInfo.isbn13}}</li>
              <li v-if="dimensions"><strong>Product Dimensions:</strong> {{ dimensions }}</li>
              <!-- <li><strong>Description:</strong>
                <p v-html="getBookInfo.description" class="has-text-grey"></p>
              </li> -->
            </ul>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import ISO6391 from 'iso-639-1'
import _ from 'lodash'
import { mapGetters } from 'vuex'
import * as types from '@/types'

export default {
  name: 'bookInfoBox',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      getBookInfo: types.BOOK_INFO
    }),
    language: function () {
      return this.getBookInfo.language ? ISO6391.getName(this.getBookInfo.language) : null
    },
    dimensions: function () {
      if (_.size(this.getBookInfo.dimensions) === 3) {
        const height = this.getBookInfo.dimensions.height.substr(0, this.getBookInfo.dimensions.height.length - 3)
        const width = this.getBookInfo.dimensions.width.substr(0, this.getBookInfo.dimensions.width.length - 3)
        const thickness = this.getBookInfo.dimensions.thickness.substr(0, this.getBookInfo.dimensions.thickness.length - 3)
        // console.log(height)
        return width + ' x ' + height + ' x ' + thickness + ' cm'
      } else {
        return null
      }
    }
  }
}
</script>

<style scoped>

</style>
