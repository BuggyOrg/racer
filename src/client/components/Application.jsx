import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const darkMuiTheme = getMuiTheme(lightBaseTheme)

export default class extends React.Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div>
          <AppBar
             title="Racer"
           />
          <div>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
