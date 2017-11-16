import * as types from '@/types'
import _ from 'lodash'
import firebase from '@/firebaseInit'

export const state = () => ({
  bookInfo: null,
  isbnCode: ''
})

export const getters = {
  GET_BOOK_INFO: (state) => {
    return state.bookInfo
  },
  GET_ISBN_CODE: (state) => {
    return state.isbnCode
  }
}

export const mutations = {
  SET_BOOK_INFO (state, payload) {
    if (payload) {
      state.bookInfo = {
        id: payload.id,
        title: payload.title,
        subtitle: payload.subtitle || null,
        authors: payload.authors || null,
        publisher: payload.publisher || null,
        publishedDate: payload.publishedDate || null,
        description: payload.description || null,
        isbn10: payload.industryIdentifiers.find(e => e.type === 'ISBN_10')['identifier'] || null,
        isbn13: payload.industryIdentifiers.find(e => e.type === 'ISBN_13')['identifier'] || null,
        pageCount: payload.pageCount || null,
        dimensions: payload.dimensions || null,
        categories: payload.categories || null,
        imageLinks: payload.imageLinks || null,
        language: payload.language || null
      }
    } else {
      state.bookInfo = payload
    }
  },
  SET_ISBN_CODE (state, payload) {
    state.isbnCode = payload
  },
  SET_BOOK_INFO_UID (state, payload) {
    state.bookInfo.uid = payload.uid
  }
}

