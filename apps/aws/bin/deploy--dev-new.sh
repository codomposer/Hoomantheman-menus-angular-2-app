#!/bin/bash
if command -v direnv &> /dev/null; then
  eval "$(direnv export bash)"
  direnv allow
fi
LOG=$(mktemp)
echo Writing to...
echo $LOG
bin/build-app.mjs >$LOG && deploy--stack--dev-new.sh >>$LOG
echo $LOG
