module.exports = {
    content: ['build/index.html', 'build/static/js/*.js'],
    css: ['build/static/css/*.css'],
    output: 'build/static/css',
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    safelist: [/^p-timeline/]
}