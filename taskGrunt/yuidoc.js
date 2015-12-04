module.exports =  {
  compile: {
    name: '<%= pkg.name %>',
    description: 'teste para doc',
    version: '<%= pkg.version %>',
    url: '<%= pkg.homepage %>',
      options: {
        paths: 'content/',
        themedir: 'yuidoc-themes/default',
        outdir: './info-project/Documentation/'
      }
  }
};