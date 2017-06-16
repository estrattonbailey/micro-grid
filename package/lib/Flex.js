import React from 'react'
import P from 'prop-types'
import { isClient } from './util.js'
import { toClassName, writeCSS } from './css.js'

export default class Flex extends React.Component {
  static childContextTypes = {
    gutter: P.func
  }

  getChildContext () {
    return {
      gutter: () => {
        return this.state.gutter
      }
    }
  }

  constructor (p) {
    super(p)

    this.state = {
      gutter: p.g || 0
    }
  }

  componentDidMount () {
    isClient && writeCSS()
  }

  componentWillReceiveProps (p) {
    this.setState({
      gutter: p.g || 0
    }, () => {
      isClient && writeCSS()
    })
  }

  render () {
    const { gutter } = this.state
    const { children, center, end } = this.props
    const align = center || end ? (
      center ? 'center' : 'end'
    ) : 'flex-start'

    return <div className={toClassName([
      ['margin', gutter]
    ])} style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: align
    }}>{children}</div>
  }
}
