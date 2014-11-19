'use strict';
var SayMe = require('../src/say-me');

describe('say-me', function() {
  var sayMe = new SayMe();

  it('should create member when creating', function() {
    var expected = 'npm ls --depth=0 --json';
    expect(sayMe.defaultCommand).toEqual(expected);
    expect(sayMe.command).toEqual('');
    expect(sayMe.isGlobal).toBeFalsy();
    expect(sayMe.programs).toEqual({});
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

  it('should objToArr', function() {
    var obj = {
      test: 'test',
      value: 'value'
    };

    var arr = sayMe.objToArr(obj);
    expect(arr.length).toEqual(2);
  });

  it('should checkNpmModules', function() {
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
    var obj = {
      npm: [
        'npm',
        'say-me',
        'gulp',
        'test-module'
      ]
    };
    sayMe.programs = obj;

    var res = sayMe.checkNpmModules(arr);
    expect(res.npm.npm).toBeTruthy();
    expect(res.npm['say-me']).toBeTruthy();
    expect(res.npm.gulp).toBeTruthy();
    expect(res.npm['test-module']).toBeFalsy();
  });

  it('should check', function() {
    sayMe.buildCommand = function() {
    };
    spyOn(sayMe, 'buildCommand').and.callThrough();

    var programs = {};
    sayMe.check(programs);

    expect(sayMe.programs).toBeDefined();
    expect(sayMe.programs.npm).not.toBeDefined();
    expect(sayMe.buildCommand).toHaveBeenCalled();
  });

  it('should check npm programs', function() {
    sayMe.buildCommand = function() {
    };
    sayMe.processingNpmModules = function() {
    };
    spyOn(sayMe, 'buildCommand').and.callThrough();
    spyOn(sayMe, 'processingNpmModules').and.callThrough();

    var programs = {
      npm: [
        'npm',
        'say-me',
        'gulp',
        'test-module'
      ]
    };
    sayMe.check(programs);

    expect(sayMe.programs.npm.length).toEqual(4);
    expect(sayMe.buildCommand).toHaveBeenCalled();
    expect(sayMe.processingNpmModules).toHaveBeenCalled();
  });
});
