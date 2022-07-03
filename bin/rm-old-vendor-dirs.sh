#!/bin/sh
GREP_MATCHES=$(cat .gitmodules | grep 'path = ' | awk '{print $3}' | awk '{print "-e "$1}')
find vendor -mindepth 1 -maxdepth 1 | \
	grep -v $GREP_MATCHES | \
	xargs rm -rf
(cd .git/modules && find vendor -mindepth 1 -maxdepth 1 | \
	grep -v $GREP_MATCHES | \
	xargs rm -rf
)
