module.exports = {
  one: {
    src: [
    './content/**/*.js',
    '!Gruntfile.js',
    '!./content/libs/*.js'],
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
        "APP": true,
        "test": true,
        "equal": true,
        "require": true,
        "Ember": true,
        "console":true,
        
      }
    }
  },
};