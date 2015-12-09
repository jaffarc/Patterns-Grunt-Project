/* jshint undef: true, unused: true */
/* globals APP */


/**
 * [description]
 * @param  {[type]} 
 * @return {[type]} [description]
 */
APP.namespace(['Forms'], function (app) {

    /*if(!APP.startView('[data-a="1"]')){
        return false
    }
	*/
    var settings = soma.template.settings;
    settings.tokens.start("[[");
    settings.tokens.end("]]");

	var template = soma.template.create(document.getElementById('target'));
	template.scope.name = "jaffar cardoso";
	template.scope.age = app.age();
   

	template.scope.greet = "Hello";
	template.scope.items = [
		{ "name": "jaffar" },
		{ "name": "front-end" },
		{ "name": "developer" }
	];


    
   


    template.render();


 

	return this;
  
});