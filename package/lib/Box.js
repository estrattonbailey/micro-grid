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
    const {
      width = [[1]],
      offset,
      order,
      className,
      children
    } = this.props

    const cn = [
      ['width', width]
    ]

    offset && cn.push(['offset', offset])
    order && cn.push(['order', order])
    gutter() && cn.push(['padding', gutter()])

    return <div className={cx(
      className,
      toClassName(cn)
    )}>{children}</div>
  }
}
