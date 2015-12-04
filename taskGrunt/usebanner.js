module.exports =  {
	dist: {
	  options: {
	    position: 'top',
	    banner: '<%= banner %>'
	  },
	  files: {
	    src: [ '<%= grunt.task.current.args[0] %>/general-min-un.<%= grunt.task.current.args[1] %>' ]
	  }
	}
};