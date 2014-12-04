say-me
======
This npm module say you what programs or npm modules installed on current machine.

Npm module [say-me](https://github.com/AlekseyLeshko/say-me) used npm module [say-me](https://github.com/AlekseyLeshko/say-me) and it is cool!

[![Build Status:master](https://travis-ci.org/AlekseyLeshko/say-me.svg?branch=master)](https://travis-ci.org/AlekseyLeshko/say-me)
[![Build Status:develop](https://travis-ci.org/AlekseyLeshko/say-me.svg?branch=develop)](https://travis-ci.org/AlekseyLeshko/say-me)
[![Dependency Status](https://david-dm.org/AlekseyLeshko/say-me.svg?theme=shields.io)](https://david-dm.org/AlekseyLeshko/say-me)
[![devDependency Status](https://david-dm.org/AlekseyLeshko/say-me/dev-status.svg?theme=shields.io)](https://david-dm.org/AlekseyLeshko/say-me#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/AlekseyLeshko/say-me/badges/gpa.svg)](https://codeclimate.com/github/AlekseyLeshko/say-me)
[![Test Coverage](https://codeclimate.com/github/AlekseyLeshko/say-me/badges/coverage.svg)](https://codeclimate.com/github/AlekseyLeshko/say-me)
[![npm version](https://badge.fury.io/js/say-me.svg)](http://badge.fury.io/js/say-me)
[![GitHub version](https://badge.fury.io/gh/AlekseyLeshko%2Fsay-me.svg)](http://badge.fury.io/gh/AlekseyLeshko%2Fsay-me)

[![NPM](https://nodei.co/npm/say-me.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/say-me/)

#### Install
##### Install as local module
```
npm i say-me
npm i --save say-me
npm i -D say-me
```

##### Install as global module
```
npm i -g say-me
```

#### Using in JS code
###### Include module and create object
```javascript
var SayMe = require('say-me');
var sayMe = new SayMe();
```
or
```javascript
var sayMe = require('say-me/create');
```

##### Program is installed
```javascript
var programName = 'npm';
var res = sayMe.programIsInstalled(programName);
console.log(res);
console.log(sayMe.programList);
```

>
true
[ { name: 'npm', isInstall: true } ]

##### Programs is installed
```javascript
var programList = [
  'git',
  'npm',
  'say-me',
  'test-module',
  'jasmine',
  'shelljs'
];
var res = sayMe.programsIsInstalled(programList);
console.log(res);
console.log(sayMe.programList);
```

>
false
[ { name: 'git', isInstall: true },
  { name: 'npm', isInstall: true },
  { name: 'say-me', isInstall: true },
  { name: 'test-module', isInstall: false },
  { name: 'jasmine', isInstall: true },
  { name: 'shelljs', isInstall: false } ]

##### Npm module is installed
```javascript
var moduleName = 'shelljs';
var res = sayMe.npmModuleIsInstalled(moduleName);
console.log(res);
console.log(sayMe.programList);
```

>
true
[ { name: 'shelljs', isInstall: true } ]

##### Npm modules is installed
```javascript
var moduleArr = [
  'git',
  'npm',
  'say-me',
  'test-module',
  'jasmine',
  'shelljs'
];
var res = sayMe.npmModulesIsInstalled(moduleArr);
console.log(res);
console.log(sayMe.programList);
```

>
false
[ { name: 'git', isInstall: false },
  { name: 'npm', isInstall: false },
  { name: 'say-me', isInstall: false },
  { name: 'test-module', isInstall: false },
  { name: 'jasmine', isInstall: true },
  { name: 'shelljs', isInstall: true } ]

##### Npm module is installed with global flag
```javascript
sayMe.isGlobal = true;
moduleArr = [
  'npm',
  'jasmine'
];
var res = sayMe.npmModulesIsInstalled(moduleArr);
console.log(res);
console.log(sayMe.programList);
```

>
true
[ { name: 'npm', isInstall: true },
  { name: 'jasmine', isInstall: true } ]

##### Returns all installed npm modules
```javascript
res = sayMe.getAllNpmModules();
console.log(res);
```

>
[ { version: '0.6.1', from: 'optimist@>=0.6.1 <0.7.0', resolved: 'https://registry.npmjs.org/optimist/-/optimist-0.6.1.tgz', name: 'optimist' }, ...]

#### Using in console
Need install say-me module as global module
```
say-me
say-me --pii -p git
say-me --psii git node npm
say-me --npmmii -p say-me
say-me --npmmsii say-me jasmine
say-me --npmmsii -g say-me jasmine
```

#### [Examples](https://github.com/AlekseyLeshko/say-me/tree/master/example)

#### Start
```
git clone git@github.com:AlekseyLeshko/say-me.git
cd say-me
make
```
