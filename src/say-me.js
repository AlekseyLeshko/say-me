(function() {
  'use strict';

  var SayMe = function() {
    this.init();
  };

  SayMe.prototype = {
    init: function() {
      this.command = 'npm ls --depth=0 --json';
    }
  };

  module.exports = SayMe;
})();
