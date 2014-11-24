say-me
======
This npm module say you what programs or npm modules installed on current machine.

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
var answer = sayMe.programIsInstalled(programName);
console.log(answer);
```

> { name: 'npm', isInstall: true }

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
var answerList = sayMe.programsIsInstalled(programList);
console.log(answerList);
```

>
[ { name: 'git', isInstall: true },
  { name: 'npm', isInstall: true },
  { name: 'say-me', isInstall: true },
  { name: 'test-module', isInstall: false },
  { name: 'jasmine', isInstall: true },
  { name: 'shelljs', isInstall: false } ]

##### Npm module is installed
```javascript
var moduleName = 'npm';
var answer = sayMe.npmModuleIsInstalled(moduleName);
console.log(answer);
```

> { name: 'npm', isInstall: false }

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
var answerList = sayMe.npmModulesIsInstalled(moduleArr);
console.log(answerList);
```

>
[ { name: 'git', isInstall: false },
  { name: 'npm', isInstall: false },
  { name: 'say-me', isInstall: false },
  { name: 'test-module', isInstall: false },
  { name: 'jasmine', isInstall: true },
  { name: 'shelljs', isInstall: true } ]

##### Npm module is installed with global flag
```javascript
sayMe.isGlobal = true;
var moduleArr = [
  'git',
  'npm',
  'say-me',
  'test-module',
  'jasmine',
  'shelljs'
];
var answerList = sayMe.npmModulesIsInstalled(moduleArr);
console.log(answerList);
```

>
[ { name: 'git', isInstall: false },
  { name: 'npm', isInstall: true },
  { name: 'say-me', isInstall: true },
  { name: 'test-module', isInstall: false },
  { name: 'jasmine', isInstall: true },
  { name: 'shelljs', isInstall: false } ]

#### Using in console
Need install say-me module as global module
```
say-me --pii -p git
say-me --psii git node npm
say-me --npmmii -p say-me
say-me --npmmsii say-me jasmine
say-me --npmmsii -g say-me jasmine
```


#### [Examples](https://github.com/AlekseyLeshko/say-me/tree/master/example)
