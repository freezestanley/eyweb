'use strict'
const Config = require('webpack-chain')
const path = require('path')
const webpack = require('webpack')
const cwd = process.cwd()
const execa = require('execa')

module.exports = {
    readerZarc: function readerZarc () {
        const result = require(`${process.cwd()}/.zarc.js`)
        const config = new Config()
        let ss = result.configureWebpack(config)
        console.log(ss.toString())

        const subprocess = execa('npm', ['run', 'doit'], {
            cwd: dir + '/',
            stdio: ['inherit']
          });
          subprocess.on('close', code => {
            if (code !== 0) {
              reject(`command failed: ${command}`)
              return
            }
            subprocess.kill('SIGTERM', {
              forceKillAfterTimeout: 10000
            })
            resolve('success')
          })
    }
}