
//Source-file: ./content/core/core.js
(function (window) {
    'use strict';
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
             //tplsettings : template.settings
        },
        options = {
            debug: true,
            version  : '1.0.2',
        
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

        var Public = Private.extend(mod, options);


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


        Public.namespace = function () {
                
            var obj = Array.prototype.slice.apply(arguments);
            obj.pop(obj[3]);
            var parent = APP,
                parts = ['modules'];
          
                parts.push(obj[0].toString());

            for(var  i=0; i<parts.length; i+= 1) {
                if(parent[parts[i]] === undefined) {
                    parent[parts[i]] = obj[2];
                }

                parent = parent[parts[i]];
            }
            return parent;
        };




        /**
         * @method namespace
         * @constructor
         * @param {Function} config.callback A callback function on the config object
         */
        Public.controller = function () {
            try{
             
                var args = Array.prototype.slice.call(arguments),
                    callback = args.pop(),
                    requiredmodules = (args[0] && typeof args[0] === "string") ? args : args[0],
                    i;

                if (!(this instanceof Public.controller)) {
                    return new Public.controller(requiredmodules, callback);
                }

                if (!requiredmodules || requiredmodules == '*') {
                    requiredmodules = [];
                    for (i in APP.modules) {
                        if (APP.modules.hasOwnProperty(i)) {
                            requiredmodules.push(i);
                        }
                    }
                }
                Private.checkModule(requiredmodules);

                for (i = 0; i < requiredmodules.length; i += 1) {
                    APP.modules[requiredmodules[i]](this);
                }

               callback(this);
            }catch(err) {
                console.error("Public.controller", "Invalid name "+ arguments[0]);
            }

        };
           
        /**
         * [checkModule description]
         * @param  {[type]} arrDependency [description]
         * @return {[type]}               [description]
         */
        Private.checkModule = function (arrDependency) {
            var parts = [],
                parent = APP.modules,
                i,j;

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

       /* Private.tplsettings.tokens.start("[[");
        Private.tplsettings.tokens.end("]]");
        

        Public.tpl = template;*/
        
        /**
         * [extend description]
         * 
         */
        Public.extend = Private.extend;

    

        return Public;

    })(window.APP);
    window.APP = APP;
})(window);
//Source-file: ./modules/MODULE_promise.js
/* jshint strict: false */
/* globals APP, then, catch */
APP.namespace(['http'],'module', function(module) {
    var Private = {};
    Private.ajax = function (opts) {
        return  new Promise( function (resolve, reject) {
            var client = new XMLHttpRequest(),
                params = opts.params;


            //crossdomain solution cors bug-fix!
            /*if(!"withCredentials" in client){
                client.withCredentials = true;
            }*/

            
            if (params && (opts.method === 'POST' || opts.method === 'PUT')) {
                params = JSON.stringify(params);
            }else{
                params = Object.keys(params).map(function (key) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                }).join('&');
            }


            client.open(opts.method, opts.url, true);

            client.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(this.response);
                } else {
                    reject(this.statusText);
                }
            };


            client.onerror = function () {
                reject({
                    status: this.status,
                    statusText: this.statusTextk
                });
            };

            if (opts.headers) {
              Object.keys(opts.headers).forEach(function (key) {
                client.setRequestHeader(key, opts.headers[key]);
              });
            }
           
            client.overrideMimeType("utf-8");
            client.send(params);

           
        });

    };
   

    module.$http = function(opts) {
        return Private.ajax(opts);
    };
},{});
//Source-file: ./projects/site/controller/controller_Forms_site.js
/* jshint strict: false */
/* globals APP, then, catch */
APP.controller(['http'],'controller get json', function (app) {
	var callback = {
    	success : function(data){
        	console.log(1, 'success', JSON.parse(data));
        },
      	error : function(data){
        	console.log(2, 'error', JSON.parse(data));
     	}
    };

  
	var uri = 'http://nodejs-jaffarc.rhcloud.com/api/users';
    var payload = {
      'topic' : 'js',
      'q'     : 'Promise'
    };
    

	app.$http({
	  	method: 'GET',
	  	url : uri,
		params: payload,
	    headers: {
	       'Content-Type': 'application/json;charset=utf-8'

	    }
	})
	.then(callback.success)
	.catch(callback.error);
});