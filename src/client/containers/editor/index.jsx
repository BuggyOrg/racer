/* global localStorage */
import * as React from 'react'
import { connect } from 'react-redux'
import SplitPane from 'react-split-pane'
import { debounce } from 'lodash'
import LispEditor from '../../components/editor/LispEditor'
import Sidebar from '../../components/editor/Sidebar'
import '../../res/resizer.css'
import { setLispCode, compileProgram } from '../../actions'

class EditorContainer extends React.Component {
  constructor (props) {
    super(props)
    this.debouncedUpdateGraphs = debounce((code) => this.props.dispatch(compileProgram(code)), 100)
  }

  handleCodeChange (code) {
    this.props.dispatch(setLispCode(code))
    this.debouncedUpdateGraphs(code)
  }

  render () {
    const { unresolvedGraph, resolvedGraph, controlFlowGraph, code } = this.props

    return (
      <div>
        <SplitPane
          split='vertical'
          minSize={200}
          defaultSize={localStorage.getItem('splitPos') || 300}
          onChange={(size) => localStorage.setItem('splitPos', size)}
        >
          <LispEditor
            uniqueId='mainAceEditor'
            onChange={(code) => this.handleCodeChange(code)}
            value={code}
          />
          <Sidebar
            resolvedGraph={resolvedGraph.value}
            resolvedGraphLoading={resolvedGraph.loading}
            unresolvedGraph={unresolvedGraph.value}
            unresolvedGraphLoading={unresolvedGraph.loading}
            controlFlowGraph={controlFlowGraph.value}
            controlFlowGraphLoading={controlFlowGraph.loading}
          />
        </SplitPane>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    code: state.code,
    resolvedGraph: state.resolvedGraph,
    unresolvedGraph: state.unresolvedGraph,
    controlFlowGraph: state.controlFlowGraph
  }
})(EditorContainer)
