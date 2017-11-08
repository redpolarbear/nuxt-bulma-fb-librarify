import * as types from '@/types'

export default function ({store, redirect, route}, next) {
  if (!store.getters[types.USER] && route.path !== '/') {
    redirect('/')
  } else {
    next()
  }
}
