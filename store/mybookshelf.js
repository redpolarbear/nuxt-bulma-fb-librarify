import firebase from '@/firebaseInit'
import * as types from '@/types'
import _ from 'lodash'

export const state = () => ({
  collections: [],
  favorite: {},
  wishlist: {}
})

export const getters = {
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
      collection: { name: '', slug: '' },
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
  async LOAD_COLLECTIONS_ASYNC ({commit, rootGetters}) {
    try {
      const usersCollections = await firebase.database().ref('userCollectionsBooks/' + rootGetters[types.USER].id).once('value')
      let usersCollectionArray = Object.entries(usersCollections.val()).map(e => Object.assign({
        meta: {
          isEditing: false,
          isExisted: false,
          isChecked: false,
          isLoading: false,
          booksNo: e[1].books === null ? 0 : _.size(e[1].books)
        }
      }, {collection: e[1]}))
      commit('SET_COLLECTIONS', usersCollectionArray)
    } catch (error) {
      console.log(error)
    }
  },
  async LOAD_FAVORITE_ASYNC ({commit, rootGetters}) {
    try {
      const usersFavorite = await firebase.database().ref('userFavoriteBooks/' + rootGetters[types.USER].id).once('value')
      commit('SET_FAVORITE', usersFavorite.val())
    } catch (error) {
      console.log(error)
    }
  },
  async LOAD_WISHLIST_ASYNC ({commit, rootGetters}) {
    try {
      const usersWishlist = await firebase.database().ref('userWishlistBooks/' + rootGetters[types.USER].id).once('value')
      commit('SET_WISHLIST', usersWishlist.val())
    } catch (error) {
      console.log(error)
    }
  },
  async SAVE_ONE_COLLECTION_INTO_FB ({state, commit, rootGetters}, payload) { // TODO: try {} catch (error) {}
    try {
    } catch (error) {
      console.log(error)
    }
    commit('ENABLE_COLLECTION_LOADING', { index: payload.index })
    let collectionKey = ''
    let collection = {}
    if (payload.collection.uid) { // modify the name of the collection
      collectionKey = payload.collection.uid
      collection[collectionKey] = {
        ...payload.collection,
        updatedAt: firebase.database.ServerValue.TIMESTAMP
      }
    } else { // add the new collection
      collectionKey = firebase.database().ref('userCollectionsBooks/' + rootGetters[types.USER].id).push().key
      collection[collectionKey] = {
        name: payload.collection.name,
        uid: collectionKey,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        updatedAt: firebase.database.ServerValue.TIMESTAMP
      }
    }
    await firebase.database().ref('userCollectionsBooks').child(rootGetters[types.USER].id).update(collection)
    commit('UPDATE_ONE_COLLECTION', Object.assign({ index: payload.index }, {collection: collection[collectionKey]}, {meta: payload.meta}))
    commit('DISABLE_COLLECTION_EDITING', { index: payload.index })
    commit('TOGGLE_COLLECTION_ISEXISTED', { index: payload.index, switch: false })
    commit('DISABLE_COLLECTION_LOADING', { index: payload.index })
  }
}
