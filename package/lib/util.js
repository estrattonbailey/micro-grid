export const isClient = typeof window !== 'undefined'

export const stripWhitespace = (str = '') => str.replace(/\s\s/, ' ').trim()

export const stripExtra = (w = '') => `${w}`.replace(/\.|@/g, '')

export const isNumber = n => typeof n === 'number'

export const cx = (className = '', classes = '') => stripWhitespace(className + ' ' + classes)
