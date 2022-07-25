const fs = require('fs')
const chalk = require('chalk')

const log = console.log
const createFile = (a, b) => {
  fs.writeFileSync('notes.txt', 'New File Created')

  for (var i = 0; i < 5; i++) {
    fs.appendFileSync('notes.txt', `\nNew Line Added : ${i + 1}`)
  }

  const data = fs.readFileSync('notes.txt', 'utf8')

  return data
}

const addNote = (title, body) => {
  const noteJson = loadNote()
  const duplicateNotes = noteJson.find((note) => note.title === title)
  if (!duplicateNotes) {
    noteJson.push({
      title: title,
      body: body
    })
    saveNote(noteJson)
  } else {
    log(chalk.redBright('Error: Duplicate Title'))
  }
}

const removeNote = (title) => {
  const noteJson = loadNote()
  const duplicateNotes = noteJson.filter((note) => {
    return note.title !== title
  })
  if (duplicateNotes.length === noteJson.length) {
    log(chalk.redBright('Error: No Match Found'))
  } else {
    overwriteNote(duplicateNotes)
  }
}

const listNotes = () => {
  const noteJson = loadNote()
  noteJson.sort((a, b) => a.title.localeCompare(b.title))
  if (noteJson.length > 0) {
    console.table(noteJson)
  } else {
    log(chalk.redBright('Error: No Notes Available'))
  }
}

const readNotes = (title) => {
  const noteJson = loadNote()
  const noteAvailable = noteJson.find((note) => note.title === title)
  if (noteAvailable) {
    noteJson.filter((note) => {
      if (note.title === title) { log(chalk.greenBright('Body:', note.body)) }
    })
  } else {
    log(chalk.redBright('Error: No Match Found'))
  }
}
const overwriteNote = (note) => {
  const noteString = JSON.stringify(note)
  fs.writeFileSync('notes.json', noteString)
  log(chalk.greenBright('Note Removed Successfully'))
}

const saveNote = (note) => {
  const noteString = JSON.stringify(note)
  fs.writeFileSync('notes.json', noteString)
  log(chalk.greenBright('Note Added Successfully'))
}

const loadNote = () => {
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
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes
}
