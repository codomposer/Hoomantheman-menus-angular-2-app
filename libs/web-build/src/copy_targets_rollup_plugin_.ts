import { dirname } from 'path'
import { constants } from 'fs'
import { access, copyFile, writeFile } from 'fs/promises'
import { exec } from 'child-process-promise'
import type { Target } from './Target.js'
export function copy_targets_rollup_plugin_(name:string, copy_targets:Target[]):copy_targets_rollup_plugin_T {
	return {
		// See https://lihautan.com/12-line-rollup-plugin/
		name,
		async generateBundle() {
			for (const target of copy_targets) {
				const { src, dest, transform } = target
				await ensure_dir(dirname(dest))
				if (transform) {
					await writeFile(dest, await transform(target))
				} else {
					await copyFile(src, dest)
				}
			}
		}
	}
}
async function ensure_dir(dir:string) {
	try {
		await access(dir, constants.R_OK)
	} catch (e) {
		await exec(`mkdir -p ${dir}`)
	}
}
export type copy_targets_rollup_plugin_T = {
	name:string,
	generateBundle():Promise<void>
}
