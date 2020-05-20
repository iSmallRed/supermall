import { checkExpiration } from 'network/time'
import { getStore, removeStore } from 'network/cookie'

const getUserState = () => {

  let user = getStore('User-Info') || {}
  if (isEmpty(user)) {
      return user
  }
  //检查是否token过期
  if (checkExpiration(user.timestamp, 120)) {
      user = {};
      removeStore('User-Info')
      removeStore('User-Token')
  }
  return user
}

export const state = {
  user: getUserState(),
}

export const getUser = state => {
  return state.user
}