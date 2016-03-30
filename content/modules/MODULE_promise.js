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