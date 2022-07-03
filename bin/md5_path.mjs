#!/usr/bin/env node
import { version_, version_path_ } from '@menus/web-build'
for (const path of process.argv.slice(2)) {
	console.info(await version_path_(path, await version_(path)))
}
