import { auth } from '@/firebaseInit'
import * as types from '@/types'

export default ({ store, redirect }) => {
  return new Promise((resolve, reject) => {
    return auth.onAuthStateChanged((user) => {
      return store.dispatch(types.ACTION_AUTO_SIGNIN, user ? { displayName: user.displayName } : null).then(() => {
        resolve()
      })
    })
  })
}
