#!/bin/sh
for dir in $(build-dirs)
do
  echo $dir
  tsc -b $dir $@
done
