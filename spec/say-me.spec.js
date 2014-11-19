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
});
