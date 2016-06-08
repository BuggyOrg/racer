import * as React from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator'

export default function (props) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <RefreshIndicator
        loadingColor='rgb(76, 175, 80)'
        size={50}
        left={-25}
        top={48}
        status={props.loading ? 'loading' : 'hide'}
        style={{
          zIndex: 42,
          marginLeft: '50%'
        }}
      />
      {props.children}
    </div>
  )
}
