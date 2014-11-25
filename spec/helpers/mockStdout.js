(function() {
  'use strict';

  function getMockStdout() {
    var str = '{"dependencies":{"npm":{"version":"2.1.6","from":"npm@","resolved":"https://registry.npmjs.org/npm/-/npm-2.1.6.tgz"}}}';
    return str;
  }

  module.exports = getMockStdout;
})();
