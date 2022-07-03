#!/bin/sh
pnpx changeset version
build_APP_VERSION.mjs
pnpm up -r
git commit -av --amend
git-tag-APP_VERSION
