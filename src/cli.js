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
        boolean: true,
        description: 'Say installed this program or not',
        short: 'pii',
        alias: 'pii'
      },
      'programsIsInstalled': {
        description: 'Say installed this programs or not',
        short: 'psii'
      },
      'program': {
        alias: 'p',
        string: true
      }
    })
    .argv;

    console.dir(argv);

    if (argv.h) {
      optimist.showHelp();
      process.exit(0);
    }

    if (argv.pii && argv.p) {
      var answer = sayMe.programIsInstalled(argv.p);
      console.log(answer.isInstall);
      process.exit(0);
    }

    if (argv.psii && argv._.length > 0) {
      var answer = sayMe.programsIsInstalled(argv._);
      console.log(answer);
      process.exit(0);
    }

    optimist.showHelp();
  };

  main();
})();
