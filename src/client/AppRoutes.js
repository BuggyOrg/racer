import Application from './components/Application'
import IndexRoute from './routes/index'

export default (store) => {
  return {
    component: 'div',
    childRoutes: [{
      path: '/',
      component: Application,
      indexRoute: IndexRoute(store),
      childRoutes: []
    }]
  }
}
