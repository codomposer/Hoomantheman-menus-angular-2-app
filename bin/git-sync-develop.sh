#!/bin/sh
git fetch
git rebase origin/develop develop
git rebase develop sapper
git-tag-APP_VERSION
git push
git push --tags
