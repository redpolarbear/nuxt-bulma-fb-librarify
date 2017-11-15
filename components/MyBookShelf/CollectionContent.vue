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
          <p class="level-item" v-if="content.type === 0">
            <button class="button is-primary" @click="toggleNewBookModal"><span class="icon"><i class="fa fa-plus-circle"></i></span><span>Add</span></button>
            <app-new-book-modal
              :showNewBookModal="showNewBookModal" 
              @dismissNewBookModal="showNewBookModal=$event"
              :collection="content"></app-new-book-modal>
          </p>
          <p class="level-item" v-else-if="content.type === 1">
            <button class="button is-info"  @click="toggleNewCollectionModal"><span class="icon"><i class="fa fa-plus-circle"></i></span><span>Add</span></button>
            <app-new-collection-modal 
              :showNewCollectionModal="showNewCollectionModal"
              @dismissNewCollectionModal="showNewCollectionModal=$event"></app-new-collection-modal>
          </p>
        </div>
      </nav>
    </div>
    this is from component {{ $route.params.collectionName }}
    {{ content }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '@/types'

import NewBookModalComponent from './NewBook'
import NewCollectionModalComponent from './NewCollection'

export default {
  name: 'collectionContent',
  components: {
    'app-new-book-modal': NewBookModalComponent,
    'app-new-collection-modal': NewCollectionModalComponent
  },
  data () {
    return {
      content: {
        type: 0 // type: 0 -> collection opened; type: 1 -> collections opened
      },
      showNewBookModal: false,
      showNewCollectionModal: false
    }
  },
  computed: {
    ...mapGetters({
      myBookshelf: types.BOOKSHELF
    })
  },
  created () {
    this.content = { type: 0 }
    switch (this.$route.params.collectionName) {
      case 'my-favorite':
        this.content = Object.assign(this.content, this.myBookshelf.favorite) // object
        break
      case 'my-wishlist':
        this.content = Object.assign(this.content, this.myBookshelf.wishlist) // object
        break
      case 'my-collections':
        this.content.type = 1
        this.content = Object.assign(this.content, { collections: this.myBookshelf.collections }) // array
        break
      default:
        this.content = Object.assign(this.content, this.loadContent(this.$route.params.collectionName)) // object - other customized collections
        break
    }
  },
  methods: {
    loadContent (name) {
      const myCollections = this.myBookshelf.collections
      return myCollections.find(item => item.slug === name)
    },
    toggleNewBookModal () {
      this.showNewBookModal = !this.showNewBookModal
    },
    toggleNewCollectionModal () {
      this.showNewCollectionModal = !this.showNewCollectionModal
    }
  }
}
</script>

<style scoped>

</style>
