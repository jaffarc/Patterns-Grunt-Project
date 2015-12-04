/*
 * grunt-template-html
 * https://github.com/Lam/grunt-template-html
 *
 * Copyright (c) 2013 Lam Te
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  var consolidate = require('consolidate'),
      _ = grunt.util._;

  grunt.registerMultiTask('template', 'Your task description goes here.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var done = this.async();

    var data = this.data;
    if (data.partials && data.cwd) {
      var partials = grunt.file.expand(data.partials).map(function(filepath){
        return filepath.replace(data.cwd, '').split('.')[0];
      });
      data.options.partials = _.extend(data.options.partials || {}, _.object(partials,partials));
    }

    if (data.data) {
      data.options.data = _.extend(data.options.data || {}, grunt.file.readJSON(data.data));
    }
    grunt.util.async.forEachSeries(this.files, function(f, nextFileObj) {
      var destFile = f.dest;
      var files = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });
      
/*      var re = /([\w\d_-]*)\.?[^\\\/]*$/g;
      var found = destFile.match(re);
       grunt.log.writeln('TTTT:'+ filepath );*/



      if (files.length === 0) {
        if (f.src.length < 1) {
          grunt.log.warn('Destination not written because no source files were found.');
        }

        // No src files, goto next target. Warn would have been issued above.
        return nextFileObj();
      }

      var srcFile = f.src.pop();
      var options = _.clone(data.options, true);
      //console.log(options);
      consolidate[data.engine](srcFile, options, function(err, html){
        if (err)
        {
          grunt.log.error(err);
          done(false);
        }

        grunt.file.write(destFile, html);
        grunt.log.writeln("HTML written to '"+ destFile +"'");
        nextFileObj();
      });
    }, done);
  });

};