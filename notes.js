const fs = require('fs')

const createFile = function (a, b) {
  fs.writeFileSync('notes.txt', 'New File Created')

  for (var i = 0; i < 5; i++) {
    fs.appendFileSync('notes.txt', `\nNew Line Added : ${i + 1}`)
  }

  const data = fs.readFileSync('notes.txt', 'utf8')

  return data
}

module.exports = (createFile)
