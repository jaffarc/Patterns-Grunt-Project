/*jslint indent: 4, maxlen: 250, maxerr: 10, white: true, browser: true, devel: true, nomen: true, sloppy: true, unparam:true */

module.exports = function (grunt) {
    'use strict';
    require('time-grunt')(grunt);
    var arg2, allFunc, taskRun, defaults = {}, d = new Date(),
        pkg     = require("./package.json"),
        Config = require('./configProject/taskGrunt').Config,
        express = require('express'),
        path    = require('path'),
        fs      = require('fs'),
        fsx = require('fs-extra'),
        caminho = path.resolve(".") + '/',
        contentPath  = caminho + 'content/',
        
        conf = new Config();

    grunt.template.addDelimiters('handlebars-like-delimiters', '{{', '}}');

    grunt.loadTasks('./tasks');

    grunt.initConfig({
        pkg: pkg,
        yuidoc          : require('./taskGrunt/yuidoc.js'),
        plato           : require('./taskGrunt/plato.js'),
        jshint          : require('./taskGrunt/jshint.js'),
        concat          : require('./taskGrunt/concat.js'),
        remove          : require('./taskGrunt/remove.js'),
        clean           : require('./taskGrunt/clean.js'),
        cssmin          : require('./taskGrunt/cssmin.js'),
        concat_css      : require('./taskGrunt/concat_css.js'),
        template        : require('./taskGrunt/template.js'),
        sass            : require('./taskGrunt/sass.js'),
        watch           : require('./taskGrunt/watch.js'),
        concurrent      : require('./taskGrunt/concurrent.js'),
        uglify          : require('./taskGrunt/uglify.js'),   
        exec            : require('./taskGrunt/exec_npm.js'),
        sassdoc         : require('./taskGrunt/sassdoc.js'),
    });


    Object.keys(grunt.config('pkg').devDependencies).forEach(function (dep) {
        if ( /^grunt\-/i.test(dep)) {
            grunt.loadNpmTasks(dep);
        }
    });
    /**
    * This method it makes one forEach in all dependencies package.json for grunt.task.loadTasks method.
    */

    taskRun = function (param) {
        grunt.task.run(param);
    };

    grunt.registerTask('help', 'info task gruntfile.', function () {
        var text, colors = ['white', 'black', 'grey', 'blue', 'cyan', 'green', 'magenta', 'red', 'yellow', 'rainbow'];
        //grunt.log.writeln('');
        grunt.log.writeln('Help das task do projeto'['yellow'].bold);

        text =
            '| task:                | call:                         | description:                     |\n' +
            '|----------------------| ------------------------------| ---------------------------------|\n' +
            '| doc, sassdoc, plato  | grunt info:project            | create yuidoc &  plato           |\n' +
            '| Debug js             | grunt js:project              | file config defalt:debug = true  |\n' +
            '| create html          | grunt html:project            | html:project                     |\n' +
            '| minified js          | grunt js:project              | file config defalt:debug = false |\n' +
            '| watch task           | grunt watched:project         | This watch all task              |\n' +
            '| minified css         | grunt css:project:[css||sass] | compress css or sass             |\n' 

            

        grunt.log.writeln(text);
    });
    /**
     *@description
     */
    grunt.registerTask('wait', function (start) {
        var project  = /([!:+](\w+))/.exec(process.argv.slice(2))[2];
        taskRun(['concat_css:dist', 'cssmin:target:'+conf.readConfig('build', project)+'/css/general-min-un.css','remove:temp:./temp' ]);

        var done = this.async();
        setTimeout(function () {
            taskRun('remove:temp:./release');
            done();

        }, start);
    });

    /**
     * [description]
     * @param  {String} project name the of project
     * @param  {String} name the of css used
     *
     */
    grunt.task.registerTask('css', 'Read a file asynchronously and write its contents out', function(project,styles) {
        
        if(styles==="sass"){
            taskRun('clean:all:./projects/'+project+"/styles/"+styles+"/*.css");
            taskRun("sass:dist:"+project);
        };

        var array = conf.checkStyles(project,styles),
        total = array.length,
        cout =0, key, start;


        for(key in array){
            var done = this.async();
           
            fsx.copy('./projects/'+project+'/styles/'+styles+'/'+array[key].replace(/\d+/g, ''), './release/'+array[key], function (err) {
                if (!err){
                    cout++
                    start = d.getMilliseconds();
                }
                if(total === cout){
                    taskRun('wait:'+start);
                    done();
                    /* Solution disable map sass. */
                    taskRun('clean:all:./projects/'+project+"/styles/"+styles+"/*.map");
                }
            })

        }
    });

    /**
     * [description]
     * @param 
     * 
     */
    grunt.task.registerTask('js', 'minified js', function(){
        var project  = /([!:+](\w+))/.exec(process.argv.slice(2))[2];
        
        taskRun('jshint');   

        /**
         * WARNING
         * tests all modules before
         */
        
        taskRun('exec');
      
        if(conf.readConfig('debug', project)){
            taskRun('debug:'+project);
        }else{
            taskRun('Gzipjs:'+project);
        }

    });

    /**
    *  Mode debug js.
    *  exemple for call.
    *  grunt debug:site ||  debug:admin
    */
    grunt.task.registerTask('debug', '...........', function () {

        var
            project         = Object.values(arguments)[0], min,
            PathLibs        = './libs/*.js',
            PathController  = './projects/'+project+'/controller/*.js',
            PathDest        = conf.readConfig('build', project)+'js/general-min-un.js',
            File            = conf.CheckModule(project),
            PathCore        = './content/core/*.js',
            PathModules     = './modules/*.js',
            plugins         = conf.checkLibs(project),
            modules         = File(),
            dest            = arguments[1] === undefined  ? PathDest  :  arguments[1];

        taskRun('remove:temp:'+conf.readConfig('build', project)+'/js/');
        
        for (var i=0; i < plugins.length; i++) {
            taskRun('copyLibs:'+plugins[i]);
        }

        for (var i=0; i < modules.length; i++) {
            taskRun('copyModule:'+modules[i]);
        }

        taskRun('concat:debug:'+dest+':'+PathCore+':'+PathModules+':'+PathController+':'+PathLibs);
        taskRun('remove:temp:./modules');
        taskRun('remove:temp:./libs');


    });
    /**
     * [description]
     * @param  
     * 
     */
    grunt.task.registerTask('Gzipjs', 'minified js para qualquer project criado', function (project) {
      
        var project  = /([!:+](\w+))/.exec(process.argv.slice(2))[2]
        
        conf.extend(defaults, {
            dest: './temp/general.js',
            build: conf.readConfig('build', project)+'js/'
        });

        taskRun('jshint');
        taskRun('debug:'+project+':'+defaults.dest)

        taskRun('uglify:all:'+defaults.build);

        taskRun('remove:temp:./temp');
    });

    /**
     * Create plato and documentation the of project
     */
    grunt.task.registerTask('info', 'Create plato and documentation the of project', function (start) {

        if(start){
            console.log('start...')
        }
        taskRun('plato');
        taskRun('yuidoc');
        taskRun('sassdoc');

    });

    /**
     * [description]
     * @param  {[type]}
     * @return {[type]}
     */
    grunt.task.registerTask('copyModule', 'Read a file asynchronously and write its contents out', function(name) {
        // Tell grunt this task is asynchronous.
        var done = this.async();
        fsx.copy('./content/modules/MODULE_'+name, './modules/MODULE_'+name, function (err) {
          if (err) return console.error(err)
          //console.log("success!")
          done();
        })
    });
    
    /**
     * [description] copy all libs/plugins as jquery, soma 
     * @param  {[type]} name) {                           var done [description]
     * @return {[type]}       [description]
     */
    grunt.task.registerTask('copyLibs', 'Read a file asynchronously and write its contents out', function(name) {
        // Tell grunt this task is asynchronous.
        var done = this.async();
      
        fsx.copy('./content/libs/'+name.replace(/(^[0-9]+)/g, ''), './libs/'+name, function (err) {
          if (err) return console.error(err)
          //console.log("success!")
          done();
        })
    });

    /**
    *  Create/template html.
    *  exemple for call.
    *      grunt html:Painel  || grunt html:site
    */
    grunt.task.registerTask('html', 'minified js para qualquer project criado', function () {

        var project  = /([!:+](\w+))/.exec(process.argv.slice(2))[2];

        taskRun('template:dev:'+project+':'+conf.readConfig('build', project));

    });

    /**
     * [description]
     * @param  name the project 
     */
    grunt.task.registerTask('watched', 'project should be watching', function () {

        var project  = /([!:+](\w+))/.exec(process.argv.slice(2))[2];

        taskRun('concurrent:prod:'+project);

    });

};