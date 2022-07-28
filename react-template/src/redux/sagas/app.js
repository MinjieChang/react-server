import { put, takeEvery } from 'redux-saga/effects'

import call from '../call'
import { APP } from '../actionTypes'
import { queryOperatorDetailAndAuth as queryOperatorDetailAndAuthService } from '../service/app'

export function* queryOperatorDetailAndAuth(payload) {
  const data = yield call(queryOperatorDetailAndAuthService, payload)

  if (data && data.code === 0) {
    yield put({
      type: APP.UPDATE_STATE,
      payload: {},
    })
  }
}

export default function* root() {
  yield takeEvery(APP.QUERY_OPERATOR_DETAIL_AND_AUTH, queryOperatorDetailAndAuth)
}
