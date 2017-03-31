import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import IconButton from 'material-ui/IconButton'
import racerTheme from './theme'
import BuggyIcon from './icons/BuggyIcon'
import MainMenu from '../containers/MainMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

const darkMuiTheme = getMuiTheme(racerTheme)

export default class extends React.Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div>
          <AppBar
            title={<div style={{ fontSize: 18, fontWeight: 400 }}>Buggy Racer</div>}
            iconElementLeft={<IconButton><BuggyIcon color='#fff' /></IconButton>}
            iconElementRight={<MainMenu iconButtonElement={<IconButton><MoreVertIcon color='#fff' /></IconButton>} />}
            className='appbar'
           />
          <div>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
