(function() {
  'use strict';

  function main() {
  };

  function wrapper() {
    var pckName = 'say-me';
    console.log('Module \'' + pckName + '\' started');
    main();
    console.log('Module \'' + pckName + '\' finished');
  };

  wrapper();
})();
