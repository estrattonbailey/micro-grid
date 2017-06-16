let style = null

const rules = {}

const defs = {
  padding: val => `{ padding-left: ${val/2}em; padding-right: ${val/2}em; }`,
  margin: val => `{ margin-left: -${val/2}em; margin-right: -${val/2}em; }`,
  width: val => `{ width: ${val * 100}% }`
}

const prefixes = {
  padding: 'p_',
  margin: 'm_',
  width: 'w_'
}

const strip = w => `${w}`.replace(/\.|@/g, '')

const define = (type, c, value) => `.${c} ${defs[type](value)}`

const createClassName = (type, value, breakpoint) =>
  `${prefixes[type]}${value}${breakpoint ? '--' + breakpoint : ''}`

const getClassName = (type, value) => {
  let c = ' '

  if (Array.isArray(value)) {
    value.map(([ breakpoint, val ]) => {
      if (!val) {
        const cn = createClassName(type, strip(breakpoint))
        rules[cn] = define(type, cn, breakpoint)
        c += cn + ' '
        return
      }

      const cn = createClassName(type, strip(val), breakpoint)

      rules[`@${breakpoint}`] = rules[`@${breakpoint}`] || {}

      rules[`@${breakpoint}`][cn] = define(type, cn, val)

      c += cn + ' '
    })
  } else {
    c = createClassName(type, strip(value))
    rules[c] = define(type, c, value)
  }

  return c
}

export const getCSS = (_rules = rules) => {
  let base = ''
  let breaks = ''

  Object.keys(_rules).forEach(key => {
    if (/@/.test(key)) {
      breaks += `@media (min-width: ${strip(key) / 16}em) { ${getCSS(_rules[key])} }`
    } else {
      base += _rules[key] + ' '
    }
  })

  return base + ' ' + breaks
}

export const writeCSS = () => {
  if (!style) {
    style = document.createElement('style')
    style.id = 'grid-style'
    document.head.appendChild(style)
  }

  style.innerHTML = getCSS(rules)
}

export const toClassName = arr => {
  return arr.reduce((res, [ type, value ]) => {
    res += getClassName(type, value) + ' '
    return res
  }, '').replace(/\s\s/g, ' ').trim()
}
