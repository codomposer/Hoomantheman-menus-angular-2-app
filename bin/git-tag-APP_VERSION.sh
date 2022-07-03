#!/bin/sh
while getopts ':f:h' c; do
  case $c in
  f) FORCE=1 ;;
  h) usage ;;
  esac
done

if [ $FORCE ]; then
	git tag -d $(cat apps/web/static/APP_VERSION) > /dev/null 2>&1
fi
git tag $(cat apps/web/static/APP_VERSION)
