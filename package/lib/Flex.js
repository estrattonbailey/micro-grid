import React from 'react'
import PropTypes from 'prop-types'
import { isClient, cx } from './util.js'
import { toClassName, writeCSS } from './css.js'

export default class Flex extends React.Component {
  static childContextTypes = {
    gutter: PropTypes.func
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
      gutter: p.gutter || 0
    }
  }

  componentDidMount () {
    isClient && writeCSS()
  }

  componentWillReceiveProps (p) {
    this.setState({
      gutter: p.gutter || 0
    }, () => {
      isClient && writeCSS()
    })
  }

  render () {
    const {
      children,
      className,
      wrap = false,
      alignItems = 'flex-start',
      justifyContent = 'flex-start'
    } = this.props

    return <div className={cx(
      className,
      toClassName({
        margin: this.state.gutter,
        wrap: wrap
      })
    )} style={{
      display: 'flex',
      alignItems: alignItems,
      justifyContent: justifyContent
    }}>{children}</div>
  }
}
