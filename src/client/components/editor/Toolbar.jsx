import * as React from 'react'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar'

export default function () {
  return (
    <Toolbar>
      <ToolbarGroup>
        <IconMenu
          iconButtonElement={
            <IconButton touch>
              <NavigationExpandMoreIcon />
            </IconButton>
           }
         >
          <MenuItem primaryText='Download' />
          <MenuItem primaryText='More Info' />
        </IconMenu>
      </ToolbarGroup>
    </Toolbar>
  )
}
