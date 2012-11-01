/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.

  //Simply run grunt watch from the command line to get started.

  grunt.initConfig({
    watch: {
        files: 'js/app.js',
        tasks: 'default'
    },

    lint: {
      files: 'js/app.js'
    },

    concat: {
      dist: {
        //i.e. src: ['js/libs/mediaCheck.js', 'js/app.js'],
        src: ['js/app.js'],
        //change this to a site specific name i.e. uwg.js or dty.js
        dest: 'js/app_concat.js'
      }
    },

    min: {
      dist: {
        src: ['js/app_concat.js'],
        dest: 'js/app_concat.min.js'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'concat min');
};