# gulp-local-css
局部css的gulp实现插件

## 安装
```bash
npm install gulp-local-css
```
## 使用
```javascript
const gulp = require('gulp')
const localCss = require('gulp-local-css')

gulp.task('css', function () {
    gulp.src('src/pages/**/*.css', { base: 'src' })
        .pipe(localCss.styleRewrite())
        .pipe(gulp.dest('dist'))
})
gulp.task('html', function () {
    gulp.src('src/pages/**/*.html', { base: 'src' })
        .pipe(localCss.htmlRewrite())
        .pipe(gulp.dest('dist'))
})

gulp.task('default', ['css', 'html'])
```
## API
### styleRewrite([options])
给css选择器加上属性选择器
```css
/* 处理前 */
body {
    /*global*/
    background: #333;
}
h1 {
    font-size: 100px;
}

/* 处理后 */
body {
    /*global*/
    background: #333;
}

h1[_c86f0316] {
    font-size: 100px;
}
给css内容第一行加上 /*global*/ 则不加属性选择器
```

### htmlRewrite([options])
给html加上hash属性
```html
<!--处理前-->
<body>
<h1>hello MID</h1>
</body>

<!--处理后-->
<body _c86f0316>
<h1 _c86f0316>hello _c86f0316</h1>
</body>
```
文件中 **MID** 为全局的占位符，编译后会替换为 hash 值，一般用做ID，或者在JS里使用

## HASH 如何计算？
### default
使用 *文件相对于base的路径去掉扩展名后* 作为值生成hash 

推荐的目录结构 
```
index
    index.css
    index.html
about
    index.css
    index.html
```
如果默认的计算hash的方式不适合你的目录，你也可以自己编写 getHash 函数
#### options.getHash
getHash 被调用时会传入一个参数
* [File对象](https://github.com/gulpjs/vinyl#file)

返回值即为 hash 值

## examples
* [simple](https://github.com/fzred/gulp-local-css/tree/master/examples/simple)
