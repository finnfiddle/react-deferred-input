'use strict';

const _ = require('lodash')
const pug = require('pug');
const fs = require('fs');
const path = require('path');
const npm = require('machinepack-npm');

const config = require('../config.json');

console.log('compiling pug...');

npm.fetchInfo({ packageName: config.packageName }).exec({
  success: function (npmConfig){
    const template = pug.compileFile(
      path.join(__dirname, '../src/index.pug'),
      {
        pretty: true,
        filters: {
          escape: _.escape,
        },
      }
    );

    fs.writeFileSync(
      path.join(__dirname, '../index.html'),
      template(Object.assign({}, npmConfig, config))
    );
    console.log('compiled pug...');
  },
  // An unexpected error occurred.
  error: function (err){
   console.log(err);
  },
  // No package exists on the public NPM registry with the specified name.
  packageNotFound: function (){
   console.log(`${config.packageName} not found`);
  },
  // The package.json string for the specified package could not be parsed as JSON.
  couldNotParse: function (){
    console.log(`${config.packageName} could not parse package.json`);
  },
});
