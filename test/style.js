const gutil = require('gulp-util')
const plugin = require('../')

const stream = plugin.styleRewrite()

stream.on('data', function (data) {
    gutil.log(data.contents.toString())
})

stream.write(new gutil.File({
    path: 'src/pages/index/index.css',
    contents: new Buffer(`
    body{
        /*global*/
        background:white;
    }
    div{
       font-size:20px;
    }
    `)
}))

stream.end()
