#!/bin/bash
function main() {
	cmd direnv allow .
	cmd eval '"$(direnv export bash)"'
	cmd echo DEBUG && ls -al ./node_modules/@menus/version-build/
	cmd echo DEBUG && ls -al ./node_modules/@menus/version-build/dist
	DIR=$(dirname $0)
	cmd ls -al ./node_modules/.bin
	cmd NODE_ENV=production $DIR/build_APP_VERSION.mjs && NODE_ENV=production sapper build
}
function cmd() {
	echo $@
	eval $@
}
main
