import firebase from '@/firebaseInit'
import * as types from '@/types'
import _ from 'lodash'
import slug from 'slug'

export const state = () => ({
  bookshelf: {},
  collections: [],
  favorite: {},
  wishlist: {}
})

export const getters = {
  GET_BOOKSHELF: (state) => {
    return state.bookshelf
  },
  GET_COLLECTIONS: (state) => {
    return state.collections
  },
  GET_FAVORITE: (state) => {
    return state.favorite
  },
  GET_WISHLIST: (state) => {
    return state.wishlist
  }
}

export const mutations = {
  SET_BOOKSHELF (state, payload) {
    if (payload !== null) {
      state.bookshelf = {
        favorite: payload.favorite,
        wishlist: payload.wishlist,
        collections: payload.collections
      }
    } else {
      state.bookshelf = payload
    }
  },
  ADD_ONE_BOOK_INTO_COLLECTION (state, payload) {
    const targetCollectionIndex = _.findIndex(state.bookshelf.collections, function (e) { return e.uid === payload.collectionUid })
    state.bookshelf.collections[targetCollectionIndex]['books'].push(payload.newBook)
    state.bookshelf.collections[targetCollectionIndex]['meta'].booksNo = _.size(state.bookshelf.collections[targetCollectionIndex]['books'])
  },
  ADD_ONE_BOOK_INTO_FAVORITE (state, payload) {
    state.bookshelf.favorite['books'].push(payload.newBook)
    state.bookshelf.favorite['meta'].booksNo = _.size(state.bookshelf.favorite['books'])
  },
  ADD_ONE_BOOK_INTO_WISHLIST (state, payload) {
    state.bookshelf.wishlist['books'].push(payload.newBook)
    state.bookshelf.wishlist['meta'].booksNo = _.size(state.bookshelf.wishlist['books'])
  },
  SET_COLLECTIONS (state, payload) {
    state.collections = payload
  },
  SET_FAVORITE (state, payload) {
    state.favorite = payload
  },
  SET_WISHLIST (state, payload) {
    state.wishlist = payload
  },
  CLEAR_COLLECTIONS (state) {
    state.collections = []
  },
  ADD_ONE_EMPTY_COLLECTION (state) {
    state.collections.push({
      name: '',
      slug: '',
      meta: {
        booksNo: 0,
        isChecked: false,
        isEditing: true,
        isExisted: false,
        isLoading: false
      }
    })
  },
  REMOVE_ONE_COLLECTION (state, payload) {
    state.collections.splice(payload.index, 1)
  },
  UPDATE_ONE_COLLECTION (state, payload) {
    state.collections[payload.index] = Object.assign({}, _.omit(payload, 'index'))
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  },
  UPDATE_ONE_COLLECTION_NAME (state, payload) {
    state.collections[payload.index].collection.name = payload.collection.name
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  },
  ENABLE_COLLECTION_EDITING (state, payload) {
    state.collections[payload.index].meta.isEditing = true
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  },
  DISABLE_COLLECTION_EDITING (state, payload) {
    state.collections[payload.index].meta.isEditing = false
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  },
  TOGGLE_COLLECTION_CHECK (state, payload) {
    state.collections[payload.index].meta.isChecked = !state.collections[payload.index].meta.isChecked
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  },
  TOGGLE_COLLECTION_ISEXISTED (state, payload) {
    state.collections[payload.index].meta.isExisted = payload.switch
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  },
  ENABLE_COLLECTION_LOADING (state, payload) {
    state.collections[payload.index].meta.isLoading = true
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  },
  DISABLE_COLLECTION_LOADING (state, payload) {
    state.collections[payload.index].meta.isLoading = false
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  }
}

