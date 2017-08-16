/*jslint node: true */
"use strict";

module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['jasmine'],
    files: [
      'vendors/jquery.min.js',
      'vendors/angular.min.js',
      'vendors/angular-mocks.js',
      'vendors/angular-route.min.js',
      'vendors/Chart.min.js',
      'node_modules/angular-chart.js/dist/angular-chart.min.js',
      'node_modules/angular-table-1.0.7/dist/angular-table.js',
      'vendors/angular-modal-service.min.js',
      'vendors/angular-notify.min.js',
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
