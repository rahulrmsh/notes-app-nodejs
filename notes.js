const fs = require('fs')
const chalk = require('chalk')

const log = console.log
const createFile = function (a, b) {
  fs.writeFileSync('notes.txt', 'New File Created')

  for (var i = 0; i < 5; i++) {
    fs.appendFileSync('notes.txt', `\nNew Line Added : ${i + 1}`)
  }

  const data = fs.readFileSync('notes.txt', 'utf8')

  return data
}

const addNote = function (title, body) {
  const noteJson = loadNote()
  const duplicateNotes = noteJson.filter(function (note) {
    return note.title === title
  })
  if (duplicateNotes.length === 0) {
    noteJson.push({
      title: title,
      body: body
    })
    saveNote(noteJson)
  } else {
    log(chalk.redBright('Error: Duplicate Title'))
  }
}

const removeNote = function (title) {
  const noteJson = loadNote()
  const duplicateNotes = noteJson.filter(function (note) {
    return note.title !== title
  })
  if (duplicateNotes.length === noteJson.length) {
    log(chalk.redBright('Error: No Match Found'))
  } else {
    overwriteNote(duplicateNotes)
  }
}

const overwriteNote = function (note) {
  const noteString = JSON.stringify(note)
  fs.writeFileSync('notes.json', noteString)
  log(chalk.greenBright('Note Removed Successfully'))
}
const saveNote = function (note) {
  const noteString = JSON.stringify(note)
  fs.writeFileSync('notes.json', noteString)
  log(chalk.greenBright('Note Added Successfully'))
}

const loadNote = function () {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const data = dataBuffer.toString()
    return JSON.parse(data)
  } catch (err) {
    return []
  }
}

module.exports = {
  createFile: createFile,
  addNote: addNote,
  removeNote: removeNote
}
