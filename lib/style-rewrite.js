const postcss = require('postcss')
const selectorParser = require('postcss-selector-parser')

const addId = postcss.plugin('add-id', function (opts) {
    return function (root) {
        root.each(function rewriteSelector(node) {
            if (!node.selector) {
                // handle media queries
                if (node.type === 'atrule' && node.name === 'media') {
                    node.each(rewriteSelector)
                }
                return
            }
            if (Array.isArray(node.nodes) &&
                node.nodes[0] &&
                node.nodes[0].type === 'comment' &&
                node.nodes[0].text.trim() === 'global'
            ) {
                return
            }

            node.selector = selectorParser(function (selectors) {
                selectors.each(function (selector) {
                    var node = null
                    selector.each(function (n) {
                        if (n.type !== 'pseudo') node = n
                    })
                    selector.insertAfter(node, selectorParser.attribute({
                        attribute: opts.id
                    }))
                })
            }).process(node.selector).result
        })
    }
})

function styleRewrite(originalContent, id) {
    return postcss().use(addId({ id: id })).process(originalContent).css
}

module.exports = styleRewrite
