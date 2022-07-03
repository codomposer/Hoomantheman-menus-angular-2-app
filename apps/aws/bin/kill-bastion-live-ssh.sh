#!/bin/sh
ps aux | grep $LIVE_BASTION_INSTANCE_URL | grep -v grep | awk '{print $2}' | xargs kill
