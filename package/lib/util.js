import h from '@f/hash-str'

export const hash = s => h(s)

export const isClient = typeof window !== 'undefined'

export const strip = (str = '') => str.replace(/\s\s/, ' ').trim()

export const isNum = n => typeof n === 'number'

export const isArr = a => Array.isArray(a)

export const keys = o => Object.keys(o)

export const cx = (className = '', classes = '') => strip(className + ' ' + classes)
