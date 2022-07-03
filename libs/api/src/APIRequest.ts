import type { APIRequestQuery } from './APIRequestQuery.js'
import type { APIRequest_I } from './APIRequest_I.js'
export class APIRequest implements APIRequest_I {
	public url:string
	public data:APIRequestQuery
	public body:string|FormData
	public headers?:any
	public method:string
}
