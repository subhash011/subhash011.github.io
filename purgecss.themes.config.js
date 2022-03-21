module.exports = {
    content: ['build/index.html', 'build/static/js/*.js'],
    css: ['build/themes/*.css'],
    output: 'build/themes',
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    safelist: [/^p-timeline/]
}