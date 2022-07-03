import type { APIRequestQuery } from './APIRequestQuery.js'
export interface APIRequest_I {
	method:string
	url:string
	data?:APIRequestQuery
	body?:string|FormData
	headers?:any
}
