import { exec } from 'child-process-promise'
import { join } from 'path'
import { copyFile, writeFile } from 'fs/promises'
export function APP_VERSION_rollup_plugin_(out_dir:string):{ buildEnd():Promise<void> } {
	return {
		async buildEnd() {
			await exec(`mkdir -p ${out_dir}`)
			if (process.env.APP_VERSION) {
				await writeFile(join(out_dir, 'APP_VERSION'), process.env.APP_VERSION)
			} else {
				await copyFile('./static/APP_VERSION', join(out_dir, 'APP_VERSION'))
			}
		}
	}
}
