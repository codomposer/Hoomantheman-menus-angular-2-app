#!/bin/sh
sort-libs-pwd | awk '{print "cd "$1"; pnpm run build"}' | sh
