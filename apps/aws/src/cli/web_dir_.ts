import path from 'path'
import { pnpm_exec_pwd } from './pnpm_exec_pwd.js'
export async function web_dir_():Promise<string> {
	return path.resolve(await pnpm_exec_pwd('@menus/web'))
}
