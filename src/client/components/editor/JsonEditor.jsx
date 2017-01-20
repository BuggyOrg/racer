import React, { Component, PropTypes } from 'react'
import MonacoEditor from 'react-monaco-editor'

export default class JsonEditor extends Component {
  constructor (props) {
    super(props)
  }

  layout () {
    if (this.editor != null) {
      this.editor.layout()
    }
  }

  componentWillUnmount () {
    this.editor = null
  }

  render () {
    const { width, height, readOnly, value } = this.props

    return (
      <div
        style={{
          width: width || '100%',
          height: height || '100%',
          overflow: 'hidden'
        }}
      >
        <MonacoEditor
          width={width || '100%'}
          height={height || '100%'}
          language='json'
          value={value}
          options={{
            readOnly: false && readOnly,
            folding: true
          }}
          editorDidMount={(editor) => this.editor = editor}
        />
      </div>
    )
  }
}

JsonEditor.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.shape({
    // TODO
  })),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  markers: PropTypes.arrayOf(PropTypes.shape({
    // TODO
  })),
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}
