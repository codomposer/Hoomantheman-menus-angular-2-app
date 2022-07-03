import { join } from 'path'
import { B, be_ } from '@ctx-core/object'
import { Target } from './Target.js'
import { web_build_Ctx } from './web_build_Ctx.js'
import { client_output_dir$_b } from './client_output_dir$_b.js'
const key = 'file_copy_targets_'
export const file_copy_targets__b:B<web_build_Ctx, typeof key> = be_(key, (ctx)=>{
	const client_output_dir$ = client_output_dir$_b(ctx)
	return file_copy_targets_
	async function file_copy_targets_(node_module_src_a:string[], version_src_basename_a:string[]) {
		return node_module_src_a.map((node_module_src, idx)=>{
			return {
				src: node_module_src,
				dest: join(client_output_dir$.$, version_src_basename_a[idx]),
			} as Target
		}) as Target[]
	}
})
export type file_copy_targets__T = (node_module_src_a:string[], version_src_basename_a:string[])=>Promise<Target[]>
