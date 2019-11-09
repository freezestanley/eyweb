const fs = require('fs-extra')
module.exports = {
    readerZarc: function readerZarc () {
        const result = fs.readFileSync(`${process.cmd()}/.zarc.js`,'utf-8')
        console.log(result)
        return result
    }
}