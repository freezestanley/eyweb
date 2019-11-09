'use strict'
const Config = require('webpack-chain')
const path = require('path')
const webpack = require('webpack')
const cwd = process.cwd()

module.exports = {
    readerZarc: function readerZarc () {
        const result = require(`${process.cwd()}/.zarc.js`)
        console.log(result)
        const config = new Config()
        result.configureWebpack(config)
        console.log(config.toString())
    }
}