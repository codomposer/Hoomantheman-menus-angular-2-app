#!/bin/sh
ROOT_DIR=$(dirname $(dirname "$0"))
function ls_tsconfig() {
	for p in $@; do
		if [[ -e $p ]]; then
			ls $p | xargs dirname
		fi
	done
}
ls_tsconfig $ROOT_DIR/libs/*/tsconfig.json
ls_tsconfig $ROOT_DIR/@ctx-core/*/tsconfig.json
ls_tsconfig $ROOT_DIR/apps/aws/tsconfig.json
ls_tsconfig $ROOT_DIR/apps/web/tsconfig.json
