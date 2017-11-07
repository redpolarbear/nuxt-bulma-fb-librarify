import * as firebase from 'firebase'
import _ from 'lodash'
import * as types from '@/types'

export const state = () => ({
  user: null,
  showLogin: false,
  showSignup: false
})

export const getters = {
  GET_USER: (state) => {
    return state.user
  },
  GET_LOGIN_MODAL: (state) => {
    return state.showLogin
  },
  GET_SIGNUP_MODAL: (state) => {
    return state.showSignup
  }
}

export const mutations = {
  SET_USER (state, payload) {
    state.user = payload
  },
  TOGGLE_LOGIN_MODAL (state, payload) {
    state.showLogin = payload
  },
  TOGGLE_SIGNUP_MODAL (state, payload) {
    state.showSignup = payload
  }
}

export const actions = {
  async USER_SIGNUP ({commit, dispatch, rootGetters}, payload) {
    commit(types.SET_LOADING, true, { root: true })
    commit(types.CLEAR_ALL_MESSAGE, null, { root: true })
    try {
      const newUser = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      await newUser.updateProfile({
        displayName: payload.id,
        photoURL: payload.photoURL
      })
      if (newUser) {
        const user = {
          ..._.omit(payload, 'password'),
          uid: newUser.uid
        }
        // usersProfile update
        firebase.database().ref('usersProfile').child(payload.id).update({
          ...user,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          updatedAt: firebase.database.ServerValue.TIMESTAMP
        })
        // create four default collections - reading, read, favorite, wishlist
        const ReadingCollectionKey = firebase.database().ref('userCollectionsBooks').child(payload.id).push().key
        const ReadCollectionKey = firebase.database().ref('userCollectionsBooks').child(payload.id).push().key
        let defaultCollectionsUpdate = {}
        defaultCollectionsUpdate['userCollectionsBooks/' + payload.id + '/' + ReadingCollectionKey] = {
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          name: 'My Reading Collection',
          slug: 'my-reading-collection',
          uid: ReadingCollectionKey,
          updatedAt: firebase.database.ServerValue.TIMESTAMP
        }
        defaultCollectionsUpdate['userCollectionsBooks/' + payload.id + '/' + ReadCollectionKey] = {
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          name: 'My Have Read Collection',
          slug: 'my-have-read-collection',
          uid: ReadCollectionKey,
          updatedAt: firebase.database.ServerValue.TIMESTAMP
        }
        defaultCollectionsUpdate['userFavoriteBooks/' + payload.id] = {
          slug: 'my-favorites',
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          updatedAt: firebase.database.ServerValue.TIMESTAMP
        }
        defaultCollectionsUpdate['userWishlistBooks/' + payload.id] = {
          slug: 'my-wishlist',
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          updatedAt: firebase.database.ServerValue.TIMESTAMP
        }
        firebase.database().ref().update(defaultCollectionsUpdate)
        await dispatch(types.ACTION_LOAD_USER_INFO_ASYNC, payload.id, { root: true })
        commit('SET_USER', rootGetters[types.USER_INFO])
      }
      commit('TOGGLE_SIGNUP_MODAL', false) // close the modal before the loading stops
      commit(types.SET_LOADING, false, { root: true })
      const successMessage = 'Signup Successfully'
      commit(types.SET_SUCCESS, successMessage, { root: true })
    } catch (error) {
      // Handle Errors here.
      let errorCode = error.code
      let errorMessage = error.message
      // [START_EXCLUDE]
      switch (errorCode) {
        case 'auth/email-already-in-use':
          errorMessage = 'The email is already in use.'
          break
        case 'auth/invalid-email':
          errorMessage = 'The email address is not valid.'
          break
        case 'auth/weak-password':
          errorMessage = 'The password is not strong enough.'
          break
        default:
          errorMessage = 'Unknown error occurred.'
          break
      }
      commit('TOGGLE_SIGNUP_MODAL', false) // close the modal before the loading stops
      commit(types.SET_LOADING, false, { root: true })
      commit(types.SET_ERROR, errorMessage, { root: true })
      console.log(error)
    }
  },
  async USER_LOGIN ({commit, dispatch, rootGetters}, payload) {
    commit(types.SET_LOADING, true, { root: true })
    commit(types.CLEAR_ALL_MESSAGE, null, { root: true })
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      if (user) {
        await dispatch(types.ACTION_LOAD_USER_INFO_ASYNC, user.displayName, { root: true })
        // commit(types.SET_USER, state.userInfo)
        commit('SET_USER', rootGetters[types.USER_INFO])
      }
      commit('TOGGLE_LOGIN_MODAL', false) // close the modal before the loading stops
      commit(types.SET_LOADING, false, { root: true })
      const successMessage = 'Login Successfully'
      commit(types.SET_SUCCESS, successMessage, { root: true })
    } catch (error) {
      // Handle Errors here.
      let errorCode = error.code
      let errorMessage = error.message
      // [START_EXCLUDE]
      switch (errorCode) {
        case 'auth/user-disabled':
          errorMessage = 'The user has been disabled.'
          break
        case 'auth/invalid-email':
          errorMessage = 'The email address is not valid.'
          break
        case 'auth/user-not-found':
          errorMessage = 'The user is not found or the password is incorrect.'
          break
        case 'auth/wrong-password':
          errorMessage = 'The user is not found or the password is incorrect.'
          break
        default:
          errorMessage = 'Unknown error occurred.'
          break
      }
      commit('TOGGLE_LOGIN_MODAL', false) // close the modal before the loading stops
      commit(types.SET_LOADING, false, { root: true })
      commit(types.SET_ERROR, errorMessage, { root: true })
      console.log(error)
    }
  },
  async AUTO_SIGNIN ({commit, dispatch, rootGetters}, payload) {
    await dispatch(types.ACTION_LOAD_USER_INFO_ASYNC, payload.displayName, { root: true })
    commit('SET_USER', rootGetters[types.USER_INFO])
  },
  USER_LOGOUT ({commit}) {
    firebase.auth().signOut()
    commit('SET_USER', null)
    commit(types.SET_USER_PROFILE, null, { root: true })
    commit(types.SET_USER_INFO, null, { root: true })
    const successMessage = 'Logout Successfully'
    commit(types.SET_SUCCESS, successMessage, { root: true })
  }
}
