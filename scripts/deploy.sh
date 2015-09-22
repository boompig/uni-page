#!/bin/bash

if [ ! -d "node_modules" ]
then
    cd ..
fi

# Master script to deploy the site
npm install
bower install
sh scripts/compile-sass.sh
sh scripts/minify.sh
