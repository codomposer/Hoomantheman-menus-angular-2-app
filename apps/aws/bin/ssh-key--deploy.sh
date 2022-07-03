if [ -z "$AWS_AZ" ]; then
  echo AWS_AZ environment variable must be defined 1>&2
  exit 1
fi
if [ -z "$DEPLOY_INSTANCE_ID" ]; then
  echo DEPLOY_INSTANCE_ID environment variable must be defined 1>&2
  exit 1
fi
instance-connect-ssh-key.sh -a "$AWS_AZ" -i "$DEPLOY_INSTANCE_ID"
