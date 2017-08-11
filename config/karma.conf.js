/*jslint node: true */
"use strict";

module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['jasmine'],
    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'app/**/*.js',
      'tests/**/*.js',
      'views/*.html',
      'modals/*.html'
    ],
    preprocessors: {
      'views/*.html': 'ng-html2js',
      'app/**/*.js': ['coverage']
    },
    junitReporter: {
      outputFile: 'results/TEST-units.xml',
      suite: ''
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'results/',
      subdir: '.'
    },
    reporters: ['progress'],
    colors: true,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    logLevel: config.LOG_INFO,
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-junit-reporter',
      'karma-coverage'
    ]
  });
};
