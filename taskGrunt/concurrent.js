module.exports = {
    options: {
        logConcurrentOutput: true
      },
      prod: {
        tasks: [
            "watch:controller:<%= grunt.task.current.args[0] %>", 
            "watch:css:<%= grunt.task.current.args[0] %>", 
            "watch:html:<%= grunt.task.current.args[0] %>", 
            "watch:htmlDesc:<%= grunt.task.current.args[0] %>", 
            "watch:sass:<%= grunt.task.current.args[0] %>",
            "watch:sassA:<%= grunt.task.current.args[0] %>"
        ]
    }
};