import { B, be_ } from '@ctx-core/object'
import { API_RESTAURANT_path } from './paths.js'
import { ro_fetch_b } from './ro_fetch_b.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
import type { API_RESTAURANT_image_del_payload_T } from './types.js'
const key = 'API_RESTAURANT_image_del'
export const API_RESTAURANT_image_del_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_RESTAURANT_image_del as API_RESTAURANT_image_del_T
	async function API_RESTAURANT_image_del(requestData:Partial<RoRequestQuery_I>) {
		requestData.qt = 'image'
		requestData.act = 'del'
		return await ro_fetch({
			apiURL: API_RESTAURANT_path,
			requestData,
		}) as Promise<API_RESTAURANT_image_del_payload_T>
	}
})
export type API_RESTAURANT_image_del_T =
	(requestData:Partial<RoRequestQuery_I>)=>Promise<API_RESTAURANT_image_del_payload_T>
