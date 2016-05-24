module.exports =  {
  dev: {
      engine: 'handlebars',
      cwd: './projects/<%= grunt.task.current.args[0] %>/views/',
      partials: ['./projects/<%= grunt.task.current.args[0] %>/views/modules/*.hbs'],
      data: 'projects/<%= grunt.task.current.args[0] %>/views/data/data.json',
      options: {
      },
      files: [{
        expand: true,     
        cwd: './projects/<%= grunt.task.current.args[0] %>/views/',      
        src: '*.hbs', 
        dest: '<%= grunt.task.current.args[1] %>',   
        ext: '.html'  
      }],

  }
};