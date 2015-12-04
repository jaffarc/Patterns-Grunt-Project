module.exports = {
  all: {
      options : {
        title: 'Grafic all js project',
        exclude: /\-min\.js$/,    // excludes source files finishing with ".min.js"
        jshint : {
          "curly": true,
          "eqeqeq": true,
          "immed": true,
          "latedef": true,
          "newcap": true,
          "noarg": true,
          "sub": true,
          "undef": false,
          "boss": true,
          "eqnull": true,
          "node": true,
          "es5": false,

        },
        complexity : {
          logicalor : true,
          switchcase : true,
          forin : true,
          trycatch : true
        }
      },
      files: {
        './info-project/plato': ['content/**/*.js'],
      },
  },
};

