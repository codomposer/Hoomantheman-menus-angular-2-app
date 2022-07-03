import { globby } from 'globby'
import { resolve } from 'path'
import { deploy_pay_static_dir } from './deploy_pay_static_dir.js'
export async function pay_Keys_():Promise<string[]> {
	return (
		await globby([
			resolve(`${deploy_pay_static_dir}/*`),
			resolve(`${deploy_pay_static_dir}/.well-known/*`)
		], {
			cwd: deploy_pay_static_dir,
			expandDirectories: true,
		})
	).map(path=>path.replace(deploy_pay_static_dir, '').replace(/^\//, ''))
}
