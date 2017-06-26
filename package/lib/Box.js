import React from 'react'
import P from 'prop-types'
import { isClient, cx } from './util.js'
import { toClassName, writeCSS } from './css.js'

export default class Box extends React.Component {
  static contextTypes = {
    gutter: P.func
  }

  componentDidMount () {
    isClient && writeCSS()
  }

  componentWillReceiveProps (p) {
    isClient && writeCSS()
  }

  render () {
    const { gutter } = this.context
    const { width, className, children } = this.props

    return <div className={cx(
      className,
      toClassName([
        ['width', width],
        ['padding', gutter()]
      ])
    )}>{children}</div>
  }
}
