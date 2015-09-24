#!/bin/bash

if [ ! -f "bower.json" ]
then
    cd ..
fi

# Master script to deploy the site
npm install
bower install
sh scripts/compile-sass.sh
sh scripts/minify.sh
