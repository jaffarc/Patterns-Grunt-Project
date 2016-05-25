module.exports = {
    dist: {
    	options: {
	      style: 'expanded',
	      lineNumbers: true,
	      sourcemap: 'none'
	    },
	    files: [{
	        expand: true,
	        cwd: './projects/<%= grunt.task.current.args[0] %>/styles/sass/scss',
	        src: ['*.scss'],
	        dest: './projects/<%= grunt.task.current.args[0] %>/styles/sass',
	        ext: '.css'
	    }]
    }
};