import { globby } from 'globby'
import { resolve } from 'path'
import { static_dir } from './static_dir.js'
export async function client_app_Keys_():Promise<string[]> {
	return (
		await globby(resolve(`${static_dir}/client`), {
			cwd: static_dir,
			expandDirectories: true,
		}))
		.map(
			path=>path.replace(static_dir, '').replace(/^\//, '')
		)
		.filter(
			Key=>Key !== 'client/APP_VERSION'
		)
}
