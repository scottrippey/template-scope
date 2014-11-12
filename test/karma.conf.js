// Karma configuration
// Generated on Tue Nov 11 2014 22:33:00 GMT-0800 (Pacific Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files  / patterns to load in the browser
    files: [
      'lib/**/angular.js',
      'lib/**/angular-mocks.js',
      '../src/**/*.js',
      'specs/**/*.js',
      'specs/**/*.html'
    ],


    // list of files to exclude
    exclude: [
    ],

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'specs/templates/',
      //stripSufix: '.ext',
      // prepend this to the
      //prependPrefix: 'served/',

      // or define a custom transform function
      //cacheIdFromPath: function(filepath) {
      //  return cacheId;
      //},

      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('foo')
      moduleName: 'spec-templates'
    },
    

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      '../src/**/*.js': ['coverage'],
      'specs/**/*.html': ['ng-html2js']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
