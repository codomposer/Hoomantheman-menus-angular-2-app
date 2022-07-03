import { B, be_ } from '@ctx-core/object'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
import type {
	API_PLATFORM_IMAGE_icon_del_payload_T, API_PLATFORM_IMAGE_icon_upload_payload_T,
	API_PLATFORM_IMAGE_splash_upload_payload_T, API_PLATFORM_IMAGE_splash_del_payload_T
} from './types.js'
import { API_PLATFORM_IMAGE_path } from './paths.js'
import { ro_fetch_b } from './ro_fetch_b.js'
const key = 'API_PLATFORM_IMAGE'
export const API_PLATFORM_IMAGE_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_PLATFORM_IMAGE as API_PLATFORM_IMAGE_T
	async function API_PLATFORM_IMAGE(requestData:Partial<RoRequestQuery_I>, formData:FormData) {
		return await ro_fetch({
			apiURL: API_PLATFORM_IMAGE_path,
			requestData,
			requestMethod: 'POST',
			body: formData,
		}) as Promise<API_PLATFORM_IMAGE_icon_del_payload_T>
	}
})
export type API_PLATFORM_IMAGE_T = (requestData:Partial<RoRequestQuery_I>, formData:FormData)=>
	Promise<//@formatter:off
		API_PLATFORM_IMAGE_icon_upload_payload_T
		| API_PLATFORM_IMAGE_icon_del_payload_T
		| API_PLATFORM_IMAGE_splash_upload_payload_T
		| API_PLATFORM_IMAGE_splash_del_payload_T
	>//@formatter:on
