import * as types from '@/types'
import { DB } from '@/firebaseInit'

export const state = () => ({
  bookInfo: null
})

export const getters = {
  GET_BOOK_INFO: (state) => {
    return state.bookInfo
  }
}

export const mutations = {
  SET_BOOK_INFO (state, payload) {
    state.bookInfo = {
      id: payload.id,
      title: payload.title,
      subtitle: payload.subtitle,
      authors: payload.authors,
      publisher: payload.publisher,
      publishedDate: payload.publishedDate,
      description: payload.description,
      isbn10: payload.industryIdentifiers.find(e => e.type === 'ISBN_10')['identifier'] || null,
      isbn13: payload.industryIdentifiers.find(e => e.type === 'ISBN_13')['identifier'] || null,
      pageCount: payload.pageCount,
      dimensions: payload.dimensions,
      categories: payload.categories,
      imageLinks: payload.imageLinks,
      language: payload.language
    }
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
      const bookSnapshot = await DB.ref('books').orderByChild(child).equalTo(payload.isbn).once('value')
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
      console.log(res)
      if (res.status === 200) {
        if (res.data.totalItems !== 0) {
          const resVol = await this.$axios.get(url + '/' + res.data.items[0].id, {
            headers: {'X-Requested-With': 'XMLHttpRequest'}
          })
          console.log(resVol)
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
    commit(types.SET_LOADING, true, { root: true })
    commit(types.CLEAR_ALL_MESSAGE, null, { root: true })
    let newBookKey = DB.ref('books').push().key
    commit('SET_BOOK_INFO_UID', { uid: newBookKey })
    let newBookInfo = {}
    newBookInfo[newBookKey] = getters['GET_BOOK_INFO']
    try {
      await DB.ref('books').update(newBookInfo)
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
  }
}
