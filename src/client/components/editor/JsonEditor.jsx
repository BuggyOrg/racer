import * as React from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/theme/github'

export default function (props) {
  return (
    <AceEditor
      {...props}
      mode='lisp'
      theme='github'
      name={props.uniqueId}
      editorProps={{$blockScrolling: true}}
      width='100%'
      height='100%'
    />
  )
}
