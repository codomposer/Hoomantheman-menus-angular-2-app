#!/usr/bin/env sh
AWS_DIR="$(cd $(dirname $(dirname $0)) && pwd)"
AWS_APP_DIR="$AWS_DIR/app"
find -L $AWS_APP_DIR |
  awk '{print "if [ -L "$1" ]; then echo "$1"; fi"}' |
  sh
