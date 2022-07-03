#!/usr/bin/env sh
SSH_KEY_PATH="$(ssh-key--bastion--dev.sh)"
STATUS=$(echo $?)
if [ $STATUS -ne 0 ]; then exit $STATUS; fi
ssh -o "IdentitiesOnly=yes" -i "$SSH_KEY_PATH" ec2-user@$DEV_BASTION_INSTANCE_URL $@
#ssh -i "$SSH_KEY_PATH" "$DEV_BASTION_INSTANCE_URL" mv .bashrc .bashrc.old
