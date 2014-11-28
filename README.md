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

##### Returns all installed npm modules
```javascript
res = sayMe.getAllNpmModules();
console.log(res);
```

>
[ { version: '0.6.1',
    from: 'optimist@>=0.6.1 <0.7.0',
    resolved: 'https://registry.npmjs.org/optimist/-/optimist-0.6.1.tgz',
    name: 'optimist' },
  { version: '0.3.0',
    from: 'shelljs@>=0.3.0 <0.4.0',
    resolved: 'https://registry.npmjs.org/shelljs/-/shelljs-0.3.0.tgz',
    name: 'shelljs' },
  { version: '2.1.0',
    from: 'jasmine@>=2.1.0 <3.0.0',
    resolved: 'https://registry.npmjs.org/jasmine/-/jasmine-2.1.0.tgz',
    name: 'jasmine' } ]


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
