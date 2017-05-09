(function() {

  module.exports = function(config) {
    return config.set({
      basePath: '',
      frameworks: ['browserify', 'mocha'],
      files: ['test/**/*Tests.coffee'],
      exclude: [],
      preprocessors: {
        'test/**/*.coffee': ['browserify']
      },
      browserify: {
        debug: true,
        transform: ['coffeeify'],
        extensions: ['.js', '.coffee']
      },
      reporters: ['progress'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      singleRun: false
    });
  };

}).call(this);
