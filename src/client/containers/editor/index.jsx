import * as React from 'react'
import SplitPane from 'react-split-pane'
import LispEditor from '../../components/editor/LispEditor'
import Sidebar from '../../components/editor/Sidebar'
import '../../res/resizer.css'

export default function () {
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
        />
        <Sidebar />
      </SplitPane>
    </div>
  )
}
