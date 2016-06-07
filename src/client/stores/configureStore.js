import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerReducer } from 'react-router-redux'
import * as reducers from '../reducers'

function createRootReducer(reducers) {
  return combineReducers({ ...reducers, routing: routerReducer })
}

export default function (initialState) {
  const store = createStore(
    createRootReducer(reducers),
    initialState,
    compose(
      applyMiddleware(thunk),
      process.env.NODE_ENV !== 'production' && window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/index', () => {
      store.replaceReducer(createRootReducer(require('../reducers')))
    })
  }

  return store
}
