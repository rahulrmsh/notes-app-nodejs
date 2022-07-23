// const createFile = require('./notes')
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
    handler: function (argv) {
      log(chalk.greenBright('Title : '), argv.title)
      log(chalk.greenBright('Body : '), argv.body)
    }
  })
  .command({
    command: 'remove',
    describe: 'Remove notes',
    builder: {
      title: {
        describe: 'Title of note',
        demandOption: true,
        type: 'string'
      }
    },
    handler: function (argv) {
      log(chalk.redBright('Note Removed With Title ' + argv.title))
    }
  })
  .command({
    command: 'list',
    describe: 'List all notes',
    handler: function () {
      log(chalk.yellowBright('Listing all available notes'))
    }
  })
  .command({
    command: 'read',
    describe: 'Read all notes',
    handler: function () {
      log(chalk.blueBright('Read all available notes'))
    }
  })
  .parse()
