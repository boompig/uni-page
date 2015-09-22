#!/bin/bash

if [ ! -d "node_modules" ]
then
    cd ..
fi

# compile scss files to css files
node_modules/node-sass/bin/node-sass src/sass --output src/css
