import { resolve } from '@menus/import-meta-resolve'
import { pathname_ } from './pathname_.js'
export async function resolve_pathname_(locator:string, parent = import.meta.url):Promise<string> {
	return pathname_((await resolve(locator, parent)).toString())
}
