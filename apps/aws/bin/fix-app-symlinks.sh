#!/bin/sh
AWS_DIR=$(cd $(dirname $(dirname "$0")) && pwd)
$AWS_DIR/bin/find-symlinks-in-app-dir.sh | (
  while read symlink; do
    symlink_basename="$(basename $symlink)"
    source="$(readlink $symlink)"
    symlink_dir="$(dirname $symlink)"
    ln -sf $source $symlink_dir
  done
)
