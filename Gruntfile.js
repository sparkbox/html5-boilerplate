/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      files: ['sass/*', 'coffee/*'],
      tasks: 'default'
    },

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

    requirejs: {
      almond: true,
      replaceRequireScript: [{
        files: ['build/index.html'],
        module: 'main'
      }],
      appDir: "app",
      baseUrl: "js/",
      dir: "build",
      // optimize: "none",
      paths: {
        jquery: 'libs/jquery'
      },
      modules: [
        {
          name: "main"
        }
      ]
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

    clean: ["dist", "docs"],

    styleguide: {
      dist: {
        files: {
          'docs/scss': 'sass/*.scss'
        }
      }
    },

    jasmine : {
      src : ['js/libs/*.js','js/*.js'],
      specs : 'test/spec/*Spec.js',
      helpers : 'test/spec/*Helper.js',
      timeout : 10000,
      server: {
        port: 8800
      },
      phantomjs : {
        'ignore-ssl-errors' : true
      }
    },

    growl: {
      'default': {
        message: "Build complete.",
        title: "Grunt",
        image: __dirname.replace(/\s/,"\\ ") + "/grunt-logo.png"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-styleguide');
  grunt.loadNpmTasks('grunt-jasmine-runner');
  grunt.loadNpmTasks('grunt-growl');


  // Tasks
  grunt.registerTask('default', ['coffee', 'sass', 'jasmine', 'requirejs', 'growl']);
  grunt.registerTask('dist', ['coffee', 'modernizr', 'styleguide', 'growl']); // Needs min task added
};
