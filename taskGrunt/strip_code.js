module.exports =  {
 	options: {
     	start_comment: 'start-test-block',
      	end_comment: 'end-test-block',
    },
    multiple_files:{
        src: './content/modules/<%= grunt.task.current.args[0] %>', dest: './module/<%= grunt.task.current.args[0] %>'
    }
};