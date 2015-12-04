module.exports = {
    options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        keepSpecialComments: 0
    },
    target: {
        files: {
            '<%= grunt.task.current.args[0] %>': ['./release/*.css']
        }
    }
};