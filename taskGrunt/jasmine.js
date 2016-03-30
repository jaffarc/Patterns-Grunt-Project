module.exports =  {
    coverage: {
        src: './content/modules/**/*.js',
        options: {
            specs: './content/test/**/*.js',
            template: require('grunt-template-jasmine-istanbul'),
            templateOptions: {
                coverage: './coverage/coverage.json',
                report: [
                    {
                        type: 'html',
                        options: {
                            dir: './coverage/html'
                        }
                    },
                    {
                        type: 'cobertura',
                        options: {
                            dir: './coverage/cobertura'
                        }
                    },
                    {
                        type: 'text-summary'
                    }
                ]
            },
            vendor: [
                './spec/libs/require.js',
                './content/core/0.soma-template-v0.3.2.js',
                './content/core/1.core.js'
            ]
        }
    }
    
};