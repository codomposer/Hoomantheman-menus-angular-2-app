#!/usr/bin/env node
import { readFile } from 'fs/promises'
import { resolve } from '@menus/import-meta-resolve'
import { build_APP_VERSION } from '@menus/version-build'
const pkg = JSON.parse((await readFile(
	new URL(await resolve(`../package.json`, import.meta.url)).pathname
)).toString())
await build_APP_VERSION(pkg)
export { build_APP_VERSION }
