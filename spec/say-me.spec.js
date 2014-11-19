'use strict';
var SayMe = require('../src/say-me');

describe('say-me', function() {
  var sayMe = new SayMe();

  it('should create member when creating', function() {
    var expected = 'npm ls --depth=0 --json';
    expect(sayMe.command).toEqual(expected);
    expect(sayMe.isGlobal).toBeFalsy();
    expect(sayMe.programs).toEqual({});
  });

  it('should build command', function() {
    var expected = 'npm ls --depth=0 --json';

    var command = sayMe.buildCommand();
    expect(command).toEqual(expected);
  });

  it('should build command with global flag', function() {
    var expected = 'npm ls --depth=0 --json -g';
    sayMe.isGlobal = true;

    var command = sayMe.buildCommand();
    expect(command).toEqual(expected);
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

  it('should processingNpmModules', function() {
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

    var res = sayMe.processingNpmModules(arr);
    expect(res.npm.npm).toBeTruthy();
    expect(res.npm['say-me']).toBeTruthy();
    expect(res.npm.gulp).toBeTruthy();
    expect(res.npm['test-module']).toBeFalsy();
  });
});
