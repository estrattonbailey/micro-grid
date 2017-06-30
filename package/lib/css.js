// import hash from '@f/hash-str'
import { strip, isNum, isArr, keys } from './util.js'

const hash = s => s.replace(/[^A-z0-9]/g,'').slice(0,2)

let style = null

const rules = {
  base: {},
  breakpoints: {}
}

const defs = {
  padding: val => `{ padding-left: ${val/2}em; padding-right: ${val/2}em; }`,
  margin: val => `{ margin-left: -${val/2}em; margin-right: -${val/2}em; }`,
  width: val => (
    /auto/.test(val) ? (
      `{ flex: 1 1 auto; min-width: 0; min-height: 0; }`
    ) : (
      `{ width: ${isNum(val) ? (val * 100) + '%' : val} }`
    )
  ),
  wrap: bool => `{ flex-wrap: ${bool ? 'wrap' : 'nowrap'} }`,
  order: num => `{ order: ${num} }`,
  offset: val => `{ margin-left: ${isNum(val) ? (val * 100) + '%' : val} }`
}

const prefixes = {
  padding: 'p',
  margin: 'm',
  width: 'w',
  wrap: 'wrap',
  order: 'order',
  offset: 'offset',
}

const define = (tp, cn, val) => `.${cn} ${defs[tp](val)}`

const createClassName = (tp, conf) => {
  const [ bp, val ] = isArr(conf) ? conf : [ null, conf ]

  const cn = `⚡️${hash(tp) + hash(`${val}`)}${bp ? '--' + bp : ''}`

  !!bp ? (
    rules.breakpoints[`${bp}`] = {
      ...rules.breakpoints[`${bp}`] || {},
      [cn]: define(tp, cn, val)
    }
  ) : rules.base[cn] = define(tp, cn, val)

  return cn
}

const getClassName = (tp, conf) => {
  let cn = ' '

  isArr(conf) ? (
    cn += conf.reduce((c, v) => {
      c += createClassName(tp, v) + ' '
      return c
    }, '') + ' '
  ) : (
    cn += createClassName(tp, conf) + ' '
  )

  return cn
}

const writeDefs = rules => keys(rules).reduce((def, cn) => {
  def += rules[cn] + ' '
  return def
}, '')

export const getCSS = () => {
  const base = writeDefs(rules.base)

  const breakpoints = keys(rules.breakpoints)
    .sort((a, b) => a - b)
    .reduce((def, bp) => {
      def += `@media (min-width: ${parseInt(bp) / 16}em) { ${writeDefs(rules.breakpoints[bp])} }`
      return def
    }, '')

  return `/* @see https://git.io/micro-grid */${strip(base + ' ' + breakpoints)}`
}

export const writeCSS = () => {
  if (!style) {
    style = document.createElement('style')
    style.id = 'grid-style'
    document.head.appendChild(style)
  }
  style.innerHTML = getCSS()
}

export const toClassName = conf => strip(
  keys(conf).reduce((cn, k) => {
    cn += getClassName(k, conf[k])
    return cn
  }, '')
)
