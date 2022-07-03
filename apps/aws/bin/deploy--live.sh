#!/bin/bash
if command -v direnv &> /dev/null; then
  eval "$(direnv export bash)"
  direnv allow
fi
LOG=$(mktemp)
bin/build-app.mjs >$LOG && deploy--stack--live.sh >>$LOG
