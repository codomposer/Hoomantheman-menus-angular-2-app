import { be_ } from '@ctx-core/object'
import type { APIRequestQuery } from '@menus/api'
import { fetch_api_request_b } from '@menus/http'
import type { RoRequestQuery_I } from './RoRequestQuery_I.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
import { ro_request__b } from './ro_request__b.js'
const key = 'ro_fetch'
export function ro_fetch_b<Out extends unknown = unknown>(ctx:ro_http_Ctx<Out>):ro_fetch_T<Out> {
	return be_<ro_http_Ctx<Out>, typeof key>(key, ()=>{
		const ro_request_ = ro_request__b(ctx)
		const fetch_api_request = fetch_api_request_b<Out>(ctx)
		return ro_fetch
		async function ro_fetch(options:SendRequestOptions):Promise<Out> {
			const request = await ro_request_(options)
			return await fetch_api_request(request)
		}
	})(ctx)
}
export type ro_fetch_T<Out extends unknown = unknown> = (options:SendRequestOptions)=>Promise<Out>
export interface SendRequestOptions {
	apiURL:string
	requestData?:Partial<RoRequestQuery_I>
	url_?:(options:SendRequestOptions, data?:APIRequestQuery)=>string
	cache?:boolean
	ignoreLogin?:boolean
	requestMethod?:string
	body?:string|FormData
}
