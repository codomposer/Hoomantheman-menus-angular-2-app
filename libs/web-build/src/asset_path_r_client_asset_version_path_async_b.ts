import { join } from 'path'
import { B, be_ } from '@ctx-core/object'
import { queue_ } from '@ctx-core/queue'
import { asset_path_a_async_b } from './asset_path_a_async_b.js'
import { version_path_ } from './version_path_.js'
import { version_ } from './version_.js'
import type { web_build_Ctx } from './web_build_Ctx.js'
const key = 'asset_path_r_client_asset_version_path_async'
export const asset_path_r_client_asset_version_path_async_b:B<web_build_Ctx, typeof key> = be_(key, async (ctx)=>{
	const asset_path_a = await asset_path_a_async_b(ctx)
	const queue = queue_(10)
	const client_asset_version_path_a = await Promise.all(
		asset_path_a.map(asset_path=>queue.add(async ()=>{
			const version_path =
				version_path_(
					asset_path,
					await version_(join('./static', asset_path))
				)
			return join('/', 'client', version_path)
		}))
	)
	const asset_path_r_client_asset_version_path:Record<string, string> = {}
	for (let i = 0; i < asset_path_a.length; ++i) {
		const asset_path = asset_path_a[i]
		asset_path_r_client_asset_version_path[join('/', asset_path)] = client_asset_version_path_a[i]
	}
	return asset_path_r_client_asset_version_path
})
export type asset_path_r_client_asset_version_path_async_T = Promise<Record<string, string>>
