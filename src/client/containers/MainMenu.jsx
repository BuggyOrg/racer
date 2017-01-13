import * as React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Divider from 'material-ui/Divider'
import Folder from 'material-ui/svg-icons/file/folder'
import Save from 'material-ui/svg-icons/content/save'
import { connect } from 'react-redux'
import { saveAs } from 'file-saver'
import { setLispCode, compileProgram, togglePowerMode } from '../actions'

class MainMenu extends React.Component {
  componentDidMount () {
    window.addEventListener('keydown', this.handleShortcutKeys)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleShortcutKeys)
  }

  handleShortcutKeys = (e) => {
    if (e.key === 'o' && e.ctrlKey) {
      this.openInput.click()
      e.preventDefault()
    } else if (e.key === 's' && e.ctrlKey) {
      this.handleSaveFile()
      e.preventDefault()
    }
  }

  handleOpenFile (e) {
    const files = e.target.files
    if (files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('loadend', (event) => {    
        this.props.dispatch(setLispCode(reader.result))
        this.props.dispatch(compileProgram())
      })
      reader.readAsText(files[0], 'utf8')
    }
  }

  handleSaveFile () {
    saveAs(new File([this.props.code], "code.clj", { type: 'text/plain;charset=utf-8' }))
  }

  handleExportGraph () {
    saveAs(new File([this.props.controlFlowGraph], "code.svg", { type: 'image/svg+xml;charset=utf-8' }))
  }

  render () {
    return (
      <div>
        <IconMenu
          {...this.props}
          anchorOrigin={{horizontal: 'right', vertical: 'center'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          menuStyle={{ width: 200 }}
          desktop
        >
          <MenuItem
            primaryText="Open"
            secondaryText="Ctrl + O"
            leftIcon={<Folder />}
            onTouchTap={(e) => { this.openInput.click(); e.stopPropagation() }}
          />
          <MenuItem
            primaryText="Save"
            secondaryText="Ctrl + S"
            leftIcon={<Save />}
            onTouchTap={() => this.handleSaveFile()}
          />
          <Divider />
          <MenuItem
            primaryText="Export graph" 
            insetChildren
            onTouchTap={() => this.handleExportGraph()}
            disabled={!this.props.controlFlowGraph}
          />
          <Divider />
          <MenuItem
            primaryText="Power mode"
            insetChildren
            checked={this.props.powerMode}
            onTouchTap={() => this.props.dispatch(togglePowerMode())}
            disabled
          />
        </IconMenu>
        <div
          style={{ position: 'fixed', top: -200 }}
        >
          <input
            type="file"
            ref={(ref) => this.openInput = ref}
            onChange={(e) => this.handleOpenFile(e)}
            accept=".clj,text/*"
          />
        </div>
      </div>
    )
  }
}

export default connect((state) => {
  return {
    code: state.code,
    controlFlowGraph: state.controlFlowGraph.value,
    powerMode: state.powerMode
  }
})(MainMenu)