export const actions = {
  async LOAD_MY_BOOKSHELF_ASYNC ({commit, rootGetters}) {
    try {
      const usersCollections = firebase.database().ref('userCollectionsBooks/' + rootGetters[types.USER].id).once('value')
      const usersFavorite = firebase.database().ref('userFavoriteBooks/' + rootGetters[types.USER].id).once('value')
      const usersWishlist = firebase.database().ref('userWishlistBooks/' + rootGetters[types.USER].id).once('value')
      const usersBookshelf = await Promise.all([usersCollections, usersFavorite, usersWishlist])
      const usersCollectionsArray = Object.entries(usersBookshelf[0].val()).map(e => Object.assign(
        e[1],
        {
          meta: {
            isEditing: false,
            isExisted: false,
            isChecked: false,
            isLoading: false,
            booksNo: e[1].books === null ? 0 : _.size(e[1].books)
          }
        },
        {
          books: e[1].books !== null ? _.orderBy(e[1].books, ['updatedAt'], ['desc']) : null
        }
      ))
      const usersFavoriteObject = Object.assign(
        usersBookshelf[1].val(),
        { meta: {booksNo: usersBookshelf[1].val().books === null ? 0 : _.size(usersBookshelf[1].val().books)} },
        { books: usersBookshelf[1].val().books === null ? null : _.orderBy(usersBookshelf[1].val().books, ['updatedAt'], ['desc']) }
      )
      const usersWishlistObject = Object.assign(
        usersBookshelf[2].val(),
        { meta: {booksNo: usersBookshelf[2].val().books === null ? 0 : _.size(usersBookshelf[2].val().books)} },
        { books: usersBookshelf[2].val().books === null ? null : _.orderBy(usersBookshelf[2].val().books, ['updatedAt'], ['desc']) }
      )
      commit('SET_BOOKSHELF', {
        favorite: usersFavoriteObject,
        wishlist: usersWishlistObject,
        collections: usersCollectionsArray
      })
    } catch (error) {
      console.log(error)
    }
  },
  async LOAD_MY_COLLECTIONS_ASYNC ({commit, rootGetters}) {
    try {
      const usersCollections = await firebase.database().ref('userCollectionsBooks/' + rootGetters[types.USER].id).once('value')
      let usersCollectionArray = Object.entries(usersCollections.val()).map(e => Object.assign(
        e[1],
        {
          meta: {
            isEditing: false,
            isExisted: false,
            isChecked: false,
            isLoading: false,
            booksNo: e[1].books === null ? 0 : _.size(e[1].books)
          }
        }, {
          books: e[1].books !== null ? _.orderBy(e[1].books, ['updatedAt'], ['desc']) : null
        }))
      commit('SET_COLLECTIONS', usersCollectionArray)
    } catch (error) {
      console.log(error)
    }
  },
  async LOAD_MY_FAVORITE_ASYNC ({commit, rootGetters}) {
    try {
      const usersFavorite = await firebase.database().ref('userFavoriteBooks/' + rootGetters[types.USER].id).once('value')
      commit('SET_FAVORITE', Object.assign(
        usersFavorite.val(),
        { meta: {booksNo: usersFavorite.val().books === null ? 0 : _.size(usersFavorite.val().books)} },
        { books: usersFavorite.val().books === null ? null : _.orderBy(usersFavorite.val().books, ['updatedAt'], ['desc']) }
      ))
    } catch (error) {
      console.log(error)
    }
  },
  async LOAD_MY_WISHLIST_ASYNC ({commit, rootGetters}) {
    try {
      const usersWishlist = await firebase.database().ref('userWishlistBooks/' + rootGetters[types.USER].id).once('value')
      commit('SET_WISHLIST', Object.assign(
        usersWishlist.val(),
        { meta: {booksNo: usersWishlist.val().books === null ? 0 : _.size(usersWishlist.val().books)} },
        { books: usersWishlist.val().books === null ? null : _.orderBy(usersWishlist.val().books, ['updatedAt'], ['desc']) }
      ))
    } catch (error) {
      console.log(error)
    }
  },
  async SAVE_ONE_COLLECTION_INTO_FB ({state, commit, rootGetters}, payload) { // TODO: try {} catch (error) {}
    commit('ENABLE_COLLECTION_LOADING', { index: payload.index })
    let collectionKey = ''
    let collection = {}
    if (payload.uid) { // modify the name of the collection
      collectionKey = payload.uid
      collection[collectionKey] = {
        ..._.omit(payload, [ 'index', 'meta' ]),
        slug: slug(payload.name),
        updatedAt: firebase.database.ServerValue.TIMESTAMP
      }
    } else { // add the new collection
      collectionKey = firebase.database().ref('userCollectionsBooks/' + rootGetters[types.USER].id).push().key
      collection[collectionKey] = {
        name: payload.name,
        slug: slug(payload.name),
        uid: collectionKey,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        updatedAt: firebase.database.ServerValue.TIMESTAMP
      }
    }
    await firebase.database().ref('userCollectionsBooks').child(rootGetters[types.USER].id).update(collection)
    commit('UPDATE_ONE_COLLECTION', Object.assign({ index: payload.index }, collection[collectionKey], { meta: payload.meta }))
    commit('DISABLE_COLLECTION_EDITING', { index: payload.index })
    commit('TOGGLE_COLLECTION_ISEXISTED', { index: payload.index, switch: false })
    commit('DISABLE_COLLECTION_LOADING', { index: payload.index })
  }
}
