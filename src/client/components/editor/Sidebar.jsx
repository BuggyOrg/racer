import * as React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {Tabs, Tab} from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import { inverted } from '../theme'
import JsonEditor from './JsonEditor'
import LoadingPanel from '../common/LoadingPanel'

const invertedTheme = getMuiTheme(inverted)

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      slideIndex: 0
    }
  }

  handleChange (value) {
    this.setState({ slideIndex: value })
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={invertedTheme}>
        <div style={{ height: '100%' }}>
          <Tabs
            onChange={(value) => this.handleChange(value)}
            value={this.state.slideIndex}
          >
            <Tab label='JSON' value={0} />
            <Tab label='Resolved JSON' value={1} />
            <Tab label='Control flow graph' value={2} />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
            containerStyle={{ height: '100%' }}
            style={{ height: '100%' }}
          >
            <LoadingPanel
              loading={this.props.jsonLoading}
            >
              <JsonEditor
                uniqueId='sidebarJson'
                style={{ height: '100%' }}
                readOnly
                value={this.props.json}
              />
            </LoadingPanel>
            <LoadingPanel
              loading={this.props.resolvedJsonLoading}
            >
              <JsonEditor
                uniqueId='sidebarResolvedJson'
                style={{ height: '100%' }}
                readOnly
                value={this.props.resolvedJson}
              />
            </LoadingPanel>
            <LoadingPanel
              loading={this.props.svgLoading}
            >
              <code>// TODO</code>
            </LoadingPanel>
          </SwipeableViews>
        </div>
      </MuiThemeProvider>
    )
  }
}
