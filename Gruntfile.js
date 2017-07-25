
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      dist: {
        files: {
          'dist/app.min.js': [ 'app/app.js' ]
        },
        options: {
          mangle: false
        }
      }
    },

    html2js: {
      dist: {
        src: [ 'app/templates/*.html' ],
        dest: 'tmp/templates.js'
      }
    },

    clean: {
      temp: {
        src: [ 'tmp' ]
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [ 'app/*.js', 'tmp/*.js' ],
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
        files: [ 'Gruntfile.js', 'app/*.js', '*.html' ],
        tasks: [ 'karma:unit', 'html2js:dist', 'concat:dist', 'clean:temp' ],
        options: {
          atBegin: true
        }
      },
      min: {
        files: [ 'Gruntfile.js', 'app/*.js', '*.html' ],
        tasks: [ 'karma:unit', 'html2js:dist', 'concat:dist', 'clean:temp', 'uglify:dist' ],
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
          src: [ 'index.html' ],
          dest: '/'
        }, {
          src: [ 'dist/**' ],
          dest: 'dist/'
        }, {
          src: [ 'assets/**' ],
          dest: 'assets/'
        }, {
          src: [ 'libs/**' ],
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
        singleRun: false,
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
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('dev', [ 'connect:server', 'watch:dev' ]);
  grunt.registerTask('test', [ 'karma:continuous' ]);
  grunt.registerTask('minified', [ 'connect:server', 'watch:min' ]);
  grunt.registerTask('package', [ 'karma:unit', 'html2js:dist', 'concat:dist', 'uglify:dist',
    'clean:temp', 'compress:dist' ]);
};
