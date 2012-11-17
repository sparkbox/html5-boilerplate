/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      files: ['sass/*', 'coffee/*'],
      tasks: 'default'
    },

    // lint: {
    //   files: 'js/app.js'
    // },

    sass: {
      dist: {
        files: {
          'base.css': 'sass/base.scss'
        }
      }
    },

    coffee: {
      compile: {
        files: {
          'js/app.js': 'coffee/app.coffee'
        }
      }
    },

    concat: {
      dist: {
        //i.e. src: ['js/libs/mediaCheck.js', 'js/app.js'],
        src: ['js/app.js'],
        //change this to a site specific name i.e. uwg.js or dty.js
        dest: 'dist/js/app.js'
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

    targethtml: {
      dev: {
        src: 'index.html',
        dest: 'dist/index.html'
      },
      prod: {
        src: 'index.html',
        dest: 'dist/index.html'
      }
    },

    clean: ["js/*.concat.js", "dist", "docs"],

    styleguide: {
      dist: {
        files: {
          'docs/scss': 'sass/*.scss'
        }
      }
    },

    exec: {
      docco: {
        command: 'docco -o docs/js/ js/*.js js/*.coffee'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-styleguide');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-exec');


  // Default task.
  grunt.registerTask('default', ['coffee', 'sass', 'targethtml:dev', 'docs']);
  grunt.registerTask('dist', ['coffee', 'concat', 'targethtml:prod', 'modernizr']); // Needs min task added
  grunt.registerTask('docs', ['styleguide', 'exec:docco']);
};
