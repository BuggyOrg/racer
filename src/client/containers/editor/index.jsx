/* global localStorage, FileReader */
import * as React from 'react'
import { connect } from 'react-redux'
import SplitPane from 'react-split-pane'
import { debounce } from 'lodash'
import FileDragAndDrop from 'react-file-drag-and-drop'
import EnhancedEditor from '../../components/editor/EnhancedEditor'
import Sidebar from '../../components/editor/Sidebar'
import '../../res/resizer.css'
import { setLispCode, compileProgram } from '../../actions'

let cbaInitialized = false

class EditorContainer extends React.Component {
  constructor (props) {
    super(props)
    this.debouncedUpdateGraphs = debounce((code) => this.props.dispatch(compileProgram(code)), 100)
    this.state = {
      percentageSize: parseFloat(localStorage.getItem('splitPosRelative')) || 0.5
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    this.splitPane = null
  }

  handleResize = () => {
    this.splitPane.setState({
      draggedSize: this.state.percentageSize * window.innerWidth
    })
    this.forceUpdate()
    localStorage.setItem('splitPosRelative', this.state.percentageSize)

    this.lispEditor.layout()
    this.sidebar.layout()
  }

  onDragFinished() {
    this.setState({
      percentageSize: this.splitPane.state.draggedSize / window.innerWidth
    })

    this.lispEditor.layout()
    this.sidebar.layout()
  }

  handleCodeChange (code) {
    this.props.dispatch(setLispCode(code))
    this.debouncedUpdateGraphs(code)
  }

  handleLispDrop (data) {
    const reader = new FileReader()
    reader.addEventListener('loadend', (event) => this.handleCodeChange(reader.result))
    reader.readAsText(data.files[0], 'utf8')
  }

  render () {
    const { unresolvedGraph, resolvedGraph, controlFlowGraph, code } = this.props

    return (
      <div>
        <SplitPane
          split='vertical'
          ref={(splitPane) => this.splitPane = splitPane}
          onDragFinished={() => this.onDragFinished()}
          defaultSize={this.state.percentageSize * window.innerWidth}
          minSize={200}
          maxSize={-200}
        >
          <FileDragAndDrop onDrop={(data) => this.handleLispDrop(data)}>
            <EnhancedEditor
              language='lisgy'
              onChange={(code) => this.handleCodeChange(code)}
              annotations={this.props.codeErrors}
              markers={this.props.codeMarkers}
              value={code}
              ref={(editor) => this.lispEditor = editor}
            />
          </FileDragAndDrop>
          <Sidebar
            resolvedGraph={resolvedGraph.value}
            resolvedGraphLoading={resolvedGraph.loading}
            unresolvedGraph={unresolvedGraph.value}
            unresolvedGraphLoading={unresolvedGraph.loading}
            controlFlowGraph={controlFlowGraph.value}
            controlFlowGraphLoading={controlFlowGraph.loading}
            ref={(sidebar) => this.sidebar = sidebar}
          />
        </SplitPane>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    code: state.code,
    codeErrors: state.codeErrors.map((error) => {
      return {
        row: error.location.startLine - 1,
        column: error.location.startCol - 1,
        type: 'error',
        text: error.message
      }
    }),
    codeMarkers: state.codeErrors.map((error) => {
      return {
        startRow: error.location.startLine - 1,
        startCol: error.location.startCol - 1,
        endRow: error.location.endLine - 1,
        endCol: error.location.endCol - 1,
        className: 'ace-marker-error',
        type: 'background',
        text: error.message
      }
    }),
    resolvedGraph: state.resolvedGraph,
    unresolvedGraph: state.unresolvedGraph,
    controlFlowGraph: state.controlFlowGraph,
    powerMode: state.powerMode
  }
})(EditorContainer)
