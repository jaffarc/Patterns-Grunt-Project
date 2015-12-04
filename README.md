Bem-Vindo!

Essa strutura foi criada para js-modular  senguindo alguns padrões de pattern.
	Referências/livros:  Padrões-Javascript, javaScript-Guia-Definitivo, JavaScript-de-alto-desenpenho.    

Problema:
	Nós ultimos anos trabalhando em algumas agencias, percebi a dificuldade de ter varios projetos do mesmo cliente. 
	Principalmente quando o projeto tem a seguinte estrutura:

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

Percebi que ao longo do projeto o gruntfile ficava totalmente ruim de entender ou com varios gruntfile para cada projeto.
Minha ideia foi criar um grunt aonde não importa o que projeto esteja trabalhando tem que usar apenas um gruntfile.
Solução:

	Essa estrutura/pattern  

		Cliente
			|__content
			|	|core
			|	|	|0.jquery.js
			|	|	|1.core.js
			|	|modules
			|	|	|MODULE_Teste.js
			|	|
			|	|projects
			|	|	|site
			|	|	|	|controller
			|	|	|	|	|controller_teste.js
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
			|	|		|	|controller_teste.js
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
			|	|	|MODULE_TesteSpec.js
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



		





Para inicializar um novo projeto você deve seguir os passoas abaixo.

1) Open o project via terminal de um clone desse projeto.

2) Instale as dependencias lembrando que estão todas instaladas.
se a dependencia preciar ser atribuida para todos, instale como Ex: npm install pacote --save-dev.

3) Depois de instalado tudo as dependencias, via terminal execute grunt help, Isso vai mostras as desk ja configurada e como  executar.


4) Todo os modulos devem ter os teste em spec. A ordem de compress os modulos são na ordem que colocar no config.json
o mesmo vale para o css ou sass. 


E isso é tudo que existe! Apenas divirta-se. Vá em frente e editar o código,
ou adicionar novos arquivos. Isso foi um estudo!



FAQ:  Não utilizo UglifyJS pelos motivo descrito pelo criador do grunt-yui-compressor:

Grunt’s built-in min task relies on UglifyJS. I love UglifyJS, but it has a few annoying issues and shortcomings:

It strips license comments of the form /*! foo */, only preserving the first comment in the concatenated file. This may cause you to violate licenses of open-source libraries that you’re using in your projects.
It doesn’t escape non-printable ASCII characters in the output, potentially leading to hard-to-debug issues. Try minifying '\x0b', for example.
There’s no way to make UglifyJS not munge a variable name.
YUI Compressor doesn’t have these issues.

