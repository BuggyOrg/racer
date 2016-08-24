import * as React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Divider from 'material-ui/Divider'
import Folder from 'material-ui/svg-icons/file/folder'
import Save from 'material-ui/svg-icons/content/save'
import { connect } from 'react-redux'

class MainMenu extends React.Component {
  handleOpenFile () {
    console.log('open')
  }

  handleSaveFile () {
    console.log('save')
  }

  handleExportGraph () {
    console.log('export graph')
  }

  render () {
    return (
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
          onTouchTap={() => this.handleOpenFile()}
        />
        <MenuItem
          primaryText="Save as"
          secondaryText="Ctrl + S"
          leftIcon={<Save />}
          onTouchTap={() => this.handleSaveFile()}
        />
        <Divider />
        <MenuItem
          primaryText="Export graph" 
          insetChildren
          onTouchTap={() => this.handleExportGraph()}
        />
        <Divider />
        <MenuItem
          primaryText="Power mode"
          insetChildren
          disabled
          checked={this.props.powerMode}
        />
      </IconMenu>
    )
  }
}

export default connect((state) => {
  return {
    code: state.code,
    controlFlowGraph: state.controlFlowGraph,
    powerMode: false
  }
})(MainMenu)
