#!/usr/bin/env node
const command = require('commander')
const program = new command.Command()
const chalk = require('')
const path = require('path')
const fs = require('fs')
const pk = require(path.resolve(__dirname,'../package.json'))

program
  .version(pk.version)

// 获取 help
program.on('--help', function(){
    console.log('')
    console.log('Examples:');
    console.log('  $ custom-help --help');
    console.log('  $ custom-help -h');
  })

program.parse(process.argv)

program
  .command('build')
  .action((dir, otherDirs) => {
    console.log('this is build')
  })

program
  .command('dev')
  .action((dir, otherDirs) => {
    console.log('this is dev')
  })

program
  .command('lint')
  .action((dir, otherDirs) => {
    console.log('this is lint')
  })