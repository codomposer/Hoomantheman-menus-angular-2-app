import { assign, B, be_ } from '@ctx-core/object'
import { APIRequest } from '@menus/api'
import { fetch_api_request_b } from '@menus/http'
import { API_FINANCIAL_path } from './paths.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import { ro_request__b } from './ro_request__b.js'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
import type { API_FINANCIAL_statement_payload_T } from './types.js'
const key = 'API_FINANCIAL_statement'
export const API_FINANCIAL_statement_b:B<ro_http_Ctx, typeof key> = be_(key, (ctx)=>{
	const fetch_api_request = fetch_api_request_b(ctx)
	const ro_request_ = ro_request__b(ctx)
	return assign(API_FINANCIAL_statement, {
		API_FINANCIAL_statement_request_
	}) as API_FINANCIAL_statement_T
	async function API_FINANCIAL_statement(requestData:RoRequestQuery_I) {
		return await fetch_api_request(
			await API_FINANCIAL_statement_request_(requestData)
		) as Promise<API_FINANCIAL_statement_payload_T>
	}
	async function API_FINANCIAL_statement_request_(requestData:RoRequestQuery_I) {
		requestData.qt = 'statement'
		return ro_request_({
			apiURL: API_FINANCIAL_path,
			requestData,
		})
	}
})
export interface API_FINANCIAL_statement_T {
	(requestData:RoRequestQuery_I):Promise<API_FINANCIAL_statement_payload_T>
	API_FINANCIAL_statement_request_(requestData:RoRequestQuery_I):Promise<APIRequest>
}
