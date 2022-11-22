
const fs = require('fs')

function comprobarUsuario (usuario) { // usuario -> usuario completo que le hemos pasado desde el bucle
  const keyWords = ['usr', 'eme', 'psw', 'age', 'loc', 'fll']
  const userValue = usuario.split(' ')
  const arrayKey = []
  for (let i = 0; i < userValue.length; i++) {
    const userKeys = userValue[i].split(':')
    arrayKey.push(userKeys[0])
  }
  for (let i = 0; i < keyWords.length; i++) {
    const keysInUser = arrayKey.includes(keyWords[i])
    if (!keysInUser) return false
  }

  return true
}

function getUsername (usuario) {
  const fields = usuario.split(' ')
  for (let i = 0; i < fields.length; i++) {
    const [key, value] = fields[i].split(':')
    if (key === 'usr') return value
  }
}

const users = fs.readFileSync('/Users/aresmiro/Desktop/Codember/ejercicio1/users.txt', 'utf8')
const usersSplit = users.split('\n\n')
let userCounter = 0
let lastValidUser
for (let i = 0; i < usersSplit.length; i++) {
  const user = usersSplit[i].replaceAll('\n', ' ')
  if (comprobarUsuario(user)) {
    userCounter++
    lastValidUser = getUsername(user)
  }
}

console.log(lastValidUser)
