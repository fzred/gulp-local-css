const gutil = require('gulp-util')
const plugin = require('../')

const stream = plugin.htmlRewrite()

stream.on('data', function (data) {
    gutil.log(data.contents.toString())
})

stream.write(new gutil.File({
    path: 'src/pages/index/index.html',
    contents: new Buffer(`<a id="MID">ff</a>`)
}))

stream.end()
