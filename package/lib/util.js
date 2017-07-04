export const sanitize = s => s.replace(/[^A-z0-9]/g, '')

export const isClient = typeof window !== 'undefined'

export const strip = (str = '') => str.replace(/\s\s/, ' ').trim()

export const isNum = n => typeof n === 'number'

export const isArr = a => Array.isArray(a)

export const keys = o => Object.keys(o)

export const cx = (className = '', classes = '') => strip(className + ' ' + classes)
