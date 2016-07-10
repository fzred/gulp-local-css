const rIDReplace = /MID/g
const ignore = ['script', 'link', 'head', 'title', 'meta'] // 忽略的标签

function htmlRewrite(originalContent, id) {
    let content = originalContent.replace(/<([\w-]+)([\s\S]*?>)/gim, function (match, tag, p2) {
        if (ignore.indexOf(tag) !== -1) {
            return match
        }
        return '<' + tag + ' ' + id + p2
    })
    content = content.replace(rIDReplace, function () {
        return id
    })

    return content
}
module.exports = htmlRewrite
