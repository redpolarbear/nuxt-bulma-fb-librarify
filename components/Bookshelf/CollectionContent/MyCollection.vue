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
            <button class="button is-primary" @click="toggleAddBookModal"><span class="icon"><i class="fa fa-plus-circle"></i></span><span>Add</span></button>
            <app-add-book-modal
              :showAddBookModal="showAddBookModal" 
              @dismissAddBookModal="showAddBookModal=$event"
              :collection="content"></app-add-book-modal>
          </p>
        </div>
      </nav>
    </div>
    <section class="secion">
      <div class="columns is-multiline" style="align-items: flex-end;" v-if="content.books !== undefined">
        <div class="column is-narrow" v-for="(item, index) in content.books" :key="item.uid">
          <figure class="image" style="width: 122px;">
            <img :src="item.imageLinks.thumbnail" v-if="item.imageLinks.thumbnail">
            <div class="overlay">
              <div class="overlay-delete is-pulled-right">
                <button class="delete is-small" @click="onDelete(index, item.uid)"></button>
              </div>
              <div class="content overlay-text has-text-centered is-size-7">
                <a>
                  {{ item.title }}
                </a>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddBookModalComponent from '@/components/Bookshelf/CollectionContent/AddBookModal'
import * as types from '@/types'

export default {
  name: 'myCollection',
  components: {
    'app-add-book-modal': AddBookModalComponent
  },
  data () {
    return {
      showAddBookModal: false
    }
  },
  props: [ 'field' ],
  computed: {
    ...mapGetters({
      myBookshelf: types.BOOKSHELF
    }),
    content () {
      if (this.field.type === 0) { // favorite or wishlist
        return this.myBookshelf[this.field.name] // object
      } else if (this.field.type === 2) { // collection
        return this.myBookshelf[this.field.name][this.field.collectionIndex] // object
      }
    }
  },
  methods: {
    toggleAddBookModal () {
      this.showAddBookModal = !this.showAddBookModal
    },
    async onDelete (index, bookUid) {
      switch (this.field.type) {
        case 0:
          await this.$store.dispatch(types.ACTION_REMOVE_ONE_BOOK_FROM_OBJECT_IN_FB, { // remove the book from the favorite or wishlist
            bookUid,
            docName: this.field.name,
            index
          })
          break
        case 2:
          await this.$store.dispatch(types.ACTION_REMOVE_ONE_BOOK_FROM_COLLECTION_IN_FB, { // remove the book from the collection
            bookUid,
            collectionUid: this.content.uid,
            index
          })
          break
        default:
          break
      }
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