import hash from '@f/hash-str'
import { stripWhitespace, stripExtra, isNumber } from './util.js'

let style = null

const rules = {}

const defs = {
  padding: val =>
    `{ padding-left: ${val/2}em; padding-right: ${val/2}em; }`,
  margin: val =>
    `{ margin-left: -${val/2}em; margin-right: -${val/2}em; }`,
  width: val => (
    /auto/.test(val) ? (
      `{ flex: 1 1 auto; min-width: 0; min-height: 0; }`
    ) : (
      `{ width: ${isNumber(val) ? (val * 100) + '%' : val} }`
    )
  ),
  wrap: bool => `{ flex-wrap: ${bool ? 'wrap' : 'nowrap'} }`,
  order: num => `{ order: ${num} }`,
  offset: val => `{ margin-left: ${isNumber(val) ? (val * 100) + '%' : val} }`
}

const prefixes = {
  padding: 'p',
  margin: 'm',
  width: 'w',
  wrap: 'wrap',
  order: 'order',
  offset: 'offset',
}

const define = (type, c, value) => `.${c} ${defs[type](value)}`

const createClassName = (type, value, breakpoint) =>
  `${prefixes[type]}${hash(value)}${breakpoint ? '--' + breakpoint : ''}`


window.hash = hash

const getClassName = (type, value) => {
  let c = ' '

  if (Array.isArray(value)) {
    value.map(([ breakpoint, val ]) => {
      if (val === undefined) {
        val = breakpoint
        const cn = createClassName(type, stripExtra(`${val}`))
        rules[cn] = define(type, cn, val)
        c += cn + ' '
        return
      }

      const cn = createClassName(type, stripExtra(`${val}`), breakpoint)

      rules[`@${breakpoint}`] = rules[`@${breakpoint}`] || {}

      rules[`@${breakpoint}`][cn] = define(type, cn, val)

      c += cn + ' '
    })
  } else {
    c = createClassName(type, stripExtra(`${value}`))
    rules[c] = define(type, c, value)
  }

  return c
}

export const getCSS = (_rules = rules) => {
  let base = ''
  let breaks = ''

  Object.keys(_rules).forEach(key => {
    if (/@/.test(key)) {
      breaks += `@media (min-width: ${stripExtra(key) / 16}em) { ${getCSS(_rules[key])} }`
    } else {
      base += _rules[key] + ' '
    }
  })

  return stripWhitespace(base + ' ' + breaks)
} 
export const writeCSS = () => {
  if (!style) {
    style = document.createElement('style')
    style.id = 'grid-style'
    document.head.appendChild(style)
  }

  style.innerHTML = getCSS(rules)
}

export const toClassName = arr => stripWhitespace(
  arr.reduce(
    (res, [ type, value ]) => {
      res += getClassName(type, value) + ' '
      return res
    },
    ''
  )
)
