import { render } from 'react-dom'
import * as React from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import reactTapEventPlugin from 'react-tap-event-plugin'
reactTapEventPlugin()

import configureStore from './stores/configureStore'
import createRootRoute from './AppRoutes'

import './res/manifest.json'
import './res/style.css'

const store = configureStore({})
const history = syncHistoryWithStore(browserHistory, store)

render(
  (
  <Provider store={store}>
    <Router
      history={history}
      routes={createRootRoute(store)}
    />
  </Provider>
  ),
  document.getElementById('react-target')
)
