#!/bin/sh
while getopts 'i:u:' c; do
  case $c in
  i) IDENTITY=$OPTARG ;;
  u) INSTANCE_URL=$OPTARG ;;
  esac
done
IDENTITY=${IDENTITY:-~/.ssh/id_rsa}
ssh -i "$IDENTITY" ec2-user@$INSTANCE_URL 'sudo mv /etc/motd /etc/motd.old'
scp -i "$IDENTITY" -pr ./instance/home/ec2-user ec2-user@$INSTANCE_URL:..
ssh -i "$IDENTITY" ec2-user@$INSTANCE_URL './bin/setup-instance-1.sh'
ssh -i "$IDENTITY" ec2-user@$INSTANCE_URL './bin/setup-instance-2.sh'
