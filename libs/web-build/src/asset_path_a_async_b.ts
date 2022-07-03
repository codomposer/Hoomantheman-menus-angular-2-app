import { spawn } from 'child_process'
import { join } from 'path'
import { createInterface } from 'readline'
import { B, be_ } from '@ctx-core/object'
import type { web_build_Ctx } from './web_build_Ctx.js'
const key = 'asset_path_a_async'
export const asset_path_a_async_b:B<web_build_Ctx, typeof key> = be_(key, async ()=>{
	const res = spawn(
		'find', ['assets/', '-type', 'f'],
		{ cwd: join(process.cwd(), 'static') }
	)
	const rl = createInterface(res.stdout)
	const asset_path_a = []
	for await (const line of rl) {
		asset_path_a.push(line.trim())
	}
	return asset_path_a
})
export type asset_path_a_async_T = Promise<string[]>
