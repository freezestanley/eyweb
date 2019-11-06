#!/usr/bin/env node 
const command = require('commander')
const program = new command.Command()

program
  .version('1.0.1')
// 获取 help
program.on('--help', function(){
  console.log('')
  console.log('Examples:');
  console.log('  $ custom-help --help');
  console.log('  $ custom-help -h');
})

program.parse(process.argv)