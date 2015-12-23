/*jslint indent: 4, maxlen: 250, maxerr: 10, white: true, browser: true, devel: true, nomen: true, sloppy: true, unparam:true */
/*global */
module.exports = function (grunt) {
    'use strict';

    require('time-grunt')(grunt);
    var arg2, allFunc, taskRun, defaults = {}, d = new Date(),
        pkg     = require("./package.json"),
        express = require('express'),
        path    = require('path'),
        fs      = require('fs'),
        fsx = require('fs-extra'),
        caminho = path.resolve(".") + '/content/';

    grunt.template.addDelimiters('handlebars-like-delimiters', '{{', '}}');

    function extend(destination, source) {
        var toString = Object.prototype.toString,
            objTest = toString.call({});
        for (var property in source) {
            if (source[property] && objTest == toString.call(source[property])) {
                destination[property] = destination[property] || {};
                extend(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
        return destination;
    };
    grunt.loadTasks('./tasks');

    grunt.initConfig({
        pkg: pkg,
        yuidoc          : require('./taskGrunt/yuidoc.js'),
        plato           : require('./taskGrunt/plato.js'),
        jshint          : require('./taskGrunt/jshint.js'),
        concat          : require('./taskGrunt/concat.js'),
        min             : require('./taskGrunt/min.js'),
        remove          : require('./taskGrunt/remove.js'),
        clean           : require('./taskGrunt/clean.js'),
        cssmin          : require('./taskGrunt/cssmin.js'),
        concat_css      : require('./taskGrunt/concat_css.js'),
        template        : require('./taskGrunt/template.js'),
        sass            : require('./taskGrunt/sass.js'),
        watch           : require('./taskGrunt/watch.js'),
        concurrent      : require('./taskGrunt/concurrent.js'),
        strip_code      : require('./taskGrunt/strip_code.js'),
        jasmine         : require('./taskGrunt/jasmine.js'), 
        uglify          : require('./taskGrunt/uglify.js')   

    });


    Object.keys(grunt.config('pkg').devDependencies).forEach(function (dep) {
        if ( /^grunt\-/i.test(dep) &&  dep !== "grunt-template-jasmine-istanbul") {
            grunt.loadNpmTasks(dep);
        }
    });
    /**
    * This method it makes one forEach in all dependencies package.json for grunt.task.loadTasks method.
    */

    taskRun = function (param) {
        grunt.task.run(param);
    };

    /**
     * chechFile config.json and add array modules = true
     * @param  {String} arg1 name the project/ folder
     * @return {Array}   modules for compile.
     */
    function CheckModule(arg1){
        var obj, cont, result, key,
            filecompile = [],
            project = arg1;

        fs.readdirSync(caminho).forEach(function(file) {
            if (/\.json$/.test(file)) {
                cont = grunt.file.readJSON(caminho+file);
                obj = JSON.parse(JSON.stringify(cont));
                for(var i =0; i< obj.length;i++){
                    if(obj[i][0].toLowerCase() === project.toLowerCase()){
                        result = cont[i][1].module;
                        for( key in cont[i][1].module ){
                            if (result[key]) {
                                if(fs.existsSync(caminho+'modules/MODULE_'+key+'.js')){

                                    filecompile.push(key +'.js');

                                }
                            };
                        }
                    }
                }
            }
        });
        return  function(){
            try {
                if (filecompile.length === 0) {
                    throw "this project has not setted modules for it!";
                }else{

                    return filecompile
                }
                //return true;
            } catch (e) {
                var design =   '****************************\n'+
                                e +'\n\n'+
                                '********* WARNING **********\n'
                grunt.log.writeln(design['red'].bold )

                return false;
            }

        }
    };




    function checkStyles(project,styles){
        var foldercss = styles,
            listCss = [],
            index =0;
           //project = "Painel";

        fs.readdirSync(caminho).forEach(function(file) {
            var obj, total, result,
                result, key,f,
                cont,name, set, 
                count, nameFile;

            if (/\.json$/.test(file)) {
                f = grunt.file.readJSON(caminho+file);
                cont = JSON.parse(JSON.stringify(f));
                for(var i =0; i< cont.length;i++){
                    if (cont[i][0].toLowerCase() === project.toLowerCase()) {
                        obj = cont[i];
                        result = cont[i][1].styles;
                        for( name in cont[i][1].styles ){
                            set = result[name];
                            if(name === foldercss){
                                count = 0;
                                for(key in set ){
                                    if (set[key]) {
                                        nameFile = key+'.css';
                                        var  newName = count < 10  ?  "0"+count+key+'.css': count+key+'.css';
                                        if(fs.existsSync(caminho+'projects/'+project+'/styles/'+foldercss+'/'+nameFile)){
                                            listCss.push(newName);
                                        count++;
                                        }
                                    };
                                }
                            }
                        }
                    }
                }
            };
        });

        return  listCss;
    };

    grunt.registerTask('help', 'info task gruntfile.', function () {
        var text, colors = ['white', 'black', 'grey', 'blue', 'cyan', 'green', 'magenta', 'red', 'yellow', 'rainbow'];
        grunt.log.writeln('');
        grunt.log.writeln('Help das task do projeto'['yellow'].bold);

        text =
            '| task:        | call:                         | description:                     |\n'['green'].bold +
            '|--------------| ------------------------------| ---------------------------------|\n'['green'].bold +
            '| doc and plato| grunt info:project            | create yuidoc &  plato           |\n'['green'].bold +
            '| Debug js     | grunt js:project              | file config defalt:debug = true  |\n'['green'].bold +
            '| create html  | grunt html:project            | html:project                     |\n'['green'].bold +
            '| minified js  | grunt js:project              | file config defalt:debug = false |\n'['green'].bold +
            '| watch task   | grunt watched:project         | This watch all task              |\n'['green'].bold +
            '| minified css | grunt css:project:[css||sass] | compress css or sass             |\n'['green'].bold 

            

        grunt.log.writeln(text)
    });
    /**
     *@description
     */
    grunt.registerTask('wait', function (start) {
        var project  = /([!:+](\w+))/.exec(process.argv.slice(2))[2];
        taskRun(['concat_css:dist', 'cssmin:target:'+readConfig('build', project)+'/css/general-min-un.css','remove:temp:./temp' ]);

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
            taskRun('clean:all:./content/projects/'+project+"/styles/"+styles+"/*.css");
            taskRun("sass:dist:"+project);
        };

        var array = checkStyles(project,styles),
        total = array.length,
        cout =0, key, start;
        console.log(project,styles,checkStyles(project,styles))
        for(key in array){
            var done = this.async();
           
            fsx.copy('./content/projects/'+project+'/styles/'+styles+'/'+array[key].replace(/\d+/g, ''), './release/'+array[key], function (err) {
                if (!err){
                    cout++
                    start = d.getMilliseconds();
                }
                if(total === cout){
                    taskRun('wait:'+start);
                    done();
                }
            })

        }
    });

    /**
     * [readConfig description]
     * @param  {[type]} type    [description]
     * @param  {[type]} project [description]
     * @return {[type]}         [description]
     */
    function  readConfig(type, project){
        var cont, mod, f, result, key;
        fs.readdirSync(caminho).forEach(function(file) {
            if (/\.json$/.test(file)) {
                f = grunt.file.readJSON(caminho+file);
                cont = JSON.parse(JSON.stringify(f));
                for(var i =0; i< cont.length;i++){

                    if(cont[i][0].toLowerCase() === project.toLowerCase()){
                        result = cont[i][1].default
                        for( key in cont[i][1].default){
                            if(type ===  key){
                                mod = result[key];
                            }
                        }
                    }
                }
            }
        });
        return mod;
    }
    /**
     * [description]
     * @param 
     * 
     */
    grunt.task.registerTask('js', 'minified js', function(){
        var project  = /([!:+](\w+))/.exec(process.argv.slice(2))[2];
        /**
         * WARNING
         * tests all modules before
         */
        taskRun('jasmine');

        if(readConfig('debug', project)){
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
    grunt.task.registerTask('debug', '...........', function (arg1) {

        var
            project = arg1, min,
            PathController  =  './content/projects/'+project+'/controller/*.js',
            PathDest    = readConfig('build', project)+'/js/general-min-un.js',
            File    = CheckModule(project),
            PathCore    = './content/core/*.js',
            PathModules = './module/*.js',
            name = File(),
            argument = Array.prototype.slice.call(arguments)[1],
            path = argument ===  undefined ? PathDest : defaults.dest;

        for (var i=0; i < name.length; i++) {
            //taskRun('copy:'+name[i]);
            taskRun('strip_code:multiple_files:MODULE_'+name[i]);
        }


        taskRun('concat:debug:'+path+':'+PathCore+':'+PathModules+':'+PathController);
        taskRun('remove:temp:./module');


    });
    /**
     * [description]
     * @param  
     * 
     */
    grunt.task.registerTask('Gzipjs', 'minified js para qualquer project criado', function (project) {
        var project  = /([!:+](\w+))/.exec(process.argv.slice(2))[2]
        extend(defaults, {
            dest: './temp/general-min-un.js',
            build: readConfig('build', project)+'js/'
        });

        taskRun('jshint');
        taskRun('debug:'+project+':'+defaults.dest)
        //taskRun('min:dist:'+defaults.dest+':'+defaults.build);
        taskRun('uglify:all:'+defaults.build);
        taskRun('remove:temp:./temp');

    });

    /**
     * Create plato and documentation the of project
     */
    grunt.task.registerTask('info', 'Create plato and documentation the of project', function (start) {

        if(start){
            console.log('start')
        }
        taskRun('plato');
        taskRun('yuidoc');

    });

    /**
     * [description]
     * @param  {[type]}
     * @return {[type]}
     */
    grunt.task.registerTask('copy', 'Read a file asynchronously and write its contents out', function(name) {
        // Tell grunt this task is asynchronous.
        var done = this.async();
           fsx.copy('./content/modules/MODULE_'+name, './module/MODULE_'+name, function (err) {
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

         taskRun('template:dev:'+project+':'+readConfig('build', project));

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