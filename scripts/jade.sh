#!/bin/bash

SCRIPT_NAME=`basename "$0"`

if [ ! -f "bower.json" ]
then
    cd ..
fi

for file in templates/*
do
    if [ -f "$file" ]
    then
        echo "[$SCRIPT_NAME] Attempting to compile $file to HTML..."
        # . refers to us being in top-level directory
        jade "$file" -o .
        echo "[$SCRIPT_NAME] done"
    fi
done
