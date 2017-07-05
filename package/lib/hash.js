let itt = 1
let code = 97

const hashes = {}

const hash = (val, res = '') => {
  for (let i = 0; i < itt; i++) {
    res += String.fromCharCode(code)
  }

  if (code > 121) {
    code = 97
    itt++
  } else {
    code++ 
  }

  hashes[val] = res

  return res
}

export default val => hashes[val] || hash(val)
