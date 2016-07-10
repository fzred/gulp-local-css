const path = require('path')
const gutil = require('gulp-util')
const through = require('through2')
const hash = require('hash-sum')
function plugin() {
    return through.obj(function (file, enc, cb) {
        console.log(file.path)
        this.push(file)
        cb()
    })
}
module.exports = plugin
