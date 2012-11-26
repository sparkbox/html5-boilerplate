/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      files: ['app/sass/*', 'app/coffee/*'],
      tasks: 'watching'
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
        files: ['release/index.html'],
        module: 'main'
      }],
      appDir: "app",
      baseUrl: "js/",
      dir: "release",
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

    targethtml: {
      dev: {
        src: 'app/index.dev.html',
        dest: 'app/index.html'
      },
      release: {
        src: 'app/index.dev.html',
        dest: 'build/index.html'
      }
    },

    modernizr: {
      devFile: "app/js/libs/modernizr-dev.js",
      outputFile: "release/js/libs/modernizr.min.js",
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

    clean: {
      commit: ['release', 'docs', 'app/js/main.js', 'app/stylesheets/base.css'],
      release: ['release/coffee', 'release/sass', 'release/index.dev.html', 'release/test/', 'release/_SpecRunner.html', 'release/meta.json', 'release/readme.md']
    },

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
        message: "release complete.",
        title: "Grunt",
        image: __dirname.replace(/\s/,"\\ ") + "/grunt-logo.png"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-styleguide');
  grunt.loadNpmTasks('grunt-jasmine-runner');
  grunt.loadNpmTasks('grunt-growl');

  // Tasks
  grunt.registerTask('watching', ['coffee', 'sass', 'jasmine', 'targethtml:dev', 'growl']);
  grunt.registerTask('default', ['coffee', 'sass', 'jasmine', 'requirejs', 'targethtml:dev', 'growl']);
  grunt.registerTask('release', ['coffee', 'sass', 'jasmine', 'requirejs', 'targethtml:release', 'modernizr', 'styleguide', 'clean:release', 'growl']);
};
