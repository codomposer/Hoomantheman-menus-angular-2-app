import type { replace_r_T } from './replace_r_async_b.js'
export function run_replace_r(replace_r:replace_r_T, code:string|Buffer):string|Buffer {
	for (const [key, val] of Object.entries(replace_r)) {
		if (typeof val === 'string') {
			code = code.toString().split(key).join(val)
		}
	}
	return code
}
