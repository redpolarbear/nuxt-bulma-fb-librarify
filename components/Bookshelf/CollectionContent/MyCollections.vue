<template>
  <div>
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
          <p class="level-item">
            <button class="button is-info" @click="toggleAddCollectionModal"><span class="icon"><i class="fa fa-plus-circle"></i></span><span>Add</span></button>
            <app-add-collection-modal
              :showAddCollectionModal="showAddCollectionModal"
              :collection="collectionItem"
              @dismissAddCollectionModal="dismissCollectionModal"></app-add-collection-modal>
          </p>
              <!-- @dismissAddCollectionModal="showAddCollectionModal=$event"></app-add-collection-modal> -->
        </div>
      </nav>
    </div>
    <section class="secion">
      <div class="columns is-multiline">
        <div class="column is-narrow is-one-third" v-for="(item, index) in content.collections" :key="item.uid">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                <span class="icon">
                  <i class="fa fa-folder" aria-hidden="true"></i>
                </span>&nbsp;
                {{ item.name }}
              </p>
              <p class="card-header-icon">
                <span class="card-header-icon-books-number">
                  {{ item.meta.booksNo }}
                </span>
              </p>
              <!-- <a href="#" class="card-header-icon" aria-label="more options">
                <span class="icon">
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
                </span>
              </a> -->
            </header>
            <div class="card-content">
              <div class="content is-size-7">
                {{ item.desc }}
                <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. -->
                <!-- <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> -->
              </div>
            </div>
            <footer class="card-footer">
              <nuxt-link :to="`/my-bookshelf/${item.slug}`" class="card-footer-item">
                <span class="icon">
                  <i class="fa fa-folder-open-o fa-lg" aria-hidden="true"></i>
                </span>
              </nuxt-link>
              <a class="card-footer-item" v-bind:class="{'is-disabled': item.slug === 'my-reading-collection' || item.slug === 'my-have-read-collection'}" @click="editCollection(item, index)">
                <span class="icon">
                  <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
                </span>
              </a>
              <a class="card-footer-item" v-bind:class="{
                'is-disabled': item.slug === 'my-reading-collection' || item.slug === 'my-have-read-collection' || item.meta.booksNo > 0,
                'has-text-danger': item.slug !== 'my-reading-collection' && item.slug !== 'my-have-read-collection'}">
                <span class="icon">
                  <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
                </span>                
              </a>
            </footer>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '@/types'
import AddCollectionModalComponent from '@/components/Bookshelf/CollectionContent/AddCollectionModal'

export default {
  name: 'myCollections',
  data () {
    return {
      showAddCollectionModal: false,
      collectionItem: {
        name: '',
        desc: ''
      }
    }
  },
  components: {
    'app-add-collection-modal': AddCollectionModalComponent
  },
  props: [ 'field' ],
  computed: {
    ...mapGetters({
      myBookshelf: types.BOOKSHELF
    }),
    content () {
      if (this.field.type === 1) { // collections
        return { collections: this.myBookshelf[this.field.name] } // { key: array[] }
      }
    }
  },
  methods: {
    toggleAddCollectionModal () {
      this.showAddCollectionModal = !this.showAddCollectionModal
    },
    editCollection (item, index) {
      this.collectionItem = Object.assign({ index }, item)
      this.showAddCollectionModal = !this.showAddCollectionModal
    },
    dismissCollectionModal (event) {
      this.showAddCollectionModal = event
      this.collectionItem = {
        name: '',
        desc: ''
      }
    }
  }
}
</script>

<style scoped>
.card-header-icon {
  cursor: auto;
}
span.card-header-icon-books-number {
  background-color: rgb(255, 56, 96);
  border-radius: 0.5rem;
  color: #fff;
  display: inline-block;
  padding-left: 8px;
  padding-right: 8px;
  text-align: center;
}
a.is-disabled {
  color: rgba(0, 0, 0, 0.7);
  pointer-events: none;
  opacity: 0.7;
}
</style>