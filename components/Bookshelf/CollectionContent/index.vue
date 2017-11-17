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
            <app-add-modal
              :showNewBookModal="showNewBookModal" 
              @dismissNewBookModal="showNewBookModal=$event"
              :collection="content"></app-add-modal>
          </p>
          <!-- <p class="level-item" v-else-if="content.type === 1">
            <button class="button is-info"  @click="toggleNewCollectionModal"><span class="icon"><i class="fa fa-plus-circle"></i></span><span>Add</span></button>
            <app-new-collection-modal 
              :showNewCollectionModal="showNewCollectionModal"
              @dismissNewCollectionModal="showNewCollectionModal=$event"></app-new-collection-modal>
          </p> -->
        </div>
      </nav>
    </div>
    <section class="secion">
      <div class="columns is-multiline" style="align-items: flex-end;">
        <div class="column is-narrow" v-for="item in content.books" :key="item.uid">
          <figure class="image" style="width: 122px;">
            <!-- <img src="https://bulma.io/images/placeholders/128x128.png"> -->
            <img :src="item.imageLinks.thumbnail" v-if="item.imageLinks.thumbnail">
            <div class="overlay">
              <div class="overlay-delete is-pulled-right">
                <button class="delete is-small"></button>
              </div>
              <div class="content overlay-text has-text-centered is-size-7">
                <a>{{ item.title }}</a>
              </div>
            </div>
          </figure>
        </div>
      </div>
      <!-- this is from component {{ $route.params.collectionName }}
      {{ content }} -->
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '@/types'

import AddModalComponent from '@/components/Bookshelf/CollectionContent/Addmodal'
// import NewCollectionModalComponent from './NewCollection'

export default {
  name: 'collectionContent',
  components: {
    'app-add-modal': AddModalComponent
    // 'app-new-collection-modal': NewCollectionModalComponent
  },
  data () {
    return {
      content: {
        type: 0 // type: 0 -> collection opened; type: 1 -> collections opened
      },
      showNewBookModal: false
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
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .5s ease;
  /* background-color: #008CBA; */
  background-color: hsl(204, 86%, 53%)
}
figure.image:hover .overlay {
  opacity: 0.9;
}
.overlay-text a {
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.overlay-delete button.delete {
  margin-right: -5px;
  margin-top: -5px;
  background-color: hsl(348, 100%, 61%);
}
</style>
