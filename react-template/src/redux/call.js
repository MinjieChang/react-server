import { call } from 'redux-saga/effects'
import { message } from 'antd'
import _store from './store'
import { LOADING } from './actionTypes'
import { getNamespace } from '../utils/util'

const flag = {}

export default function* callWithLoadingStatus(fn, effect, options = {}) {
  const { loading = true, loadingName } = options
  const loadingPayload = loadingName ? { type: loadingName } : effect
  const name = getNamespace(loadingPayload?.type)
  if (loading) {
    if (!flag[name]) {
      flag[name] = 1
    } else {
      flag[name]++
    }
    yield _store.dispatch({
      type: LOADING.SHOWLOADING,
      payload: loadingName ? { type: loadingName } : effect,
    })
  }
  let response = null
  try {
    response = yield call(fn, effect.payload)
  } catch (error) {
    message.error(error?.message)
  } finally {
    if (loading) {
      flag[name]--
      if (flag[name] === 0) {
        yield _store.dispatch({
          type: LOADING.HIDELOADING,
          payload: loadingName ? { type: loadingName } : effect,
        })
      }
    }
  }
  return response
}
