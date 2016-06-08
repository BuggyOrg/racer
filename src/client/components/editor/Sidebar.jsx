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
              loading={this.props.unresolvedGraphLoading}
              style={{ height: 'calc(100% - 53px)', width: '100%' }}
            >
              <JsonEditor
                uniqueId='sidebarJson'
                readOnly
                value={JSON.stringify(this.props.unresolvedGraph || {}, null, 2)}
              />
            </LoadingPanel>
            <LoadingPanel
              loading={this.props.resolvedGraphLoading}
              style={{ height: 'calc(100% - 53px)', width: '100%' }}
            >
              <JsonEditor
                uniqueId='sidebarResolvedJson'
                readOnly
                value={JSON.stringify(this.props.resolvedGraph || {}, null, 2)}
              />
            </LoadingPanel>
            <LoadingPanel
              style={{ height: 'calc(100% - 53px)', width: '100%' }}
              loading={this.props.controlFlowGraphLoading}
            >
              <span dangerouslySetInnerHTML={{__html: this.props.controlFlowGraph}} />
            </LoadingPanel>
          </SwipeableViews>
        </div>
      </MuiThemeProvider>
    )
  }
}
