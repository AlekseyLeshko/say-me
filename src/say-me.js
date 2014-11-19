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
    },

    objToArr: function(obj) {
      var arr = [];
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          var newObj = obj[i];
          newObj.name = i;
          arr.push(newObj);
        }
      }
      return arr;
    }
  };

  module.exports = SayMe;
})();
