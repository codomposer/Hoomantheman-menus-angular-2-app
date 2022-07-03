#!/usr/bin/env sh
if [ -z "$DEPLOY_INSTANCE_URL" ]; then
  echo DEPLOY_INSTANCE_URL environment variable must be defined 1>&2
  exit 1
fi
SSH_KEY_PATH="$(ssh-key--deploy.sh)"
STATUS=$(echo $?)
if [ $STATUS -ne 0 ]; then exit $STATUS; fi
ssh -o "IdentitiesOnly=yes" -i "$SSH_KEY_PATH" ec2-user@$DEPLOY_INSTANCE_URL $@
#ssh -i "$SSH_KEY_PATH" "$DEPLOY_INSTANCE_URL" mv .bashrc .bashrc.old
