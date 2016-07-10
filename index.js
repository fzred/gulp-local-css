const through = require('through2')
const hash = require('hash-sum')

const styleRewrite = require('./lib/style-rewrite')
const htmlRewrite = require('./lib/html-rewrite')

function prefixStream(prefixText) {
    var stream = through()
    stream.write(prefixText)
    return stream
}
function getHash(file) {
    let pathNoExt = file.basename.substring(0, file.basename.lastIndexOf('.'))
    return '_' + hash(file.dirname + '/' + pathNoExt)
}
function style(opts) {
    let getFileHash = getHash
    if (typeof opts === 'object') {
        if (typeof opts.getHash === 'function') {
            getFileHash = opts.getHash
        }
    }
    return through.obj(function (file, enc, cb) {
        const id = getFileHash(file)
        let originalContent = file.contents.toString()

        let content = styleRewrite(originalContent, id)

        if (file.isBuffer()) {
            file.contents = new Buffer(content)
        }
        if (file.isStream()) {
            file.contents = prefixStream(content)
        }

        this.push(file)
        cb()
    })
}
function html(opts) {
    let getFileHash = getHash
    if (typeof opts === 'object') {
        if (typeof opts.getHash === 'function') {
            getFileHash = opts.getHash
        }
    }
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file)
            return
        }
        const id = getFileHash(file)
        let originalContent = file.contents.toString()

        let content = htmlRewrite(originalContent, id)

        if (file.isBuffer()) {
            file.contents = new Buffer(content)
        }
        if (file.isStream()) {
            file.contents = prefixStream(content)
        }

        this.push(file)
        cb()
    })
}
module.exports = {
    styleRewrite: style,
    htmlRewrite: html,
}
