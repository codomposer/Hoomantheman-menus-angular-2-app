#!/bin/sh
for dir in $(sort-packages-exec -- pwd); do
	(
		cd $dir
		if [ -d src ]; then
			find src | grep -v node_modules | grep \\.js$ | awk '{js=$1;dts = gsub(/\.js$/, ".d.ts", $1); print "[ -f "$dts" ] || rm -f "js}' | sh
		fi
	)
done
