module.exports =  {
    options :  { 
        report :  'gzip',
        preserveComments: require('uglify-save-license') 
    }, 
    all :  { 
        expand :  true , 
        flatten :  true , 
        cwd :  './temp/' , 
        src :  [ '*.js' ,  '!*.min.js' ], 
        dest :  '<%= grunt.task.current.args[0] %>' , 
        //ext :  '.min.js' 
    }
}

