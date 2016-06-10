import * as React from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/json'
import 'brace/theme/github'

export default function (props) {
  return (
    <AceEditor
      {...props}
      mode='json'
      theme='github'
      name={props.uniqueId}
      editorProps={{$blockScrolling: Infinity}}
      setOptions={{
        showFoldWidgets: true,
        foldStyle: 'markbegin'
      }}
      width='100%'
      height='100%'
    />
  )
}
