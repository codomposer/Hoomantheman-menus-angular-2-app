#!/bin/sh
if [ -z "$DEPLOY_INSTANCE_URL" ]; then
  echo DEPLOY_INSTANCE_URL environment variable must be defined 1>&2
  exit 1
fi
setup-instance.sh -i "$(ssh-key--deploy.sh)" -u $DEPLOY_INSTANCE_URL
