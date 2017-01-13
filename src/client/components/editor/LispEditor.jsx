import React, { PropTypes } from 'react'
import MonacoEditor from 'react-monaco-editor'

export default function LispEditor (props) {
  return (
    <div
      style={{
        width: props.width || '100%',
        height: props.height || '100%',
        overflow: 'hidden'
      }}
    >
      <MonacoEditor
        width={props.width || '100%'}
        height={props.height || '100%'}
        language='lisp'
        value={props.value}
        options={{
          readOnly: props.readOnly
        }}
      />
    </div>
  )
}

LispEditor.propTypes = {
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
