/*
 * grunt-npm-install
 * https://github.com/iclanzan/grunt-npm-install
 *
 * Copyright (c) 2013 Sorin Iclanzan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  var npm = require('npm');

  grunt.registerTask('npm-installs', 'Install and update npm modules at multiple locations', function() {
    var folders = this.options().folders || [''];
    for (var i in folders)
      grunt.task.run('npm-install:'+folders[i]);
  })

  grunt.registerTask('npm-install', 'Install and update npm modules at specified location', function (cwd) {
    
    console.log('\nnpm-install '+cwd)
    
    var done = this.async();

    function errorHandler(err) {
      if (err) {
        grunt.log.error(err);
      }
      done();
    }

    npm.load(function (err, npm) {
      if (err) {
        grunt.log.error(err);
        return;
      }
      npm.prefix = cwd;
      npm.commands.install([], errorHandler);
    });
  });
};
