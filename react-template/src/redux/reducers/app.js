import { APP } from '../actionTypes'

const initialState = {
  bizLine: '',
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case APP.UPDATE_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
