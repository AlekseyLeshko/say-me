'use strict';
var SayMe = require('../src/say-me');

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
    var output = getmockStdout();
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
    sayMe.checkPrograms = function() {
      this.programList[0].isInstall = true;
    };
    spyOn(sayMe, 'cleanProgramList').and.callThrough();
    spyOn(sayMe, 'convertToProgramList').and.callThrough();
    spyOn(sayMe, 'checkPrograms').and.callThrough();

    var programName = 'node';

    var obj = sayMe.programIsInstalled(programName);

    expect(obj.name).toEqual(programName);
    expect(obj.isInstall).toBeTruthy();
    expect(sayMe.cleanProgramList).toHaveBeenCalled();
    expect(sayMe.convertToProgramList).toHaveBeenCalled();
    expect(sayMe.checkPrograms).toHaveBeenCalled();
  });

  it('should programIsInstalled return isInstall = true', function() {
    sayMe.checkPrograms = function() {
      this.programList[0].isInstall = true;
      this.programList[1].isInstall = true;
      this.programList[2].isInstall = false;
    };
    spyOn(sayMe, 'cleanProgramList').and.callThrough();
    spyOn(sayMe, 'convertToProgramList').and.callThrough();
    spyOn(sayMe, 'checkPrograms').and.callThrough();

    var strList = [
      'node',
      'npm',
      'test-module'
    ]

    var arr = sayMe.programsIsInstalled(strList);

    expect(sayMe.cleanProgramList).toHaveBeenCalled();
    expect(sayMe.convertToProgramList).toHaveBeenCalled();
    expect(sayMe.checkPrograms).toHaveBeenCalled();
    expect(arr.length).toEqual(strList.length);
    expect(arr[0].isInstall).toBeTruthy();
    expect(arr[1].isInstall).toBeTruthy();
    expect(arr[2].isInstall).toBeFalsy();
  });

  it('should', function() {
    spyOn(sayMe, 'cleanProgramList');
    spyOn(sayMe, 'convertToProgramList');
    spyOn(sayMe, 'buildCommand');
    spyOn(sayMe, 'processingNpmModules');

    var moduleNameArr = [
      'jasmine',
      'npm',
      'say-me',
      'test-module'
    ];

    var arr = sayMe.npmModulesIsInstalled(moduleNameArr);

    expect(arr).toEqual(sayMe.programList);

    expect(sayMe.cleanProgramList).toHaveBeenCalled();
    expect(sayMe.convertToProgramList).toHaveBeenCalledWith(moduleNameArr);

    expect(sayMe.buildCommand).toHaveBeenCalled();
    expect(sayMe.processingNpmModules).toHaveBeenCalled();
  });

  it('should npmModuleIsInstalled', function() {
    spyOn(sayMe, 'npmModulesIsInstalled');
    var moduleName = 'say-me';

    var value = sayMe.npmModuleIsInstalled(moduleName);

    expect(sayMe.npmModulesIsInstalled).toHaveBeenCalled();
    expect(value).toEqual(sayMe.programList[0]);
  });
});

function getmockStdout() {
  var str = '{"dependencies":{"npm":{"version":"2.1.6","from":"npm@","resolved":"https://registry.npmjs.org/npm/-/npm-2.1.6.tgz"}}}';
  return str;
}

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
