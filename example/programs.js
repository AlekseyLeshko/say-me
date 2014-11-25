var SayMe = require('../src/say-me');
var sayMe = new SayMe();

var programName = 'npm';
var programList = [
  'git',
  'npm',
  'say-me',
  'test-module',
  'jasmine',
  'shelljs'
];

var res = sayMe.programIsInstalled(programName);
console.log(res);
console.log(sayMe.programList);

res = sayMe.programsIsInstalled(programList);
console.log(res);
console.log(sayMe.programList);
