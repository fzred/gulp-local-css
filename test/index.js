const gutil = require('gulp-util')
const plugin = require('../')

const stream = plugin()

stream.on('data', function (data) {
    console.log(data.contents.toString())
})

stream.on('end', function () {
    console.log('end')
})

stream.write(new gutil.File({
    path: 'src/pages/index/index.css',
    contents: new Buffer(`<a>ff</a>`)
}))

stream.end()
