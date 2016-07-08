module.exports = {
   default: {
        src: 'projects/site/styles/sass/',
        options: {
          dest: 'info-project/DocSass',
          display: {
            access: ['public', 'private'],
            alias: true,
            watermark: true,
          },
          groups: {
            slug: '',
            helpers: '',
            hacks: '',
            'undefined': '',
          },
          basePath: 'https://github.com/SassDoc/grunt-sassdoc',
        },
    },
};