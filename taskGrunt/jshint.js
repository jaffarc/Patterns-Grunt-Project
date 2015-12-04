module.exports = {
  one: {
    src: [
    './APP/**/*.js',
    '!Gruntfile.js',
    '!./APP/core/0.jquery-1.11.3-min.js'],
    options:{
      reporter: require('jshint-table-reporter'),
      "camelcase": false,
      "unused":false,
      "indent": 4,
      "white": true,
      "curly": true,
      "eqeqeq": false,
      "asi":false,
      "immed": true,
      "latedef": true,
      "newcap": true,
      "noarg": false,
      "sub": false,
      "undef": false,
      "boss": true,
      "nomen": false,
      "eqnull": true,
      "browser": true,
      "strict":false,
      "globals": {
        "MYAPP": true,
        "test": true,
        "equal": true,
        "$": true,
        "require": true,
        "Ember": true,
        "console":true,
        "jQuery":true
      }
    }
  },
};