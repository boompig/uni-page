#!/bin/bash

SCRIPT_NAME=`basename $0`

if [ ! -f "package.json" ]
then
    cd ..
fi

dest="templates/markdown_html"

if [ ! -d "$dest" ]
then
    mkdir -p "$dest"
fi

for src_file in markdown/*
do
    new_name=`basename "$src_file" | sed s/.md/.html/`
    dest_file="templates/markdown_html/$new_name"
    if [ ! -f "$dest_file" ] || [ "$src_file" -nt "$dest_file" ]
    then
        echo "[$SCRIPT_NAME] Converting $src_file -> $dest_file"
        marked "$src_file" -o "$dest_file"
    else
        echo "[$SCRIPT_NAME] Skipping unmodified file $src_file"
    fi
done
