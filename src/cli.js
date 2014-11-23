(function() {
  'use strict';

  var optimist = require('optimist');
  var SayMe = require('./say-me');

  function main() {
    var sayMe = new SayMe();

    var argv = optimist.usage('Usage: say-me <command>', {
      'help': {
        boolean: true,
        description: 'Show help',
        short: 'h',
        alias: 'h'
      },
      'programIsInstalled': {
        boolean: true,
        description: 'Say installed this program or not',
        short: 'pii',
        alias: 'pii'
      },
      'programsIsInstalled': {
        boolean: true,
        description: 'Say installed this programs or not',
        short: 'psii',
        alias: 'psii'
      },
      'npmModuleIsInstalled': {
        boolean: true,
        description: 'Say installed this npm module or not',
        short: 'npmmii',
        alias: 'npmmii'
      },
      'npmModulesIsInstalled': {
        boolean: true,
        description: 'Say installed this npm modules or not',
        short: 'npmmsii',
        alias: 'npmmsii'
      },
      'program': {
        alias: 'p',
        string: true
      },
      'global': {
        alias: 'g',
        boolean: true
      }
    })
    .argv;

    if (argv.h) {
      optimist.showHelp();
      process.exit(0);
    }

    if (argv.g) {
      sayMe.isGlobal = true;
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

    if (argv.npmmii && argv.p) {
      var answer = sayMe.npmModuleIsInstalled(argv.p);
      console.log(answer.isInstall);
      process.exit(0);
    }

    if (argv.npmmsii && argv._.length > 0) {
      var answer = sayMe.npmModulesIsInstalled(argv._);
      console.log(answer);
      process.exit(0);
    }
  };

  main();
})();
