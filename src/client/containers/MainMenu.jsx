import * as React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Divider from 'material-ui/Divider'
import Folder from 'material-ui/svg-icons/file/folder'
import Save from 'material-ui/svg-icons/content/save'

export default class extends React.Component {
  render () {
    return (
      <IconMenu
        {...this.props}
        anchorOrigin={{horizontal: 'right', vertical: 'center'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        menuStyle={{ width: 200 }}
        desktop
      >
        <MenuItem primaryText="Open" secondaryText="Ctrl + O" leftIcon={<Folder />} />
        <MenuItem primaryText="Save as" secondaryText="Ctrl + S" leftIcon={<Save />} />
        <Divider />
        <MenuItem primaryText="Export graph" insetChildren />
        <Divider />
        <MenuItem primaryText="Power mode" insetChildren />
      </IconMenu>
    )
  }
}
