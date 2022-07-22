const createFile = require('./notes')
const validator = require('validator')
const chalk = require('chalk')

const log = console.log;
const successMsg = 'Test Completed Successfully'
const failureMsg = 'Test Failed'
const emailString = process.argv[2]
const urlString = process.argv[3]
const status = validator.isEmail(emailString) && validator.isURL(urlString)

validator.isEmail(emailString)?log('Email is : '+chalk.green('valid')):log('Email is : '+chalk.red('invalid'))
validator.isURL(urlString)?log('URL is : '+chalk.green('valid')):log('URL is : '+chalk.red('invalid'))
status?log(chalk.bold.green(successMsg)):log(chalk.bold.red(failureMsg))
