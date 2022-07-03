#!/bin/sh

while getopts 'a:i:' c; do
  case $c in
  a) AWS_AZ=$OPTARG ;;
  i) INSTANCE_ID=$OPTARG ;;
  esac
done
SSH_KEY_PATH=$(mktemp)
ssh-keygen -q -t rsa -N '' -f "$SSH_KEY_PATH" <<<y 2>&1 >/dev/null
PUBLIC_KEY=$(ssh-keygen -y -f "$SSH_KEY_PATH")
aws ec2-instance-connect send-ssh-public-key \
  --instance-id "$INSTANCE_ID" \
  --availability-zone "$AWS_AZ" \
  --instance-os-user ec2-user \
  --ssh-public-key "$PUBLIC_KEY" >/dev/null
STATUS="$(echo $?)"
if [ $STATUS -ne 0 ]; then exit $STATUS; fi
echo "$SSH_KEY_PATH"
