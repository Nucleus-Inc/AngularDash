module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    copy: {
      node_modules: {
        files: [
          {
            src: 'node_modules/bootstrap-layout/dist/bootstrap-layout.js',
            dest: 'public/vendors/js/bootstrap-layout.min.js'
          },
          {
            src: 'node_modules/bootstrap-layout/dist/bootstrap-layout.css',
            dest: 'public/vendors/css/bootstrap-layout.min.css'
          }
        ]
      }
    },

    sass: {
      dist: {
        files: {
          'public/dist/app.css': 'public/app/assets/sass/app.scss'
        }
      }
    },

    bowercopy: {
      options: {
        srcPrefix: 'bower_components',
        clean: true
      },
      scripts: {
        options: {
          destPrefix: 'public/vendors',
          clean: true
        },
        files: {
          'js/jquery.min.js': 'jquery/dist/jquery.min.js',
          'js/angular.min.js': 'angular/angular.min.js',
          'js/tether.min.js': 'tether/dist/js/tether.min.js',
          'js/material.min.js': 'daemonite-material/js/material.min.js',
          'js/bootstrap.min.js': 'bootstrap/dist/js/bootstrap.min.js',
          'js/angular-sanitize.min.js': 'angular-sanitize/angular-sanitize.min.js',
          'js/angular-route.min.js': 'angular-route/angular-route.min.js',
          'js/angular-animate.min.js': 'angular-animate/angular-animate.min.js',
          'js/angular-messages.min.js': 'angular-messages/angular-messages.min.js',
          'js/angular-local-storage.min.js': 'angular-local-storage/dist/angular-local-storage.min.js',
          'js/angular-mocks.js': 'angular-mocks/angular-mocks.js',
          'js/zxcvbn.js': 'zxcvbn/dist/zxcvbn.js',
          'js/angular-zxcvbn.js': 'angular-zxcvbn/dist/angular-zxcvbn.js',
          'js/Chart.min.js': 'chart.js/dist/Chart.min.js',
          'js/angular-chart.min.js': 'angular-chart.js/dist/angular-chart.min.js',
          'js/popper.min.js': 'popper.js/dist/popper.min.js',
          'js/angular-modal-service.min.js': 'angular-modal-service/dst/angular-modal-service.min.js',
          'js/angular-input-masks-standalone.min.js': 'angular-input-masks/angular-input-masks-standalone.min.js',
          'js/angular-notify.min.js': 'angular-notify/dist/angular-notify.min.js',
          'js/angular-table.js': 'at-table/dist/angular-table.js',
          'js/angular-loaders.min.js': 'angular-loaders/dist/angular-loaders.min.js',
          'js/angular-validation-match.min.js': 'angular-validation-match/dist/angular-validation-match.min.js',
          'css/material.min.css': 'daemonite-material/css/material.min.css',
          'css/bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css',
          'css/font-awesome.min.css': 'font-awesome/css/font-awesome.min.css',
          'css/loaders.min.css': 'loaders.css/loaders.min.css',
          'css/angular-notify.min.css': 'angular-notify/dist/angular-notify.min.css',
          'fonts/fontawesome-webfont.ttf': 'font-awesome/fonts/fontawesome-webfont.ttf',
          'fonts/fontawesome-webfont.woff': 'font-awesome/fonts/fontawesome-webfont.woff',
          'fonts/fontawesome-webfont.woff2': 'font-awesome/fonts/fontawesome-webfont.woff2'
        }
      }
    },

    uglify: {
     dist: {
       files: {
         'public/dist/app.min.js': ['public/dist/app.js']
       },
       options: {
         mangle: false
       }
     }
   },

   cssmin: {
      build: {
        files: {
          'public/dist/app.min.css': 'public/dist/app.css'
        }
      }
    },

   html2js: {
      dist: {
        src: ['public/app/views/*.html'],
        dest: 'public/tmp/views.js'
      }
    },

    clean: {
      temp: {
        src: ['tmp']
      }
    },

    compress: {
      dist: {
        options: {
          archive: 'public/dist/<%= pkg.name %>-<%= pkg.version %>.zip'
        },
        files: [{
          src: ['index.html'],
          dest: '/'
        }, {
          src: ['public/dist/**'],
          dest: 'public/dist/'
        }, {
          src: ['public/assets/**'],
          dest: 'public/assets/'
        }, {
          src: ['public/libs/**'],
          dest: 'public/libs/'
        }, {
          src: ['public/vendors/**'],
          dest: 'public/vendors/'
        }]
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['public/app/app.js', 'public/app/**/*.js', 'public/tmp/*.js'],
        dest: 'public/dist/app.js'
      }
    },

    watch: {
      dev: {
         files: ['Gruntfile.js','public/app/**/*.js','public/app/assets/sass/*.scss','public/viwes/**/*.html'],
         tasks: ['sass:dist','cssmin','html2js:dist','concat:dist','uglify:dist','clean:temp'],
         options: {
           atBegin: true
         }
      },
      min: {
        files: ['Gruntfile.js','public/app/**/*.js','public/app/assets/assets/*.scss'],
        tasks: ['cssmin','html2js:dist','concat:dist','uglify:dist','clean:temp'],
        options: {
          atBegin: true
        }
      }
   },

    nodemon: {
      dev: {
        script: 'app.js'
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon','watch:dev']
    }

  });

  grunt.loadNpmTasks('grunt-npm-install');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('pre', ['npm-install']);
  grunt.registerTask('dev', ['copy:node_modules','bowercopy','sass:dist','cssmin','concurrent']);
  grunt.registerTask('test', ['copy:node_modules','bowercopy']);
  grunt.registerTask('minified', ['copy:node_modules','bowercopy','watch:min']);
  grunt.registerTask('default', ['copy:node_modules','bowercopy','sass:dist','cssmin','html2js:dist','concat:dist','uglify:dist','clean:temp','concurrent']);

}
