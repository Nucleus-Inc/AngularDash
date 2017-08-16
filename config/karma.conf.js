/*jslint node: true */
"use strict";

module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['jasmine'],
    files: [
      'vendors/js/jquery.min.js',
      'vendors/js/angular.min.js',
      'vendors/js/angular-mocks.js',
      'vendors/js/angular-route.min.js',
      'vendors/js/Chart.min.js',
      'node_modules/angular-chart.js/dist/angular-chart.min.js',
      'vendors/js/angular-table.min.js',
      'vendors/js/angular-modal-service.min.js',
      'vendors/js/angular-notify.min.js',
      'vendors/js/angular-loaders.min.js',
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
