/* jshint undef: true, unused: true */
/* globals APP */

/**
 * [description]
 * @param  {[type]} 
 * @return {[type]} [description]
 */
APP.namespace(['*'], function (app) {

    /*if(!APP.startView('[data-a="1"]')){
        return false
    }
	*/
	console.log(app)
	
	var template = APP.tpl.create(document.getElementById('target'));
	template.scope.name = "jaffar cardoso";
	template.scope.age = app.age();

	template.scope.link = "www.jaffar.com.br";

	template.scope.greet = "Hello";
	template.scope.items = [
		{ "name": "jaffar" },
		{ "name": "front-end" },
		{ "name": "developer" }
	];
   


    template.render();

 

});