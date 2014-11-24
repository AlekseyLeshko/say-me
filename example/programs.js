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

var answer = sayMe.programIsInstalled(programName);
console.log(answer);
var answerList = sayMe.programsIsInstalled(programList);
console.log(answerList);
