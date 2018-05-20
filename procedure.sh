#!/bin/sh
cd repo
npm install
cd ..
OUTPUT="$(node run-tests.js)"
if [[ $OUTPUT != *"0 passing"* ]]; then
    cd repo
    rm -rf node_modules/
else 
    echo "This snippet is not correct"
    exit 1
fi