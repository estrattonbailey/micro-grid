import React from 'react'
import P from 'prop-types'
import { isClient } from './util.js'
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
    const { w, children } = this.props

    return <div className={toClassName([
      ['width', w],
      ['padding', gutter()]
    ])}>{children}</div>
  }
}
