(function() {
  'use strict';

  function getMockStdout() {
    var obj = {
      dependencies: {
        npm: {
          version: '2.1.6',
          from: 'npm@',
          resolved: 'https://registry.npmjs.org/npm/-/npm-2.1.6.tgz'
        }
      }
    };

    var str = JSON.stringify(obj);
    return str;
  }

  module.exports = getMockStdout;
})();
