module.exports = {
    'dist': {
        'src': ['<%= grunt.task.current.args[0] %>'],
        'dest': '<%= grunt.task.current.args[1] %>'
    },
        'options': {
        'report': 'gzip'
    },
};

