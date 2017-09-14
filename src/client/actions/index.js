/* global Blob, localStorage */
import qwest from 'qwest'
import { SET_RESOLVED_GRAPH, SET_CODE, SET_RESOLVED_GRAPH_LOADING,
         SET_UNRESOLVED_GRAPH, SET_UNRESOLVED_GRAPH_LOADING,
         SET_CONTROL_FLOW_GRAPH, SET_CONTROL_FLOW_GRAPH_LOADING,
         SET_CODE_ERRORS, TOGGLE_POWER_MODE } from './constants'

let previousCompileRequest
export function compileProgram (code) {
  return (dispatch) => {
    dispatch({ type: SET_RESOLVED_GRAPH_LOADING, loading: true })
    dispatch({ type: SET_UNRESOLVED_GRAPH_LOADING, loading: true })
    dispatch({ type: SET_CONTROL_FLOW_GRAPH_LOADING, loading: true })

    if (previousCompileRequest != null) {
      previousCompileRequest.abort()
    }
    previousCompileRequest = qwest.post('/api/lisgy/parse?type=all', new Blob([code], { type: 'text/plain' }))
    .then((xhr, { unresolved, resolved, kgraph }) => {
      dispatch({ type: SET_CODE_ERRORS, errors: [] })
      dispatch({ type: SET_UNRESOLVED_GRAPH, graph: unresolved })
      dispatch({ type: SET_RESOLVED_GRAPH, graph: resolved })
      dispatch({ type: SET_CONTROL_FLOW_GRAPH, graph: kgraph })
    })
    .catch((e, xhr, response) => {
      dispatch({ type: SET_CODE_ERRORS, errors: [response.error] })
    })
    .complete(() => {
      dispatch({ type: SET_RESOLVED_GRAPH_LOADING, loading: false })
      dispatch({ type: SET_UNRESOLVED_GRAPH_LOADING, loading: false })
      dispatch({ type: SET_CONTROL_FLOW_GRAPH_LOADING, loading: false })
    })
  }
}

export function setLispCode (code) {
  localStorage.setItem('code', code)
  return { type: SET_CODE, code }
}

export function togglePowerMode () {
  return { type: TOGGLE_POWER_MODE }
}
