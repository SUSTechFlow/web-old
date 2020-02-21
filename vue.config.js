module.exports = {
    chainWebpack: config => {
        config.module
            .rule('markdown-latex')
            .test(/\.(md|markdown|markdown-latex)$/)
            .use('markdown-latex-loader')
            .loader('markdown-latex-loader')
            .tap(options => { return {div: true} })
            .end()
    }
};