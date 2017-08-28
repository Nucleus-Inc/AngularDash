module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bowercopy: {
      options: {
        srcPrefix: 'bower_components',
        clean: true
      },
      scripts: {
        options: {
          destPrefix: 'vendors',
          clean: true
        },
        files: {
          'js/jquery.min.js': 'jquery/dist/jquery.min.js',
          'js/angular.min.js': 'angular/angular.min.js',
          'js/angular-route.min.js': 'angular-route/angular-route.min.js',
          'js/angular-mocks.js': 'angular-mocks/angular-mocks.js',
          'js/Chart.min.js': 'chart.js/dist/Chart.min.js',
          'js/angular-modal-service.min.js': 'angular-modal-service/dst/angular-modal-service.min.js',
          'css/angular-notify.min.css': 'angular-notify/dist/angular-notify.min.css',
          'js/angular-notify.min.js': 'angular-notify/dist/angular-notify.min.js',
          'js/angular-table.js': 'at-table/dist/angular-table.js',
          'js/angular-loaders.min.js': 'angular-loaders/dist/angular-loaders.min.js',
          'css/bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css',
          'js/bootstrap.min.js': 'bootstrap/dist/js/bootstrap.min.js',
          'js/tether.min.js': 'tether/dist/js/tether.min.js',
          'js/material.min.js': 'daemonite-material/js/material.min.js',
          'css/material.min.css': 'daemonite-material/css/material.min.css',
          'css/material.css': 'daemonite-material/css/material.css',
          'fonts/fontawesome-webfont.ttf': 'font-awesome/fonts/fontawesome-webfont.ttf',
          'fonts/fontawesome-webfont.woff': 'font-awesome/fonts/fontawesome-webfont.woff',
          'fonts/fontawesome-webfont.woff2': 'font-awesome/fonts/fontawesome-webfont.woff2',
          'css/font-awesome.min.css': 'font-awesome/css/font-awesome.min.css',
          'css/loaders.min.css': 'loaders.css/loaders.min.css'
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/app.min.js': ['dist/app.js']
        },
        options: {
          mangle: false
        }
      }
    },

    html2js: {
      dist: {
        src: ['views/*.html'],
        dest: 'tmp/views.js'
      }
    },

    clean: {
      temp: {
        src: ['tmp']
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['app/**/*.js', 'tmp/*.js'],
        dest: 'dist/app.js'
      }
    },

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 8080
        }
      }
    },

    watch: {
      dev: {
        files: ['Gruntfile.js', 'app/**/*.js', '*.html'],
        tasks: ['html2js:dist', 'concat:dist', 'uglify:dist', 'clean:temp'],
        options: {
          atBegin: true
        }
      },
      min: {
        files: ['Gruntfile.js', 'app/**/*.js', '*.html'],
        tasks: ['karma:unit', 'html2js:dist', 'concat:dist', 'uglify:dist', 'clean:temp'],
        options: {
          atBegin: true
        }
      }
    },

    compress: {
      dist: {
        options: {
          archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
        },
        files: [{
          src: ['index.html'],
          dest: '/'
        }, {
          src: ['dist/**'],
          dest: 'dist/'
        }, {
          src: ['assets/**'],
          dest: 'assets/'
        }, {
          src: ['libs/**'],
          dest: 'libs/'
        }]
      }
    },

    karma: {
      options: {
        configFile: 'config/karma.conf.js'
      },
      unit: {
        singleRun: true
      },

      continuous: {
        singleRun: true,
        autoWatch: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('dev', ['bowercopy', 'connect:server', 'watch:dev']);
  grunt.registerTask('test', ['bowercopy', 'karma:continuous']);
  grunt.registerTask('minified', ['bowercopy', 'connect:server', 'watch:min']);
  grunt.registerTask('package', ['bowercopy', 'karma:unit', 'html2js:dist', 'concat:dist', 'uglify:dist',
    'clean:temp', 'compress:dist'
  ]);
};
