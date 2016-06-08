/* global Blob */
import qwest from 'qwest'
import { SET_RESOLVED_GRAPH, SET_CODE, SET_RESOLVED_GRAPH_LOADING,
         SET_UNRESOLVED_GRAPH, SET_UNRESOLVED_GRAPH_LOADING,
         SET_CONTROL_FLOW_GRAPH, SET_CONTROL_FLOW_GRAPH_LOADING } from './constants'

export function compileProgram (code) {
  return (dispatch) => {
    dispatch({ type: SET_RESOLVED_GRAPH_LOADING, loading: true })
    dispatch({ type: SET_UNRESOLVED_GRAPH_LOADING, loading: true })
      dispatch({ type: SET_CONTROL_FLOW_GRAPH_LOADING, loading: true })
    qwest.post('/api/lisgy/parse', new Blob([code], { type: 'text/plain' }))
         .post('/api/lisgy/parse?type=unresolved', new Blob([code], { type: 'text/plain' }))
         .post('/api/lisgy/parse?type=svg', new Blob([code], { type: 'text/plain' }))
    .then(([[, resolved], [, unresolved], [, svg]]) => {
      dispatch({ type: SET_RESOLVED_GRAPH, graph: resolved })
      dispatch({ type: SET_UNRESOLVED_GRAPH, graph: unresolved })
      dispatch({ type: SET_CONTROL_FLOW_GRAPH, graph: svg })
    })
    .catch(() => {
      dispatch({ type: SET_RESOLVED_GRAPH_LOADING, loading: false })
      dispatch({ type: SET_UNRESOLVED_GRAPH_LOADING, loading: false })
      dispatch({ type: SET_CONTROL_FLOW_GRAPH_LOADING, loading: false })
    })
  }
}

export function setLispCode (code) {
  return { type: SET_CODE, code }
}
