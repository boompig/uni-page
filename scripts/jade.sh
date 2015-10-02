#!/bin/bash

SCRIPT_NAME=`basename "$0"`

if [ ! -f "bower.json" ]
then
    cd ..
fi

output_dir="$(pwd)"

for src_file in templates/*
do
    if [ -f "$src_file" ]
    then
        base_jade_filename=$(basename $src_file)
        base_filename=`echo $base_jade_filename | sed s/\.jade/.html/`
        dest_file="$output_dir/$base_filename"

        if [ ! -f "$dest_file" ] || [ "$src_file" -nt "$dest_file" ]
        then
            echo "[$SCRIPT_NAME] Compiling $src_file -> $dest_file"
            rm -f "$dest_file"
            jade "$src_file" -o "$output_dir"
        else
            echo "[$SCRIPT_NAME] Skipping unmodified file $src_file"
            echo "[$SCRIPT_NAME] $dest_file exists and is newer"
        fi
    fi
done
