#!/bin/bash
function main() {
	# @menus/dev
	cmd pwd
	load_direnv
	mkdir -p ./vendor/sapper/dist # fix error in pnpm i
	cmd pnpm i
	# Two passes of pnpm i -r are necessary to first install the `npm run build` dependencies
	# & then to install built `./node_module/.bin` files
	cmd pnpm i -r --frozen-lockfile=false
	cmd echo DEBUG && ls -al ./node_modules/.bin
	cmd build-vendor
	cmd build-libs
	cmd pnpm i -r --frozen-lockfile=false # Install built node_module/.bin/* files from vendor & libs
	# @menus/web
	cmd pushd ./apps/web/
	load_direnv
	cmd popd
	# @menus/aws
	cmd pushd ./apps/aws/
	load_direnv
	cmd pnpm run build
	cmd ls -la
	cmd echo $PATH
	cmd deploy.sh
	cmd popd
}
function load_direnv() {
	cmd direnv allow .
	cmd eval '"$(direnv export bash)"'
}
function cmd() {
	echo $@
	eval $@
}
main
