say-me
======
This npm module say you what programs or npm modules installed on current machine.

Npm module [say-me](https://github.com/AlekseyLeshko/say-me) used npm module [say-me](https://github.com/AlekseyLeshko/say-me) and it is cool!

[![NPM](https://nodei.co/npm/say-me.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/say-me/)

#### Install
```
// local
npm i say-me
// global
npm i -g say-me
```

#### Using in JS code
###### Include module and create object
```javascript
var SayMe = require('say-me');
var sayMe = new SayMe();
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

#### Using in console
Need install say-me module as global module
<script src="https://gist.github.com/AlekseyLeshko/a79addafd0de10e55ee0.js"></script>

#### [Examples](https://github.com/AlekseyLeshko/say-me/tree/master/example)

#### Start
```
git clone git@github.com:AlekseyLeshko/say-me.git
cd say-me
make
```
