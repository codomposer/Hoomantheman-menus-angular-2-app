#!/bin/sh
cat ./node_modules/.bin/sapper | sed -E 's/(node\"?)(\s+\")/\1 --max-old-space-size=8192 \2/' > ./node_modules/.bin/sapper-himem
chmod a+x ./node_modules/.bin/sapper-himem
./node_modules/.bin/sapper-himem dev
