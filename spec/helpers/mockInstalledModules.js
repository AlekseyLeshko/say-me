(function() {
  'use strict';

  function getMockInstalledModules() {
    var arr = [{
        version: '2.1.6',
        from: 'npm@',
        resolved: 'https://registry.npmjs.org/npm/-/npm-2.1.6.tgz',
        name: 'npm'
      }, {
        version: '3.8.10',
        from: 'gulp@*',
        resolved: 'https://registry.npmjs.org/gulp/-/gulp-3.8.10.tgz',
        name: 'gulp'
      }, {
        version: '0.0.1',
        from: 'say-me@',
        resolved: '',
        name: 'say-me'
      }
    ];
    return arr;
  }

  module.exports = getMockInstalledModules;
})();
