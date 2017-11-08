import * as types from '@/types'

export default function ({store, redirect}) {
  console.log('middleware', store.getters[types.USER])
  // console.log('middleware', store.state.authentication.user)
  // if (store.getters[types.USER]) {
  //   console.log(store.getters[types.USER])
  // } else {
  //   // redirect('/')
  //   console.log('not logged in')
  // }
  // if (store.state.authentication.user) {
  //   console.log('logged in')
  // } else {
  //   console.log('not logged in')
  // }
}
