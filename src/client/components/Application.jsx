import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import racerTheme from './theme'
import BuggyIcon from './icons/BuggyIcon'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import BuggyMenu from './BuggyMenu'

const darkMuiTheme = getMuiTheme(racerTheme)

export default class extends React.Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div>
          <AppBar
            title='Buggy Racer'
            iconElementLeft={<IconButton><BuggyIcon color='#fff' /></IconButton>}
            iconElementRight={<BuggyMenu
              iconButtonElement={<IconButton><MoreVertIcon color='#fff' /></IconButton>} 
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}/>}
           />
          <div>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
