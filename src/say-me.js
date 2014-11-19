(function() {
  'use strict';

  var process = require('child_process');

  var SayMe = function() {
    this.init();
  };

  SayMe.prototype = {
    init: function() {
      this.defaultCommand = 'npm ls --depth=0 --json';
      this.command = '';
      this.isGlobal = false;
      this.programs = {};
    },

    check: function(programs) {
      this.programs = programs;
      this.buildCommand();

      var data = {};
      if (this.programs.npm) {
        data.npm = this.processingNpmModules();
      }

      return data;
    },

    processingNpmModules: function() {
      var self = this;
      var res;
      process.exec(this.command, function(err, stdout, stderr) {
        var npmObj = JSON.parse(stdout);
        var npmModuleArr = self.objToArr(npmObj.dependencies);
        var data = self.checkNpmModules(npmModuleArr);
        res = data;
        console.log(data);
      });
      return res;
    },

    checkNpmModules: function(installedModules) {
      var data = {};
      for (var i = 0; i < this.programs.npm.length; i++) {
        var val = false;
        for (var j = 0; j < installedModules.length; j++) {
          if (this.programs.npm[i] === installedModules[j].name) {
            val = true;
            break;
          }
        }
        data[this.programs.npm[i]] = val;
      }
      return data;
    },

    buildCommand: function() {
      this.command = this.defaultCommand;
      if (this.isGlobal) {
        this.command += ' -g';
      }
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
