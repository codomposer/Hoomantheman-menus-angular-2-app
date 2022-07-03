import fs from 'fs'
import type { versionable_T } from './versionable_T.js'
export async function build_APP_VERSION(pkg:versionable_T) {
	await fs.promises.writeFile(`./static/APP_VERSION`, pkg.version)
}
