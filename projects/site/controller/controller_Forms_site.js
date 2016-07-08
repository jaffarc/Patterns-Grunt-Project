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