import { B, be_ } from '@ctx-core/object'
import { API_FINANCIAL_path } from './paths.js'
import { ro_fetch_b } from './ro_fetch_b.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
import type { API_FINANCIAL_report_payload_T } from './types.js'
const key = 'API_FINANCIAL_report'
export const API_FINANCIAL_report_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const ro_fetch = ro_fetch_b(ctx)
	return API_FINANCIAL_report as API_FINANCIAL_report_T
	async function API_FINANCIAL_report(requestData:RoRequestQuery_I) {
		requestData.qt = 'report'
		return await ro_fetch({
			apiURL: API_FINANCIAL_path,
			requestData,
		}) as Promise<API_FINANCIAL_report_payload_T>
	}
})
export type API_FINANCIAL_report_T = (requestData:RoRequestQuery_I)=>Promise<API_FINANCIAL_report_payload_T>
