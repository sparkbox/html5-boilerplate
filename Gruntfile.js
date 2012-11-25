/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      files: ['app/sass/*', 'app/coffee/*'],
      tasks: 'default'
    },

    sass: {
      dist: {
        files: {
          'app/stylesheets/base.css': 'app/sass/base.scss'
        }
      }
    },

    coffee: {
      compile: {
        files: {
          'app/js/main.js': 'app/coffee/main.coffee'
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
      devFile: "app/js/libs/modernizr-dev.js",
      outputFile: "build/js/modernizr.min.js",
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

    clean: ['build', 'docs', 'app/js/main.js', 'app/stylesheets/base.css'],

    styleguide: {
      dist: {
        files: {
          'docs/scss': 'app/sass/*.scss'
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
  grunt.registerTask('build', ['coffee', 'sass', 'jasmine', 'requirejs', 'modernizr', 'styleguide', 'growl']);
};
