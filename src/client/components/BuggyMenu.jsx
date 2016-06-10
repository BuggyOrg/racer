import * as React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

export default function (props) {
  return (
    <IconMenu
      {...props}
      desktop
      width={256}
    >
      <MenuItem primaryText="Save as…" secondaryText="Ctrl+S" />
      <MenuItem primaryText="Report a bug" />
    </IconMenu>
  )
}
