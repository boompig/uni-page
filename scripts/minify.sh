#!/bin/bash

if [ ! -d "node_modules" ]
then
    cd ..
fi

if [ ! -d "dist/css" ]
then
    mkdir -p "dist/css"
fi

# Compact JS and CSS files so they are nice and mangled for better speed
for file in src/css/*.css
do
    base_filename=$(basename $file)
    node_modules/clean-css/bin/cleancss "$file" --output dist/css/"$base_filename"
done
