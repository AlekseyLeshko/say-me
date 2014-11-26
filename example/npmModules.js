var SayMe = require('../src/say-me');
var sayMe = new SayMe();

var moduleName = 'shelljs';
var moduleArr = [
  'git',
  'npm',
  'say-me',
  'test-module',
  'jasmine',
  'shelljs'
];

var res = sayMe.npmModuleIsInstalled(moduleName);
console.log(res);
console.log(sayMe.programList);

res = sayMe.npmModulesIsInstalled(moduleArr);
console.log(res);
console.log(sayMe.programList);

sayMe.isGlobal = true;
moduleArr = [
  'npm',
  'jasmine'
];
res = sayMe.npmModulesIsInstalled(moduleArr);
console.log(res);
console.log(sayMe.programList);
