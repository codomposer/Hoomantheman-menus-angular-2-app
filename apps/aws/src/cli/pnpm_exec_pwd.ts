import { pnpm_exec } from './pnpm_exec.js'
export async function pnpm_exec_pwd(pkg_name:string):Promise<string> {
	return pnpm_exec(pkg_name, ['pwd'])
}
