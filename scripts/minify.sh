#!/bin/bash

SCRIPT_NAME=`basename $0`

if [ ! -d "node_modules" ]
then
    cd ..
fi

if [ ! -d "dist/css" ]
then
    mkdir -p "dist/css"
fi

# Compact JS and CSS files so they are nice and mangled for better speed
for src_file in src/css/*.css
do
    base_filename=$(basename $src_file)
    dest_file="dist/css/$base_filename"
    if [ -f "$dest_file" ] && [ "$src_file" -nt "$dest_file" ]
    then
        echo "[$SCRIPT_NAME] Minifying $src_file"
        node_modules/clean-css/bin/cleancss "$src_file" --output dist/css/"$base_filename"
    else
        echo "[$SCRIPT_NAME] Skipping unmodified $src_file"
    fi
done
