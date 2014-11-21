(function() {
  'use strict';

  var optimist = require('optimist');
  var SayMe = require('./say-me');

  function main() {
    var sayMe = new SayMe();

    var argv = optimist.usage('Usage: say-me <command>', {
      'help': {
        description: 'Show help',
        short: 'h'
      }
    })
    .argv;

    if (argv.h) {
      optimist.showHelp();
      process.exit(0);
    }

    optimist.showHelp();
  };

  main();
})();
