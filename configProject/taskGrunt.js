var express = require('express'),
    fs      = require('fs'),
    path = require('path'),
    fsx = require('fs-extra'),
    caminho = path.join(__dirname, '..\\content\\'),
    pathStyle = path.join(__dirname, '..\\projects\\'),
    date = new Date(),
    filecompile = [];

    /**
     * [Config description]
     */
    var Config = function () {};

    /**
     * [readFile description]
     * @param  {[type]} file [description]
     * @return {[type]}      [description]
     */
    Config.prototype.readFile = function (file){
        return JSON.parse(fs.readFileSync(caminho+file, 'utf8'));
    };

    /**
     * [readConfig description]
     * @param  {[type]} type    [description]
     * @param  {[type]} project [description]
     * @return {[type]}         [description]
     */
    Config.prototype.readConfig = function(type,project) {
        var mod = null, 
            result, key; 
        fs.readdirSync(caminho).forEach(function(file) {
            var obj; 
            if (/\.json$/.test(file)) {
                var json = JSON.parse(fs.readFileSync(caminho+file, 'utf8'));
                for( key in json){
                    if(key === project && type === 'build'){
                        mod =  json[key][0].default.build
                    }else{
                         mod = json[key][0].default.debug
                    }
                }
            }    
        });
        
        return mod;
    };

    /**
     * [extend description]
     * @param  {[type]} destination [description]
     * @param  {[type]} source      [description]
     * @return {[type]}             [description]
     */
    Config.prototype.extend  =  function(destination, source) {
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

    /**
     * [CheckModule description]
     * @param {[type]} arg1 [description]
     */
    Config.prototype.CheckModule = function(arg1){
        var obj, cont, result, key,
            filecompile = [],
            project = arg1;

        fs.readdirSync(caminho).forEach(function(file) {
            if (/\.json$/.test(file)) {
                var obj = Config.prototype.readFile(file);
                for( key in obj){
                    if(key === project){
                        result = obj[key][0].module;
                        for( key in obj[key][0].module){
                            if (result[key]) {
                                if(fs.existsSync(caminho+'/modules/MODULE_'+key+'.js')){
                                    filecompile.push(key +'.js');
                                }
                            }
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

                    return filecompile ;
                }
                //return true;
            } catch (e) {
                var design =   '****************************\n'+
                                e +'\n\n'+
                                '********* WARNING **********\n';

                console.error(design);

                return false;
            }

        };
    };

    /**
     * [checkLibs description]
     * @param  {[type]} project [description]
     * @return {[type]}         [description]
     */
    Config.prototype.checkLibs = function(project) {
        var cont, 
            libsCompile = [], 
            count,f, result, key;
        fs.readdirSync(caminho).forEach(function(file) {
            if (/\.json$/.test(file)) {
                var obj = Config.prototype.readFile(file);
                for( key in obj){
                    if(key === project){
                        count = 0;
                        result = obj[key][0].plugins 
                        for( key in obj[key][0].plugins ){
                            if (result[key]){
                                var  newName = count < 10  ?  "0"+count+key : count+key;
                                if(fs.existsSync(caminho+'/libs/'+key+'.js')){
                                    libsCompile.push(newName +'.js');
                                    count++;
                                }
                            }                         
                        }
                    }
                }
 
            }
        });
        return libsCompile;
    };

    /**
     * [checkStyles description]
     * @param  {[type]} project [description]
     * @param  {[type]} styles  [description]
     * @return {[type]}         [description]
     */
    Config.prototype.checkStyles = function(project,styles){
        var foldercss = styles,
            listCss = [],
            index =0;

        fs.readdirSync(caminho).forEach(function(file) {
            var obj, total, result,
                key,f,
                cont,name, set, 
                count, nameFile;

            if (/\.json$/.test(file)) {
                var cont = Config.prototype.readFile(file);
                 for( key in cont){
                    if(key === project){
                        count = 0;
                        result = cont[key][0].styles 
                        if(result){
                            for(key in result ){
                                name  = result[key];
                                for(k in name){
                                    if(name[k]){
                                        nameFile = k+'.css';
                                        var  newName = count < 10  ?  "0"+count+k+'.css': count+k+'.css';
                                        if(fs.existsSync(pathStyle+project+'/styles/'+foldercss+'/'+nameFile)){
                                            listCss.push(newName);
                                            console.log(newName)
                                            count++;
                                        }
                                        
                                    }
                                }
                     
                            }
                            
                        }
                    }
                }    
            }
        });

        return  listCss;
    };


    exports.Config = Config;

