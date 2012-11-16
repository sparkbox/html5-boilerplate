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
    },
    docco: {
      dist: {
        src: ['js/*.js', 'js/*.coffee'],
        out: 'docs/js'
      }
    },
    shell: {
        mkdir: {
          command: 'mkdir -p docs/js/'
        },
        mv_html: {
          command: 'mv docs/*.html docs/js/'
        },
        mv_css: {
          command: 'mv docs/*.css docs/js/'
        }
    }
  });

  grunt.loadNpmTasks("grunt-modernizr");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks('grunt-styleguide');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-shell');

  // Default task.
  grunt.registerTask('default', 'concat min modernizr');
  grunt.registerTask('docs', 'styleguide docco shell:mkdir shell:mv_html shell:mv_css');

};