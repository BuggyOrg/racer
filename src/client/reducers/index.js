import { SET_CODE, SET_RESOLVED_GRAPH, SET_RESOLVED_GRAPH_LOADING,
         SET_UNRESOLVED_GRAPH, SET_UNRESOLVED_GRAPH_LOADING,
         SET_CONTROL_FLOW_GRAPH, SET_CONTROL_FLOW_GRAPH_LOADING,
         SET_CODE_ERRORS, TOGGLE_POWER_MODE } from '../actions/constants'
import { checkSyntax } from '@buggyorg/lisgy'

export function code (state = '', action) {
  switch (action.type) {
    case SET_CODE:
      return action.code || ''
    default:
      return state
  }
}

export function codeErrors (state = [], action) {
  switch (action.type) {
    case SET_CODE: {
      const { errorMessage, errorLocation } = checkSyntax(action.code || '')
      return state.filter((e) => e.type !== 'syntax')
                  .concat(errorMessage ? [{
        location: {
          startCol: errorLocation.startCol,
          startLine: errorLocation.startLine,
          endCol: errorLocation.endLine === errorLocation.startLine ? Math.max(errorLocation.endCol, errorLocation.startCol + 1) : errorLocation.endCol,
          endLine: errorLocation.endLine,
        },
        message: errorMessage,
        type: 'syntax'
      }] : [])
    }
    case SET_CODE_ERRORS: {
      return state.filter((e) => e.type === 'syntax')
                  .concat(action.errors.filter((e) => e.errorMessage).map(({ errorMessage, errorLocation }) => {
        return {
          location: {
            startCol: errorLocation.startCol,
            startLine: errorLocation.startLine,
            endCol: errorLocation.endLine === errorLocation.startLine ? Math.max(errorLocation.endCol, errorLocation.startCol + 1) : errorLocation.endCol,
            endLine: errorLocation.endLine,
          },
          message: errorMessage
        }
      }))
    }
    default:
      return state
  }
}

export function resolvedGraph (state = { loading: false, value: '' }, action) {
  switch (action.type) {
    case SET_RESOLVED_GRAPH:
      return { ...state, value: action.graph, loading: false }
    case SET_RESOLVED_GRAPH_LOADING:
      return { ...state, loading: action.loading }
    default:
      return state
  }
}

export function unresolvedGraph (state = { loading: false, value: '' }, action) {
  switch (action.type) {
    case SET_UNRESOLVED_GRAPH:
      return { ...state, value: action.graph, loading: false }
    case SET_UNRESOLVED_GRAPH_LOADING:
      return { ...state, loading: action.loading }
    default:
      return state
  }
}

export function controlFlowGraph (state = { loading: false, value: '' }, action) {
  switch (action.type) {
    case SET_CONTROL_FLOW_GRAPH:
      return { ...state, value: action.graph, loading: false }
    case SET_CONTROL_FLOW_GRAPH_LOADING:
      return { ...state, loading: action.loading }
    default:
      return state
  }
}

export function powerMode (state = false, action) {
  switch (action.type) {
    case TOGGLE_POWER_MODE:
      return !state
    default:
      return state
  }
}
