/*jshint indent: 4, maxlen: 250, maxerr: 10, white: true, browser: true, devel: true, nomen: true, undef: true, unused: false, strict:false */
/*global APP */
/*!
 * APP JavaScript v1.0.3
 *
 * Copyright 2015 Foundation, Inc. and other contributors
 *
 * Date: 2015-11-25
 */
/**
 * this is Main Application
 * @namespace APP
 * @class
 * @version 1.0
 */

(function (window) {
    var APP = window.APP === window.APP || {};
    APP = (function (mod) {
        /**
        * Reference to the internal Private
        * instance used to make the queries.
        *
        * @private
        * @type {Object}
        * @property Private
        * @example
        * Private = {
        *
        *}
        */
        var  Private = {
        },
        options = {
            debug: true,
            VERSION  : '1.0.0'
        };
        /**
        * Propriedade Publica
        * DEBUG_MODE {boolean} 
        * ser alterardo para ativar o modo DEBUG_MODE no console
        *
        * 
        */
        Private.extend = function(defaults, options) {
            var extended = {};
            var prop;
            for (prop in defaults) {
                if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                    extended[prop] = defaults[prop];
                }
            }
            for (prop in options) {
                if (Object.prototype.hasOwnProperty.call(options, prop)) {
                    extended[prop] = options[prop];
                }
            }
            return extended;
        };

        Public = Private.extend(mod, options);

        /**
         * any prototype properties as needed
         * @type {Object}
         */
        APP.prototype = {
            name: "APP",
            version: "1.0",
            getName: function() {
                return this.name;
            }
        };

        Private.errorHandler = function (arrDependency) {

            var i = 0,
                j = 0,
                len = arrDependency.length,
                parts = [],
                parent = APP.modules;

            for(i; i<len; i += 1) {
                parent = APP.modules;
                parts = arrDependency[i].split('.');
                for(j = 0; j<parts.length; j += 1) {
                    if(parent[parts[j]] === undefined) {
                        throw "[" + arrDependency[i] + "] is not defined!";
                    }

                    parent = parent[parts[j]];
                }
            }
        };
        /**
         * @method namespace
         * @constructor
         * @param {Function} config.callback A callback function on the config object
         */
        Public.namespace = function () {
            try{

                var args     = Array.prototype.slice.call(arguments),
                    callback = args.pop(),
                    requiredmodules  = (args[0] && typeof args[0] ==="string") ? args : args[0],
                    i;
                Private.checkModule(requiredmodules);

                if(!(this instanceof Public.namespace)){
                    return new Public.namespace(requiredmodules, callback);
                }

                for(i = 0; i< requiredmodules.length; i +=1){
                    APP.modules[requiredmodules[i]](this);
                }

               callback(this);
            }catch(err) {
                console.error("Public.namespace", err.message);
            }

        };
        /**
         * @method startView
         * @return {Object}
         */
        Public.startView  =  function ()  {
            var args = Array.prototype.slice.call(arguments);

           return document.querySelector(args) ? true :  false;
           //return document.getElementById(id) ? true : false;

        };

        /**
         * @method Logger
         * @private
         * @description  this disable console.* to prod ative only localhost or dev-dominio.com
         */
        Private.Logger  = (function (){
           if(!options.debug){
                if(!window.console) window.console = {};
                var methods = ["log", "debug", "warn", "info"];
                for(var i=0;i<methods.length;i++){
                    console[methods[i]] = function(){};
                }
            }
        }());

        Private.checkModule = function (arrDependency) {
            var parts = [],
                parent = APP.modules;

            for(i=0; i<arrDependency.length; i += 1) {
                parent = APP.modules;
                parts = arrDependency[i].split('.');
                for(j = 0; j<parts.length; j += 1) {
                    if(parent[parts[j]] === undefined) {
                        throw "[" + arrDependency[i] + "] this module does not exist or wrong name!";
                    }
                    parent = parent[parts[j]];
                }
            }
        };
        /**
         * [extend description]
         * 
         */
        Public.extend = Private.extend;

        return Public;

    })(window.APP);
    window.APP = APP;
    APP.modules = {};
})(window);