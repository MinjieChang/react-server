import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'

import reducer from './reducers'
import rootSaga from './sagas/index'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store
