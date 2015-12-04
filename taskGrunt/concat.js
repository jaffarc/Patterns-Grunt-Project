module.exports =  {
    'debug':{
        options: {
            separator: '',
            process: function(src, filepath) {
                return '\n//Source-file: ' + filepath  + '\n' + src;
            }
        },
        /*      
        0:dest
        1:core
        2:modules
        3:controller
         */
        src:  [
            ['<%= grunt.task.current.args[1] %>'], 
            ['<%= grunt.task.current.args[2] %>'],
            '<%= grunt.task.current.args[3] %>'

        ],
        dest: '<%= grunt.task.current.args[0] %>',

    },
};
