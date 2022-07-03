#!/bin/bash
function main() {
	cmd apt-get update
	cmd apt-get install -y direnv
	cmd ls -al
	cmd git submodule init
	cmd git submodule update
	cmd npm i pnpm -g
	cmd cp .env.sample .env
	test_direnv_config
	cmd 'cat apps/aws/.env.sample | grep -v AWS_ACCESS_KEY_ID | grep -v AWS_SECRET_ACCESS_KEY > apps/aws/.env'
	cmd cd apps/aws
	test_direnv_config
}
function load_direnv() {
	cmd direnv allow .
	cmd eval '"$(direnv export bash)"'
}
function test_direnv_config() {
	load_direnv || exit 1
}
function cmd() {
	echo $@
	eval $@
}
main
