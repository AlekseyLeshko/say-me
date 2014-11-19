(function() {
  'use strict';

  var SayMe = function() {
    this.init();
  };

  SayMe.prototype = {
    init: function() {
      this.command = 'npm ls --depth=0 --json';
      this.isGlobal = false;
    },

    buildCommand: function() {
      var res = this.command;
      if (this.isGlobal) {
        res += ' -g';
      }
      return res;
    }
  };

  module.exports = SayMe;
})();
