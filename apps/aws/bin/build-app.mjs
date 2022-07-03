#!/usr/bin/env node
import { join, resolve } from 'path'
import { readFile, writeFile } from 'fs/promises'
import { exec } from 'child-process-promise'
import { param_r_ } from '@ctx-core/cli-args'
const { help, skip_build } = param_r_(process.argv.slice(2), {
	help: '-h, --help',
	skip_build: '-s, --skip-build'
})
if (help) {
	console.info(`
Usage: build-app [-s,--skip-build]

Options:

-h, --help        This help message
-s, --skip-build	Skip the build of apps/web
		`.trim()
	)
	process.exit(0)
}
const AWS_DIR = resolve('.')
const WEB_DIR = join(AWS_DIR, '..', 'web')
const AWS_APP_DIR = join(AWS_DIR, 'app')
if (!skip_build) {
	await exec(`cd ${WEB_DIR} && pnpm run build`)
}
await exec(`rm -rf ${AWS_APP_DIR}`)
await exec(`mkdir -p ${AWS_APP_DIR}/__sapper__`)
await exec(`ln -sf ${WEB_DIR}/__sapper__/build ${AWS_APP_DIR}/__sapper__`)
await exec(`mkdir -p ${AWS_APP_DIR}/node_modules`)
await exec(`mkdir -p ${AWS_APP_DIR}/static`)
await exec(`ln -sf ${WEB_DIR}/__sapper__/build/client ${AWS_APP_DIR}/static/client`)
await exec(`mkdir -p ${AWS_APP_DIR}/lambda`)
await exec(`ln -sf ${WEB_DIR}/lambda.js ${AWS_APP_DIR}/lambda.js`)
await exec(`ln -sf ${WEB_DIR}/lambda/index.js ${AWS_APP_DIR}/lambda/index.js`)
await exec(`ln -sf ${WEB_DIR}/lambda/package.json ${AWS_APP_DIR}/lambda/package.json`)
const pkg = JSON.parse((await readFile(`${WEB_DIR}/package.json`)).toString())
delete pkg.devDependencies
await writeFile(`${AWS_APP_DIR}/package.json`, JSON.stringify(pkg, null, '\t'))
await exec(`(cd ${AWS_APP_DIR} && pnpm i)`)
await exec(`fix-app-symlinks.sh`)
