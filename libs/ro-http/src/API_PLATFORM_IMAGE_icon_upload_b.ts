import { B, be_ } from '@ctx-core/object'
import type { API_PLATFORM_IMAGE_icon_upload_payload_T } from './types.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
import { API_PLATFORM_IMAGE_b } from './API_PLATFORM_IMAGE_b.js'
const key = 'API_PLATFORM_IMAGE_icon_upload'
export const API_PLATFORM_IMAGE_icon_upload_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const API_PLATFORM_IMAGE = API_PLATFORM_IMAGE_b(ctx)
	return API_PLATFORM_IMAGE_icon_upload as API_PLATFORM_IMAGE_icon_upload_T
	async function API_PLATFORM_IMAGE_icon_upload(requestData:Partial<RoRequestQuery_I>, formData:FormData) {
		requestData.qt = 'icon'
		requestData.act = 'upload'
		return await API_PLATFORM_IMAGE(requestData, formData) as API_PLATFORM_IMAGE_icon_upload_payload_T
	}
})
export type API_PLATFORM_IMAGE_icon_upload_T = (requestData:Partial<RoRequestQuery_I>, formData:FormData)=>
	Promise<API_PLATFORM_IMAGE_icon_upload_payload_T>
