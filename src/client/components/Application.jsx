import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import racerTheme from './theme'
import BuggyIcon from './icons/BuggyIcon'
import IconButton from 'material-ui/IconButton'

const darkMuiTheme = getMuiTheme(racerTheme)

export default class extends React.Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div>
          <AppBar
            title='Buggy Racer'
            iconElementLeft={<IconButton><BuggyIcon color='#fff' /></IconButton>}
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
