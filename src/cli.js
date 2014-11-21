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
      },
      'programIsInstalled': {
        description: 'Say installed this program or not',
        short: 'pii'
      }
    })
    .alias('p', 'program')
    .string('p')
    .argv;

    if (argv.h) {
      optimist.showHelp();
      process.exit(0);
    }

    if (argv.pii && argv.p) {
      var answer = sayMe.programIsInstalled(argv.p);
      console.log(answer.isInstall);
      process.exit(0);
    }

    optimist.showHelp();
  };

  main();
})();
