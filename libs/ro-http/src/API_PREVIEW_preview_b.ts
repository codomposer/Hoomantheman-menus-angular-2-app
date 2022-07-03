import { _b, B } from '@ctx-core/object'
import { API_PREVIEW_path } from './paths.js'
import { ro_fetch_b } from './ro_fetch_b.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import type { RoRequestQuery } from './RoRequestQuery.js'
import type { API_PREVIEW_preview_payload_T } from './types.js'
const key = 'API_PREVIEW_preview'
export const API_PREVIEW_preview_b:B<ro_http_Ctx, typeof key> = _b(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_PREVIEW_preview as API_PREVIEW_preview_T
	async function API_PREVIEW_preview(requestData:RoRequestQuery) {
		requestData.qt = 'preview'
		return await ro_fetch({
			apiURL: API_PREVIEW_path,
			requestData,
		}) as Promise<API_PREVIEW_preview_payload_T>
	}
})
export type API_PREVIEW_preview_T = (requestData:RoRequestQuery)=>Promise<API_PREVIEW_preview_payload_T>
