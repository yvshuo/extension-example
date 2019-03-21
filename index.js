#!/usr/bin/env node
const fs = require('fs');
const hookBus = require('./hooks');

function onCreate() {
  console.log('onCreate');
  hookBus.invoke('onCreate', { a: 1, b: 2 });
}

async function onStart() {
  console.log('onStart');
  await hookBus.invokePromise('onStart', { a: 3, b: 4 });
}

function hook(name, fn) {
  hookBus.add(name, fn);
}

function loadPlugin() {
  fs.readdirSync(__dirname)
    .filter(item => /^plugin/.test(item))
    .forEach(file =>
      require(require.resolve(`${__dirname}/${file}`)).apply(hook)
    );
}

function main() {
  loadPlugin();
  onCreate();
  onStart();
}

main();
