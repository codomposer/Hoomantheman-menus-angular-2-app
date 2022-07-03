#!/bin/sh
if [ -z "$DEPLOY_INSTANCE_URL" ]; then
  echo DEPLOY_INSTANCE_URL environment variable must be defined 1>&2
  exit 1
fi
ps aux | grep $DEPLOY_INSTANCE_URL | grep -v grep | awk '{print $2}' | xargs kill
