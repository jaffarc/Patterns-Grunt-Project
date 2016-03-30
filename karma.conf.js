module.exports = function(config) {
    config.set({
        basePath: './',
        frameworks: ['jasmine', 'requirejs'],
        //logLevel: config.LOG_DEBUG,
       // logLevel: config.LOG_INFO,
        
        files: [
          {pattern: 'content/core/0.soma-template-v0.3.2.js', included: false},
          {pattern: 'content/**/*.js', included: true},
          {pattern: 'content/test/*.js', included: true},
        ],

        browsers: ['PhantomJS'],
        //autoWatch : true,
        //singleRun: true,
        plugins:[
          'karma-jasmine',
          'karma-coverage',
          'karma-phantomjs-launcher',
          "karma-requirejs"
        ],
        
        reporters: ['progress', 'coverage'],
        preprocessors: {
          'content/*!(test)/*.js': ['coverage'],
        },

        coverageReporter: {
            type : 'html',
            dir: "./coverage",
            reporters: [
                { type: 'text-summary' },
                //{ type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
                { type: "html", subdir: "./Javascript" }
            ]
        },

        thresholdReporter: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100
        }
    });
};
