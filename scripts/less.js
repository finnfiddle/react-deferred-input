'use strict';

const fs = require('fs');
const path = require('path');
const less = require('less');

console.log('compiling less...');

less.render(fs.readFileSync(path.join(__dirname, '../src/index.less')).toString())
  .then(output => {
    fs.writeFileSync(path.join(__dirname, '../dist/css/custom.css'), output.css);
    console.log('compiled less...');
  }, error => console.log(error));
