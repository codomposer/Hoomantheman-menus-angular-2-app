import { join } from 'path'
import sass from 'sass'
import { B, be_ } from '@ctx-core/object'
import type { web_build_Ctx } from './web_build_Ctx.js'
import type { vurl_done_T, vurl_T } from './config_preprocess_.js'
import { asset_absolute_path_r_asset_relative_path_async_b } from './asset_absolute_path_r_asset_relative_path_async_b.js'
const key = 'vurl_async'
export const vurl_async_b:B<web_build_Ctx, typeof key> = be_(key, async (ctx)=>{
	const asset_absolute_path_r_asset_relative_path = await asset_absolute_path_r_asset_relative_path_async_b(ctx)
	return vurl as vurl_T
	function vurl(url_String:sass.types.String, done:vurl_done_T) {
		if (!(url_String instanceof sass.types.String)) {
			throw 'url: Expected a string.'
		}
		const url = url_String.getValue().split('?')[0].split('#')[0]
		const asset_relative_path = asset_absolute_path_r_asset_relative_path[join('/', url)] || url
		const replacement = new sass.types.String(`url("${asset_relative_path}")`)
		done(replacement)
	}
})
export type vurl_async_T = Promise<vurl_T>
