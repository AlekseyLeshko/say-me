(function() {
  'use strict';

  var sh = require('shelljs');

  var SayMe = function() {
    this.init();
  };

  SayMe.prototype = {
    init: function() {
      this.defaultCommand = 'npm ls --depth=0 --json';
      this.command = '';
      this.isGlobal = false;
      this.sh = sh;
      this.programList = [];
    },

    getAllNpmModules: function() {
      this.buildCommand();
      var npmModuleArr = this.getNpmModuleArr();

      return npmModuleArr;
    },

    getNpmModuleArr: function() {
      var execOption = {
        silent: true
      };
      var stdout = this.sh.exec(this.command, execOption);
      if (stdout.code !== 0) {
        console.log('Error');
        return;
      }

      var npmObj = JSON.parse(stdout.output);
      var npmModuleArr = this.objToArr(npmObj.dependencies);
      return npmModuleArr;
    },

    programIsInstalled: function(name) {
      var res = this.programsIsInstalled([name]);
      return res;
    },

    programsIsInstalled: function(arr) {
      this.cleanProgramList();

      this.convertToProgramList(arr);
      this.checkPrograms();
      var res = this.allInstalled();

      return res;
    },

    convertToProgramList: function(strList) {
      for (var i = 0; i < strList.length; i++) {
        var name = strList[i];
        var program = {
          name: name
        };
        this.programList.push(program);
      }
    },

    checkPrograms: function() {
      for (var i = 0; i < this.programList.length; i++) {
        var program = this.programList[i];
        var path = this.sh.which(program.name);
        program.isInstall = path ? true : false;
      }
    },

    npmModuleIsInstalled: function(moduleName) {
      var res = this.npmModulesIsInstalled([moduleName]);
      return res;
    },

    npmModulesIsInstalled: function(moduleNameArr) {
      this.cleanProgramList();

      this.convertToProgramList(moduleNameArr);
      this.buildCommand();
      this.processingNpmModules();
      var res = this.allInstalled();

      return res;
    },

    processingNpmModules: function() {
      var npmModuleArr = this.getNpmModuleArr();
      this.checkNpmModules(npmModuleArr);
    },

    checkNpmModules: function(installedModules) {
      for (var i = 0; i < this.programList.length; i++) {
        var program = this.programList[i];
        program.isInstall = false;
        for (var j = 0; j < installedModules.length; j++) {
          if (program.name === installedModules[j].name) {
            program.isInstall = true;
            break;
          }
        }
      }
    },

    cleanProgramList: function() {
      this.programList = [];
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
    },

    allInstalled: function() {
      for (var i = 0; i < this.programList.length; i++) {
        var program = this.programList[i];
        if (!program.isInstall) {
          return false;
        }
      }
      return true;
    }
  };

  module.exports = SayMe;
})();
