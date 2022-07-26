const notes = require('./notes')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const chalk = require('chalk')

const log = console.log
const argv = hideBin(process.argv)

yargs(argv)
  .command({
    command: 'add',
    describe: 'Add notes',
    builder: {
      title: {
        describe: 'Title of note',
        demandOption: true,
        type: 'string'
      },
      body: {
        describe: 'Body of notes',
        demandOption: true,
        type: 'string'
      }
    },
    handler (argv) {
      try {
        notes.addNote(argv.title, argv.body)
      } catch (error) {
        log(chalk.redBright('Error Occured.'))
      }
    }
  })
  .command({
    command: 'remove',
    describe: 'Remove notes',
    builder: {
      title: {
        describe: 'Title of Note to be Removed',
        demandOption: true,
        type: 'string'
      }
    },
    handler (argv) {
      try {
        notes.removeNote(argv.title)
      } catch (error) {
        log(chalk.redBright('Error Occured.'))
      }
    }
  })
  .command({
    command: 'list',
    describe: 'List all notes',
    handler () {
      try {
        notes.listNotes()
      } catch (error) {
        log(chalk.redBright('Error Occured.'))
      }
    }
  })
  .command({
    command: 'read',
    describe: 'Read a particular notes',
    builder: {
      title: {
        describe: 'Title of Note to be Removed',
        demandOption: true,
        type: 'string'
      }
    },
    handler (argv) {
      try {
        notes.readNotes(argv.title)
      } catch (error) {
        log(chalk.redBright('Error Occured.'))
      }
    }
  })
  .parse()
