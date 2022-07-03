#!/bin/bash
function main() {
	if command -v direnv &> /dev/null; then
		eval "$(direnv export bash)"
		direnv allow
	fi
	if [ -z "$CODEBUILD" ]; then
		interactive
	else
		not_interactive
	fi
}
function interactive() {
	echo deploy--dev.sh: interactive
	LOG=$(mktemp)
	echo Writing to...
	echo $LOG
	bin/build-app.mjs >$LOG && deploy--stack--dev.sh >>$LOG
	echo $LOG
}
function not_interactive() {
	echo deploy--dev.sh: not_interactive
	bin/build-app.mjs && deploy--stack--dev.sh
}
main
