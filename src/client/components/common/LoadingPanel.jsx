import * as React from 'react'
import LinearProgress from 'material-ui/LinearProgress'

export default function (props) {
  return (
    <div style={props.style}>
      {props.loading ? <LinearProgress
        color='#FFCA28'
        status={props.loading ? 'loading' : 'hide'}
        style={{
          zIndex: 42,
          marginBottom: -4,
          background: 'transparent'
        }}
      /> : null}
      {props.children}
    </div>
  )
}
