import * as React from 'react'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import RaisedButton from 'material-ui/RaisedButton'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'

export default function () {
  return (
    <Toolbar>
       <ToolbarGroup>
         <IconMenu
           iconButtonElement={
             <IconButton touch={true}>
               <NavigationExpandMoreIcon />
             </IconButton>
           }
         >
           <MenuItem primaryText="Download" />
           <MenuItem primaryText="More Info" />
         </IconMenu>
       </ToolbarGroup>
     </Toolbar>
  )
}