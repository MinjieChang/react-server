import { LOADING } from '../actionTypes'

import { getNamespace } from '../../utils/util'

const initState = {}

export default (state = initState, action) => {
  switch (action.type) {
    case LOADING.SHOWLOADING:
      return {
        ...state,
        [getNamespace(action.payload?.type)]: true,
      }
    case LOADING.HIDELOADING:
      return {
        ...state,
        [getNamespace(action.payload?.type)]: false,
      }
    default:
      return state
  }
}
