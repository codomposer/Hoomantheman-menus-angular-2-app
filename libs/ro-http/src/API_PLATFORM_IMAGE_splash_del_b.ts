import { B, be_ } from '@ctx-core/object'
import type { API_PLATFORM_IMAGE_splash_del_payload_T } from './types.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
import { API_PLATFORM_IMAGE_b } from './API_PLATFORM_IMAGE_b.js'
const key = 'API_PLATFORM_IMAGE_splash_del'
export const API_PLATFORM_IMAGE_splash_del_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const API_PLATFORM_IMAGE = API_PLATFORM_IMAGE_b(ctx)
	return API_PLATFORM_IMAGE_splash_del as API_PLATFORM_IMAGE_splash_del_T
	async function API_PLATFORM_IMAGE_splash_del(requestData:Partial<RoRequestQuery_I>) {
		requestData.qt = 'splash'
		requestData.act = 'del'
		return await API_PLATFORM_IMAGE(
			requestData, null
		) as API_PLATFORM_IMAGE_splash_del_payload_T
	}
})
export type API_PLATFORM_IMAGE_splash_del_T = (requestData:Partial<RoRequestQuery_I>)=>
	Promise<API_PLATFORM_IMAGE_splash_del_payload_T>
