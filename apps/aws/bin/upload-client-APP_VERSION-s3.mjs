#!/usr/bin/env node
import { dirname } from 'path'
import { param_r_ } from '@ctx-core/cli-args'
import { client_dir_, id_, upload_s3 } from '../dist/index.js'
const args = process.argv.slice(2)
process.chdir(dirname(new URL(import.meta.url).pathname))
/**
 * @typedef param_r_T
 * @property {import('../src/index.ts').stage_T} stage
 */
/**
 * @type {param_r_T}
 */
const { stage } = param_r_(args, {
	stage: '-s, --stage',
}, {
	stage: '',
})
await upload_s3({
	Keys: ['client/APP_VERSION'],
	Name: id_(stage),
	dir: await client_dir_()
})
