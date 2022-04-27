#!/bin/bash

npx tsc

cp package-lock.json .result/

node --experimental-specifier-resolution=node .result/scripts/building/copy-scripts-resources.script.js

cd .result/

npm ci

node --experimental-specifier-resolution=node scripts/building/resolve-mapped-paths.script.js

cd ../
