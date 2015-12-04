module.exports = {
    dist: {
      files: [{
        expand: true,
        cwd: './content/projects/<%= grunt.task.current.args[0] %>/styles/sass/scss',
        src: ['*.scss'],
        dest: './content/projects/<%= grunt.task.current.args[0] %>/styles/sass',
        ext: '.css'
      }]
    }
};