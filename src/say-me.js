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
      this.programs = {};
      this.sh = sh;
      this.programList = [];
    },

    programIsInstalled: function(name) {
      this.programsIsInstalled([name]);
      return this.programList[0];
    },

    programsIsInstalled: function(arr) {
      this.cleanProgramList();

      this.convertToProgramList(arr);
      this.checkPrograms();

      return this.programList;
    },

    convertToProgramList: function(strList) {
      for (var i = 0; i < strList.length; i++) {
        var name = strList[i];
        var program = {
          name: name
        };
        this.programList.push(program);
      };
    },

    checkPrograms: function() {
      for (var i = 0; i < this.programList.length; i++) {
        var program = this.programList[i];
        var path = this.sh.which(program.name);
        program.isInstall = path ? true : false;
      }
    },

    npmModulesIsInstalled: function(moduleArr) {
      this.cleanProgramList();

      this.convertToProgramList(moduleArr);
      this.buildCommand();
      this.processingNpmModules();

      return this.programList;
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
      var stdout = this.sh.exec(this.command);
      if (stdout.code !== 0) {
        console.log('Error');
        return {};
      }

      var npmObj = JSON.parse(stdout.output);
      var npmModuleArr = this.objToArr(npmObj.dependencies);
      var data = this.checkNpmModules(npmModuleArr);
      return data;
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
    }
  };

  module.exports = SayMe;
})();
