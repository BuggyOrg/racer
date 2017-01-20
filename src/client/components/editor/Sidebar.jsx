import * as React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {Tabs, Tab} from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import { inverted } from '../theme'
import JsonEditor from './JsonEditor'
import LoadingPanel from '../common/LoadingPanel'
import SvgViewer from '../SvgViewer'

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

  layout () {
    this.jsonEditor.layout()
    this.resolvedJsonEditor.layout()
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
            onChangeIndex={(value) => this.handleChange(value)}
            containerStyle={{ height: '100%' }}
            slideStyle={{ height: 'calc(100% - 48px)' }}
            style={{ height: '100%' }}
          >
            <LoadingPanel
              loading={this.props.unresolvedGraphLoading}
              style={{ height: '100%', width: '100%' }}
            >
              <JsonEditor
                ref={(editor) => this.jsonEditor = editor}
                uniqueId='sidebarJson'
                readOnly
                value={JSON.stringify(this.props.unresolvedGraph || {}, null, 2)}
              />
            </LoadingPanel>
            <LoadingPanel
              loading={this.props.resolvedGraphLoading}
              style={{ height: '100%', width: '100%' }}
            >
              <JsonEditor
                ref={(editor) => this.resolvedJsonEditor = editor}
                uniqueId='sidebarResolvedJson'
                readOnly
                value={JSON.stringify(this.props.resolvedGraph || {}, null, 2)}
              />
            </LoadingPanel>
            <LoadingPanel
              style={{ height: '100%', width: '100%' }}
              loading={this.props.controlFlowGraphLoading}
            >
              <SvgViewer
                style={{ height: '100%', width: '100%' }}
                svg={this.props.controlFlowGraph}
              />
            </LoadingPanel>
          </SwipeableViews>
        </div>
      </MuiThemeProvider>
    )
  }
}
