#!/bin/bash

if [ ! -f "bower.json" ]
then
    cd ..
fi

# Master script to deploy the site

# install dependencies
npm install
bower install

sh scripts/compile-sass.sh
sh scripts/minify.sh
# generate HTML from markdown
sh scripts/markdown.sh
# generage HTML from Jade templates
sh scripts/jade.sh
