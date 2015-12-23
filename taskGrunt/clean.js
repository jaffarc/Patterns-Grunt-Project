module.exports =  {
    all: {
        options: {
            force: true
        },
        src : ['<%= grunt.task.current.args[0] %>']
        //'./release/*.css', './*.tmp',
    },
};