#!/usr/bin/env node 
const command = require('commander')
const program = new command.Command()
const chalk = require('chalk')

program
  .version('1.0.1')

// 获取 help
program.on('--help', function(){
  console.log('')
  console.log('Examples:')
  console.log('  $ custom-help --help')
  console.log('  $ custom-help -h')
})

program
  .command('serve', '启动开发服务')
  .action((e) => {
    console.log('serve')
  })

program
  .command('build', '构建生产版本')
  .action((e) => {
    console.log('build')
  })

program
  .command('lint', '静态扫描')
  .action((e) => {
    console.log('lint')
  })

program.parse(process.argv)