#!/bin/sh
sort-vendor-pwd | awk '{print "cd "$1"; pnpm run build"}' | sh
