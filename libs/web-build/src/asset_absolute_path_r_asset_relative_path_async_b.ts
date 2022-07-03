import { join } from 'path'
import { B, be_ } from '@ctx-core/object'
import type { web_build_Ctx } from './web_build_Ctx.js'
import { asset_path_a_async_b } from './asset_path_a_async_b.js'
const key = 'asset_absolute_path_r_asset_relative_path_async'
export const asset_absolute_path_r_asset_relative_path_async_b:B<web_build_Ctx, typeof key> = be_(key, async (ctx)=>{
	const asset_path_a = await asset_path_a_async_b(ctx)
	const asset_path_r_client_asset_path:Record<string, string> = {}
	for (const asset_path of asset_path_a) {
		asset_path_r_client_asset_path[join('/', asset_path)] = asset_path
	}
	return asset_path_r_client_asset_path
})
export type asset_absolute_path_r_asset_relative_path_async_T = Promise<Record<string, string>>
