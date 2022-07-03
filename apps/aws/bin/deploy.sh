#!/bin/bash
if [ $LIVE ]; then
	echo deploy LIVE
	deploy--live.sh
else
	echo deploy DEV
	deploy--dev.sh
fi
