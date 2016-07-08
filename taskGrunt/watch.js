module.exports =  {
    controller: {
        files: "./projects/<%= grunt.task.current.args[1] %>/controller/*.js",
        tasks: ["js:<%= grunt.task.current.args[1] %>"]
    },
    css: {
        files: "./projects/<%= grunt.task.current.args[1] %>/styles/css/*.css",
        tasks: ["css:<%= grunt.task.current.args[1] %>:css"]
    },
    html: {
        files: "./templates/<%= grunt.task.current.args[1] %>/**/*.hbs",
        tasks: ["html:<%= grunt.task.current.args[1] %>"]
    },
    htmlDesc: {
        files: "./templates/<%= grunt.task.current.args[1] %>/**/*.json",
        tasks: ["html:<%= grunt.task.current.args[1] %>"]
    },
    sassA: {
        files: "./projects/<%= grunt.task.current.args[1] %>/styles/sass/*.css",
        tasks: ["css:<%= grunt.task.current.args[1] %>:sass"]
    },
    sass: {
        files: './projects/<%= grunt.task.current.args[1] %>/styles/sass/scss/*.scss',
        tasks: ['sass:dist:<%= grunt.task.current.args[1] %>'],
        
    },
    config: {
        files: "./content/**/*.json",
        tasks: [["js:<%= grunt.task.current.args[1] %>"],'sass:dist:<%= grunt.task.current.args[1] %>']
    },
}