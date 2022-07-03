import fs from 'fs'
import md5_file from 'md5-file'
let disabled = false
export async function version_(file_path:string):Promise<string|null> {
	if (disabled) return null
	const stat = await fs.promises.stat(file_path)
	if (!stat.isFile()) return
	return (await md5_file(file_path)).slice(0, 7)
}
export function disable_version() {
	disabled = true
}
