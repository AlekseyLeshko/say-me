'use strict';
var SayMe = require('../src/say-me');
var getMockStdout = require('./helpers/mockStdout.js');
var getMockInstalledModules = require('./helpers/mockInstalledModules.js');

describe('say-me', function() {
  var sayMe;

  beforeEach(function() {
    sayMe = new SayMe();
  });

  it('should create member when creating', function() {
    var expected = 'npm ls --depth=0 --json';
    expect(sayMe.defaultCommand).toEqual(expected);
    expect(sayMe.command).toEqual('');
    expect(sayMe.isGlobal).toBeFalsy();
    expect(sayMe.sh).toBeDefined();
    expect(sayMe.programList.length).toEqual(0);
  });

  it('should build command', function() {
    var expected = 'npm ls --depth=0 --json';

    sayMe.buildCommand();

    expect(sayMe.command).toEqual(expected);
  });

  it('should build command with global flag', function() {
    var expected = 'npm ls --depth=0 --json -g';
    sayMe.isGlobal = true;

    sayMe.buildCommand();
    expect(sayMe.command).toEqual(expected);
  });

  it('should objToArr', function() {
    var obj = {
      test: 'test',
      value: 'value'
    };

    var arr = sayMe.objToArr(obj);
    expect(arr.length).toEqual(2);
  });

  it('should checkNpmModules', function() {
    var installedModules = getMockInstalledModules();
    var npmModuleArr = [
      'npm',
      'say-me',
      'gulp',
      'test-module'
    ];
    sayMe.convertToProgramList(npmModuleArr);


    sayMe.checkNpmModules(installedModules);

    expect(sayMe.programList[0].isInstall).toBeTruthy();
    expect(sayMe.programList[1].isInstall).toBeTruthy();
    expect(sayMe.programList[2].isInstall).toBeTruthy();
    expect(sayMe.programList[3].isInstall).toBeFalsy();
  });

  it('should processingNpmModules', function() {
    var output = getMockStdout();
    spyOn(sayMe.sh, 'exec').and.callFake(function() {
      var mockStdout = {
        code: 0,
        output: output
      };
      return mockStdout;
    });
    spyOn(sayMe, 'objToArr');
    spyOn(sayMe, 'checkNpmModules');

    sayMe.processingNpmModules();

    expect(sayMe.sh.exec).toHaveBeenCalled();
    var json = JSON.parse(output);
    expect(sayMe.objToArr).toHaveBeenCalledWith(json.dependencies);
    expect(sayMe.checkNpmModules).toHaveBeenCalled();
  });

  it('should processingNpmModules with error', function() {
    spyOn(sayMe.sh, 'exec').and.callFake(function() {
      var mockStdout = {
        code: 1
      };
      return mockStdout;
    });
    spyOn(console, 'log');

    sayMe.processingNpmModules();

    expect(sayMe.sh.exec).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalled();
  });

  it('should cleanProgramList', function() {
    sayMe.programList = [1, 2, 3];
    expect(sayMe.programList.length).toEqual(3);

    var obj = sayMe.cleanProgramList();

    expect(sayMe.programList.length).toEqual(0);
  });

  describe('with processing strList', function() {
    var strList;

    beforeEach(function() {
      strList = [
        'node',
        'npm'
      ];
    });

    it('should convertToProgramList', function() {
      sayMe.convertToProgramList(strList);

      expect(sayMe.programList.length).toEqual(strList.length);
      expect(sayMe.programList[0].name).toEqual(strList[0]);
    });

    it('should checkPrograms', function() {
      var notInstalledProgram = 'test-module';
      spyOn(sayMe.sh, 'which').and.callFake(function(value) {
        return value !== notInstalledProgram ? '/path/' : null;
      });

      strList.push(notInstalledProgram);
      sayMe.convertToProgramList(strList);

      sayMe.checkPrograms();

      expect(sayMe.sh.which).toHaveBeenCalled();
      expect(sayMe.programList.length).toEqual(strList.length);
      expect(sayMe.programList[0].isInstall).toBeTruthy();
      expect(sayMe.programList[1].isInstall).toBeTruthy();
      expect(sayMe.programList[2].isInstall).toBeFalsy();
    });
  });

  it('should programIsInstalled return isInstall = true', function() {
    spyOn(sayMe, 'programsIsInstalled').and.callFake(function() {
      return true;
    });

    var programName = 'node';

    var res = sayMe.programIsInstalled(programName);

    expect(res).toBeTruthy();
    expect(sayMe.programsIsInstalled).toHaveBeenCalledWith([programName]);
  });

  it('should programsIsInstalled', function() {
    spyOn(sayMe, 'cleanProgramList');
    spyOn(sayMe, 'convertToProgramList');
    spyOn(sayMe, 'checkPrograms');
    spyOn(sayMe, 'allInstalled').and.callFake(function() {
      return true;
    });

    var strList = [
      'node',
      'npm',
      'test-module'
    ];

    var res = sayMe.programsIsInstalled(strList);

    expect(res).toBeTruthy();
    expect(sayMe.cleanProgramList).toHaveBeenCalled();
    expect(sayMe.convertToProgramList).toHaveBeenCalledWith(strList);
    expect(sayMe.checkPrograms).toHaveBeenCalled();
  });

  it('should', function() {
    spyOn(sayMe, 'cleanProgramList');
    spyOn(sayMe, 'convertToProgramList');
    spyOn(sayMe, 'buildCommand');
    spyOn(sayMe, 'processingNpmModules');
    spyOn(sayMe, 'allInstalled').and.callFake(function() {
      return true;
    });

    var moduleNameArr = [
      'jasmine',
      'npm',
      'say-me',
      'test-module'
    ];

    var res = sayMe.npmModulesIsInstalled(moduleNameArr);

    expect(res).toBeTruthy();
    expect(sayMe.cleanProgramList).toHaveBeenCalled();
    expect(sayMe.convertToProgramList).toHaveBeenCalledWith(moduleNameArr);
    expect(sayMe.buildCommand).toHaveBeenCalled();
    expect(sayMe.processingNpmModules).toHaveBeenCalled();
    expect(sayMe.allInstalled).toHaveBeenCalled();
  });

  it('should npmModuleIsInstalled', function() {
    spyOn(sayMe, 'npmModulesIsInstalled').and.callFake(function() {
      return true;
    });
    var moduleName = 'say-me';

    var res = sayMe.npmModuleIsInstalled(moduleName);

    expect(res).toBeTruthy();
    expect(sayMe.npmModulesIsInstalled).toHaveBeenCalled();
  });

  it('should allInstalled return true', function() {
    sayMe.programList = [{
      isInstall: true
    }, {
      isInstall: true
    }];

    var value = sayMe.allInstalled();

    expect(value).toBeTruthy();
    sayMe.programList.length = 0;
  });

  it('should allInstalled return false', function() {
    sayMe.programList = [{
      isInstall: true
    }, {
      isInstall: false
    }];
    var value = sayMe.allInstalled();

    expect(value).toBeFalsy();
    sayMe.programList.length = 0;
  });
});
