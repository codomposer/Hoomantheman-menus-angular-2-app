import { join } from 'path'
import sass from 'sass'
import { B, be_ } from '@ctx-core/object'
import { asset_path_r_client_asset_version_path_async_b } from './asset_path_r_client_asset_version_path_async_b.js'
import type { web_build_Ctx } from './web_build_Ctx.js'
import type { vurl_done_T, vurl_T } from './config_preprocess_.js'
const key = 'version_vurl_async'
export const version_vurl_async_b:B<web_build_Ctx, typeof key> = be_(key, async (ctx)=>{
	const asset_path_r_client_asset_version_path = await asset_path_r_client_asset_version_path_async_b(ctx)
	return vurl as vurl_T
	function vurl(url_String:sass.types.String, done:vurl_done_T) {
		if (!(url_String instanceof sass.types.String)) {
			throw 'url: Expected a string.'
		}
		const url = url_String.getValue().split('?')[0].split('#')[0]
		const client_url =
			asset_path_r_client_asset_version_path[join('/', url)]
			|| url
		const replacement = new sass.types.String(`url("${client_url}")`)
		done(replacement)
	}
})
export type version_vurl_async_T = Promise<vurl_T>
