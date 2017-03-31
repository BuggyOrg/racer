/* global DOMParser, XMLSerializer */
import * as React from 'react'
import _ from 'lodash'

function scale (delta, transform) {
  return [transform[0], transform[1], transform[2] * delta]
}

function translate (x, y, transform) {
  return [transform[0] + x, transform[1] + y, transform[2]]
}

function scaleRelative (delta, anchorX, anchorY, transform) {
  return translate(anchorX / delta, anchorY / delta, scale(delta, translate(-anchorX, -anchorY, transform)))
}

export default class SvgViewer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      transform: [0, 0, 1],
      mouseDown: false,
      moveStartPosition: null
    }
    this.transformSvg(props.svg)
  }

  handleMouseMove (event) {
    const posX = this.state.transformedSvg ? this._svgContainer.querySelector('svg').getBoundingClientRect().left : 0
    const posY = this.state.transformedSvg ? this._svgContainer.querySelector('svg').getBoundingClientRect().top : 0
    this.setState({ mousePosition: { x: event.clientX - posX, y: event.clientY - posY } })

    if (this.state.mouseDown) {
      this.setState({
        transform: translate(event.clientX - this.state.moveStartPosition.x, event.clientY - this.state.moveStartPosition.y, this.state.transform),
        moveStartPosition: {
          x: event.clientX,
          y: event.clientY
        }
      })
    }
  }

  handleMouseDown (event) {
    this.setState({
      mouseDown: true,
      moveStartPosition: {
        x: event.clientX,
        y: event.clientY
      }
    })
  }

  handleMouseUp (event) {
    this.setState({
      mouseDown: false
    })
  }

  handleMouseWheel (event) {
    event.preventDefault()
    if (event.deltaY > 0) {
      this.setState({
        transform: scaleRelative(0.9, this.state.mousePosition.x - this.state.transform[0], this.state.mousePosition.y - this.state.transform[1], this.state.transform)
      })
    } else if (event.deltaY < 0) {
      this.setState({
        transform: scaleRelative(1.1, this.state.mousePosition.x - this.state.transform[0], this.state.mousePosition.y - this.state.transform[1], this.state.transform)
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.svg !== this.props.svg) {
      this.transformSvg(nextProps.svg)
      this.setState({ transform: [0, 0, 1] })
    }
  }

  transformSvg (svgString) {
    if (!svgString) {
      return
    }

    const parser = new DOMParser()
    const doc = parser.parseFromString(svgString, 'image/svg+xml')
    const svg = doc.querySelector('svg')
    if (!svg) {
      return
    }

    const allElements = doc.querySelectorAll('svg > :not(defs)')
    const wrapper = doc.createElement('g')
    svg.appendChild(wrapper)
    svg.removeAttribute('viewBox')
    svg.setAttribute('style', svg.getAttribute('style') ? svg.getAttribute('style') + ';' : '' + 'width:100%;height:100%;display:block')

    _.forEach(allElements, (e) => wrapper.appendChild(e))

    this.setState({ wrapper, transformedSvg: doc })
  }

  render () {
    if (this.state.wrapper) {
      this.state.wrapper.setAttribute('transform', `translate(${this.state.transform[0]}, ${this.state.transform[1]}) scale(${this.state.transform[2]})`)
    }
    const serializer = new XMLSerializer()
    const svg = this.state.transformedSvg ? serializer.serializeToString(this.state.transformedSvg) : ''
    return (
      <div
        style={this.props.style}
        ref={(r) => { this._svgContainer = r }}
        dangerouslySetInnerHTML={{__html: svg}}
        onMouseMove={(event) => this.handleMouseMove(event)}
        onMouseDown={(event) => this.handleMouseDown(event)}
        onMouseUp={(event) => this.handleMouseUp(event)}
        onWheel={(event) => this.handleMouseWheel(event)}
      />
    )
  }
}
