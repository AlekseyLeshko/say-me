'use strict';
var SayMe = require('../src/say-me');

describe('say-me', function() {
  var sayMe = new SayMe();

  it('should create member when creating', function() {
    expect(sayMe.command).toEqual('npm ls --depth=0 --json');
  });
});
