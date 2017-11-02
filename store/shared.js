export const state = () => ({
  loading: false,
  error: null,
  info: null,
  success: null
})

export const getters = {
  GET_LOADING: (state) => {
    return state.loading
  },
  GET_ERROR: (state) => {
    return state.error
  },
  GET_SUCCESS: (state) => {
    return state.success
  },
  GET_INFO: (state) => {
    return state.info
  }
}

export const mutations = {
  SET_LOADING (state, payload) {
    state.loading = payload
  },
  SET_ERROR (state, payload) {
    state.error = payload
  },
  SET_SUCCESS (state, payload) {
    state.success = payload
  },
  SET_INFO (state, payload) {
    state.info = payload
  },
  CLEAR_SUCCESS (state) {
    state.success = null
  },
  CLEAR_INFO (state) {
    state.info = null
  },
  CLEAR_ERROR (state) {
    state.error = null
  },
  CLEAR_ALL_MESSAGE (state) {
    state.success = null
    state.info = null
    state.error = null
  }
}

export const actions = {
}
