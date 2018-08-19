#!/bin/sh
cd snippets/$1
npm install
cd ../..
OUTPUT="$(node run-tests.js $1)"
if [[ $OUTPUT != *"0 passing"* ]]; then
    rm -rf node_modules/
else 
    echo "This snippet is not correct"
    exit 1
fi