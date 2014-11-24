var SayMe = require('../src/say-me');
var sayMe = new SayMe();

var moduleName = 'npm';
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
var arr = sayMe.npmModulesIsInstalled(moduleArr);
console.log(arr);

sayMe.isGlobal = true;
arr = sayMe.npmModulesIsInstalled(moduleArr);
console.log(arr);
