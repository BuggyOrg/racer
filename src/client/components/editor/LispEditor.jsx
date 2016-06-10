import * as React from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/clojure'
import 'brace/theme/github'

export default function (props) {
  return (
    <AceEditor
      {...props}
      mode='clojure'
      theme='github'
      name={props.uniqueId}
      editorProps={{$blockScrolling: Infinity}}
      width='100%'
      height='100%'
    />
  )
}
