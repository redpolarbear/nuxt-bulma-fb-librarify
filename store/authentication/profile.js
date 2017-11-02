import shortid from 'shortid'
import * as types from '@/types'

export const state = () => ({
  userProfile: null,
  userInfo: null
})

export const getters = {
  GET_USER_PROFILE: (state) => {
    return state.userProfile
  },
  GET_USER_INFO: (state) => {
    return state.userInfo
  }
}

export const mutations = {
  SET_USER_INFO (state, payload) {
    state.userInfo = payload
  },
  SET_USER_PROFILE (state, payload) {
    state.userProfile = payload
  }
}

export const actions = {
  async LOAD_USER_INFO_ASYNC ({commit}, id) {
    commit(types.SET_LOADING, true, { root: true })
    commit(types.CLEAR_ALL_MESSAGE, null, { root: true })
    try {
      // load the profile
      const userProfile = this.$firebase.database().ref('usersProfile/' + id).once('value')
      // load the followings and the followers
      const userFollowings = this.$firebase.database().ref('followings/' + id).once('value')
      const userFollowers = this.$firebase.database().ref('followers/' + id).once('value')
      const values = await Promise.all([userProfile, userFollowings, userFollowers])
      // if the id is valid but the user does not exist, return null
      commit('SET_USER_INFO', values[0].val() ? {...(Object.assign({}, values[0].val())),
        followingsNo: values[1].numChildren() || 0,
        followersNo: values[2].numChildren() || 0} : null)
      commit(types.SET_LOADING, false, { root: true })
    } catch (error) {
      // Handle Errors here.
      let errorMessage = error.message
      commit(types.SET_LOADING, false, { root: true })
      commit(types.SET_ERROR, errorMessage, { root: true })
      console.log(error)
    }
  },
  async LOAD_USER_PROFILE_BY_ID_ASYNC ({state, commit, dispatch}, payload) {
    commit(types.SET_LOADING, true, { root: true })
    commit(types.CLEAR_ALL_MESSAGE, null, { root: true })
    try {
      if (shortid.isValid(payload.id)) {
        // if the payload.id is valid, load the profile of the user whose profile page is being visited, setup the userId = payload.id
        await dispatch('LOAD_USER_INFO_ASYNC', payload.id)
        commit('SET_USER_PROFILE', state.userInfo)
      } else {
        // the payload.id is invalid, return null
        commit('SET_USER_PROFILE', null)
      }
      commit(types.SET_LOADING, false, { root: true })
    } catch (error) {
      // Handle Errors here.
      let errorMessage = error.message
      commit(types.SET_LOADING, false, { root: true })
      commit(types.SET_ERROR, errorMessage, { root: true })
      console.log(error)
    }
  }
}
