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
        result.configureWebpack(config)
        console.log(config.toString())
    }
}