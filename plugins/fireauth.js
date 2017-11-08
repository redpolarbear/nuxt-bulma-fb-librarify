// import firebase from '@/firebaseInit'
import { auth } from '@/firebaseInit'
import * as types from '@/types'

export default (context) => {
  const { store } = context
  return new Promise((resolve, reject) => {
    return auth.onAuthStateChanged((user) => {
      console.log('plugin auth')
      // if (user) {
      console.log('plugin user')
      return store.dispatch(types.ACTION_AUTO_SIGNIN, user).then(() => {
        resolve()
      })
      // } else {
      // eslint-disable-next-line
      // reject()
      // resolve()
      // console.log('plugin not logged in ')
      // }
    })
  })
}

// export default async ({store}) => {
//   await auth.onAuthStateChanged(async (user) => {
//     console.log('plugin auth')
//     if (user) {
//       console.log('plugin user')
//       await store.dispatch(types.ACTION_AUTO_SIGNIN, user)
//     }
//   })
// }