export const actions = {
  async SEARCH_BOOK_BY_ISBN_IN_FB_ASYNC ({commit}, payload) { // payload = { isbn: isbn } - validated
    let child = ''
    if (payload.isbn.length === 10) {
      child = 'isbn10'
    } else if (payload.isbn.length === 13) {
      child = 'isbn13'
    }
    try {
      const bookSnapshot = await firebase.database().ref('books').orderByChild(child).equalTo(payload.isbn).once('value')
      if (bookSnapshot.val()) {
        bookSnapshot.forEach(childSnapshot => {
          commit('SET_BOOK_INFO', Object.assign({}, childSnapshot.val()))
          return true
        })
      } else {
        commit('SET_BOOK_INFO', null)
      }
    } catch (error) {
      // Handle Errors here.
      // let errorCode = error.code
      let errorMessage = error.message
      // [START_EXCLUDE]
      commit(types.SET_LOADING, false, { root: true })
      commit(types.SET_ERROR, errorMessage, { root: true })
      console.log(error)
    }
  },
  async SEARCH_BOOK_BY_ISBN_ASYNC ({commit}, payload) { // payload = { isbn: isbn } - validated
    const url = '/volumes'
    const params = {
      q: 'isbn:' + payload.isbn
    }
    try {
      const res = await this.$axios.get(url, {
        params,
        headers: {'X-Requested-With': 'XMLHttpRequest'}
      })
      if (res.status === 200) {
        if (res.data.totalItems !== 0) {
          const resVol = await this.$axios.get(url + '/' + res.data.items[0].id, {
            headers: {'X-Requested-With': 'XMLHttpRequest'}
          })
          commit('SET_BOOK_INFO', Object.assign({id: resVol.data.id}, resVol.data.volumeInfo))
        }
      }
    } catch (error) {
      // Handle Errors here.
      // let errorCode = error.code
      let errorMessage = error.message
      // [START_EXCLUDE]
      commit(types.SET_LOADING, false, { root: true })
      commit(types.SET_ERROR, errorMessage, { root: true })
      console.log(error)
    }
  },
  async SAVE_BOOK_INFO_INTO_FB_ASYNC ({getters, commit}) {
    let newBookKey = firebase.database().ref('books').push().key
    commit('SET_BOOK_INFO_UID', { uid: newBookKey })
    let newBookInfo = {}
    newBookInfo[newBookKey] = getters['GET_BOOK_INFO']
    try {
      await firebase.database().ref('books').update(newBookInfo)
      commit(types.SET_LOADING, false, { root: true })
    } catch (error) {
      // Handle Errors here.
      // let errorCode = error.code
      let errorMessage = error.message
      // [START_EXCLUDE]
      commit(types.SET_LOADING, false, { root: true })
      commit(types.SET_ERROR, errorMessage, { root: true })
      console.log(error)
    }
  },
  async SAVE_THE_BOOK_INTO_COLLECTION_IN_FB ({commit, rootGetters}, payload) {
    const collectionUid = payload.collectionUid
    // check if the book is existed
    const collectionBooks = await firebase.database().ref('userCollectionsBooks/' + rootGetters[types.USER].id + '/' + collectionUid).child('books').once('value')
    if (collectionBooks.val()) { // already collected some books
      const collectionBooksArray = Object.entries(collectionBooks.val()).map(e => Object.assign({}, e[1]))
      const newBook = rootGetters[types.BOOK_INFO]
      if (CHECK_BOOK_IS_EXISTED_BY_ISBN(collectionBooksArray, newBook) !== undefined) {
        console.log('The book is existed already.')
        return
      }
    }
    // the collection is empty or never collect this book into this collection
    let update = {}
    const updateKey = firebase.database().ref('userCollectionsBooks/' + rootGetters[types.USER].id + '/' + collectionUid).child('books').push().key
    const newBook = {
      ...rootGetters[types.BOOK_INFO],
      uid: updateKey,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      updatedAt: firebase.database.ServerValue.TIMESTAMP
    }
    update['userCollectionsBooks/' + rootGetters[types.USER].id + '/' + collectionUid + '/books/' + updateKey] = newBook
    await firebase.database().ref().update(update)
    commit(types.ADD_ONE_BOOK_INTO_COLLECTION, { collectionUid, newBook }, { root: true })
  },
  async SAVE_THE_BOOK_INTO_FAVORITE_IN_FB ({commit, rootGetters}, payload) {
    const favoriteBooks = await firebase.database().ref('userFavoriteBooks/' + rootGetters[types.USER].id).child('books').once('value')
    if (favoriteBooks.val()) {
      const favoriteBooksArray = Object.entries(favoriteBooks.val()).map(e => Object.assign({}, e[1]))
      const newBook = rootGetters[types.BOOK_INFO]
      if (CHECK_BOOK_IS_EXISTED_BY_ISBN(favoriteBooksArray, newBook) !== undefined) {
        // existed already
        console.log('The book is existed.')
        return
      }
    }
    // the collection is empty or never collect this book into this collection
    let update = {}
    const updateKey = firebase.database().ref('userFavoriteBooks/' + rootGetters[types.USER].id).child('books').push().key
    const newBook = {
      ...rootGetters[types.BOOK_INFO],
      uid: updateKey,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      updatedAt: firebase.database.ServerValue.TIMESTAMP
    }
    update['userFavoriteBooks/' + rootGetters[types.USER].id + '/books/' + updateKey] = newBook
    await firebase.database().ref().update(update)
    commit(types.ADD_ONE_BOOK_INTO_FAVORITE, { newBook }, { root: true })
  },
  async SAVE_THE_BOOK_INTO_WISHLIST_IN_FB ({state, commit, rootGetters}, payload) {
    const favoriteBooks = await firebase.database().ref('userWishlistBooks/' + rootGetters[types.USER].id).child('books').once('value')
    if (favoriteBooks.val()) {
      const favoriteBooksArray = Object.entries(favoriteBooks.val()).map(e => Object.assign({}, e[1]))
      const newBook = rootGetters[types.BOOK_INFO]
      if (CHECK_BOOK_IS_EXISTED_BY_ISBN(favoriteBooksArray, newBook) !== undefined) {
        // existed already
        console.log('The book is existed.')
        return
      }
    }
    // the collection is empty or never collect this book into this collection
    let update = {}
    const updateKey = firebase.database().ref('userWishlistBooks/' + rootGetters[types.USER].id).child('books').push().key
    const newBook = {
      ...rootGetters[types.BOOK_INFO],
      uid: updateKey,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      updatedAt: firebase.database.ServerValue.TIMESTAMP
    }
    update['userWishlistBooks/' + rootGetters[types.USER].id + '/books/' + updateKey] = newBook
    await firebase.database().ref().update(update)
    commit(types.ADD_ONE_BOOK_INTO_WISHLIST, { newBook }, { root: true })
  }
}

const CHECK_BOOK_IS_EXISTED_BY_ISBN = function (booksArray, book) {
  return _.find(booksArray, function (e) {
    return e.isbn10 === book.isbn10 || e.isbn13 === book.isbn13
  })
}
