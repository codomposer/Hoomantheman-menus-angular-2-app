import { resolve } from '@menus/import-meta-resolve'
export async function client_dir_():Promise<string> {
	return new URL(await resolve('../../app/static', import.meta.url)).pathname
}
