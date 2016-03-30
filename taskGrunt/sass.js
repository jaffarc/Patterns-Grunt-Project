module.exports = {
    dist: {
      files: [{
        expand: true,
        cwd: './projects/<%= grunt.task.current.args[0] %>/styles/sass/scss',
        src: ['*.scss'],
        dest: './projects/<%= grunt.task.current.args[0] %>/styles/sass',
        ext: '.css'
      }]
    }
};