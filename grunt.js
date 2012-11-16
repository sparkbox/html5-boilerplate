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
        dest: 'js/app.concat.js'
      }
    },

    min: {
      dist: {
        src: ['js/app.concat.js'],
        dest: 'dist/js/app.min.js'
      }
    },

    modernizr: {
      devFile: "js/libs/modernizr-dev.js",
      outputFile: "dist/js/modernizr.min.js",
      extra: {
          shiv: true,
          printshiv: false,
          load: true,
          mq: false,
          cssclasses: true
      },
      extensibility: {
          addtest: false,
          prefixed: false,
          teststyles: false,
          testprops: false,
          testallprops: false,
          hasevents: false,
          prefixes: false,
          domprefixes: false
      },
      uglify: true,
      parseFiles: true,
      matchCommunityTests: false
    },

    clean: ["js/*.concat.js", "dist", "docs"],

    styleguide: {
      dist: {
        files: {
          'docs/scss': 'sass/*.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-modernizr");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks('grunt-styleguide');

  // Default task.
  grunt.registerTask('default', 'concat min modernizr');
};