#!/bin/bash

SCRIPT_NAME=`basename $0`

if [ ! -f "package.json" ]
then
    cd ..
fi

for file in markdown/*
do
    echo "[$SCRIPT_NAME] Converting $file to html..."
    new_name=`basename "$file" | sed s/.md/.html/`
    marked "$file" -o "templates/markdown_html/$new_name"
    echo "[$SCRIPT_NAME] done"
done
