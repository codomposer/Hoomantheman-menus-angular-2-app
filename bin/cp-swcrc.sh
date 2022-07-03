#!/bin/sh
sort-packages-exec -- pwd | awk '{print "cp ./.swcrc "$1"/.swcrc"}' | sh
