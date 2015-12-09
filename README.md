Welcome!

This structure was created for js-modular according to some standards of pattern.

##References:  
	Book: JavaScript Patterns. 
	Book: javascript the definitive guide, 6h edition. 
	Book: High Performance JavaScript.    

##Problem:
We last years working in some companies, realizes the difficulty of having several projects from the same client. Especially when the project has the following structure:

	public
		|_site 
		|	|css/
		|  	|js/
		|  	|-index.html
		|_landpage
		|	|css/
		|	|js/
		|	|-index.html
		|
		|_Painel
			|css/
			|js/
			|-index.html

I realized that over the project gruntfile was totally bad to understand or with various gruntfile for each project.
My idea was to create a grunt where no matter what project you are working have to use only one gruntfile.

##Solution:

	This structure / pattern  

		Client
			|__content
			|	|core
			|	|	|0.jquery.js
			|	|	|1.core.js
			|	|modules
			|	|	|MODULE_Forms.js
			|	|
			|	|projects
			|	|	|site
			|	|	|	|controller
			|	|	|	|	|controller_Forms_site.js
			|	|	|	|	
			|	|	|	|styles
			|	|	|		|css
			|	|	|		|	|reset.css
			|	|	|		|sass
			|	|	|			|
			|	|	|			|scss
			|	|	|			|	|reset.scss
			|	|	|			|
			|	|	|			|reset.css
			|	|	|painel
			|	|		|controller
			|	|		|	|controller_Forms_painel.js
			|	|		|	
			|	|		|styles
			|	|			|css
			|	|			|	|reset.css
			|	|			|sass
			|	|				|
			|	|				|scss
			|	|				|	|reset.scss
			|	|				|
			|	|				|reset.css
			|	|
			|	|
			|	|spec
			|	|	|MODULE_FormsSpec.js
			|	|
			|	|_config.json
			|	
			|	
			|___|tasks
			|	|	|lib
			|	|	|	|yui-compressor.js
			|	|	|	
			|	|	|plato.js
			|	|	|template_html.js
			|	|	|yui-compressor.js
			|	|
			|	|
			|__templates
			|	|
			|	|site
			|	|	|data
			|	|	|	|data.json
			|	|	|modules
			|	|	|	|headerTop.hbs
			|	|	|	|footer.hbs	
			|	|	|	|**.hbs
			|	|	|	
			|	|	|index.hbs
			|	|	
			|	|landpage	
			|	|	|data
			|	|	|	|data.json
			|	|	|modules
			|	|	|	|headerTop.hbs
			|	|	|	|footer.hbs	
			|	|	|	|**.hbs
			|	|	|	
			|	|	|index.hbs
			|
			|__public
			|	|site
			|	|	|css/general-min-un.css
			|	|	|js/general-min-un.js	
			|	|	|img/**.[png,jpg,gif]
			|	|	|-index.html
			|	|
			|	|painel
			|	|	|css/general-min-un.css
			|	|	|js/general-min-un.js	
			|	|	|img/**.[png,jpg,gif]
			|	|	|-index.html
			|
			|.gitignore
			|.jshintrc
			|Gruntfile.js
			|package.json
			|README.md



##Config
	[
	    [
	        "site",
	        {
	            "module":{
	            	"Forms": true
	            },
	            "styles": {
		        	"sass" : {
		        		"reset":true,
		        		"menu" :true
		        	},
		        	"css": {
		        		"reset" :  true,
		        		"menu":true,
		        		"contato":true
		        	}

			    },
			    "default":{
			    	"debug":false,
			    	"build"  : "./public/www/"
			    }

	        }
	    ],
	  	[
	        "Painel",
	   		{
	            "module":{
	            	"Forms": true
	            },
	            "styles": {
		        	"sass" : {
		        		"reset":true,
		        		"menu" :true
		        	}

			    },
			    "default":{
				    "debug":false,
				    "build" : "./public/Painel/"
				}
	        }
	    ]
	]		




*To start a new project you must follow the steps below.

## Dependencies
*if you don't have it yet.

1. Install [Git](http://git-scm.com/download/)
2. Install [NodeJS](http://nodejs.org/download/)

## Setup
1. Open your terminal and clone the project.
	
	```
	$ git clone https://github.com/jaffarc/Patterns-Grunt-Project
	```

2. Then go to the project's folder.
	```
	cd Patterns-Grunt-Project
	```

3.  Install local dependencies, If you are a problem, installing the dependence manually remembering that some have to be the version that is in package.json.

	```
	npm install   ||  npm install <name>@<version>
	```


## Usage

Once installed all the dependencies, run via terminal:
	```
 	grunt help
	``` 
	It will shows the desk already configured and running.

All the modules should have the test spec. 

The compress order the modules are in order to put in config.json
the same goes for the css or sass.


Just have fun. Go ahead and edit the code or add new files. This was a study!


##FAQ: 
I do not use UglifyJS the reason described by creator grunt-yui-compressor:

Grunt’s built-in min task relies on UglifyJS. I love UglifyJS, but it has a few annoying issues and shortcomings:

It strips license comments of the form /*! foo */, only preserving the first comment in the concatenated file. This may cause you to violate licenses of open-source libraries that you’re using in your projects.
It doesn’t escape non-printable ASCII characters in the output, potentially leading to hard-to-debug issues. Try minifying '\x0b', for example.
There’s no way to make UglifyJS not munge a variable name.
YUI Compressor doesn’t have these issues.

