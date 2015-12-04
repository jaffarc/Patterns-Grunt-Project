module.exports =  {
  dev: {
      engine: 'handlebars',
      cwd: 'templates/<%= grunt.task.current.args[0] %>/',
      partials: ['templates/<%= grunt.task.current.args[0] %>/modules/*.hbs'],
      data: 'templates/<%= grunt.task.current.args[0] %>/data/data.json',
      options: {
      },
      files: [{
        expand: true,     // Enable dynamic expansion.
        cwd: 'templates/<%= grunt.task.current.args[0] %>',      // Src matches are relative to this path.
        src: '*.hbs', // Actual pattern(s) to match.
        dest: '<%= grunt.task.current.args[1] %>',   // Destination path prefix.
        ext: '.html'  // Dest filepaths will have this extension.
      }],

  }
};