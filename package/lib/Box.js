import React from 'react'
import PropTypes from 'prop-types'
import { isClient, cx } from './util.js'
import { toClassName, writeCSS } from './css.js'

export default class Box extends React.Component {
  static contextTypes = {
    gutter: PropTypes.func
  }

  componentDidMount () {
    isClient && writeCSS()
  }

  componentWillReceiveProps (p) {
    isClient && writeCSS()
  }

  render () {
    const gutter = this.context.gutter()

    const {
      width = 1,
      offset,
      order,
      className,
      children
    } = this.props


    const cn = {
      width,
      ...(offset ? { offset } : {}),
      ...(order ? { order } : {}),
      ...(gutter ? { padding: gutter } : {})
    }

    return <div className={cx(className, toClassName(cn))}>{children}</div>
  }
}
