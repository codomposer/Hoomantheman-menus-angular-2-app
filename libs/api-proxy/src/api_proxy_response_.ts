import { redis_b } from '@menus/redis'
import { server_ctx } from '@menus/server'
import { api_proxy_redis_key_ } from './api_proxy_redis_key_.js'
export async function api_proxy_response_(
	in_url_str:string, timeout_minutes = 60 * 15
):Promise<api_proxy_response__ret_T> {
	const url = new URL(in_url_str)
	const { host } = url
	if (host !== 'live.api.menu.com' && host !== 'dev.api.menu.com') {
		return {
			statusCode: 422,
			text: 'Invalid host'
		}
	}
	url.searchParams.sort()
	const url_str = url.toString()
	const redis_key = api_proxy_redis_key_(url_str)
	const redis = redis_b(server_ctx)
	const cached_text = await redis.get(redis_key)
	if (cached_text) {
		return {
			statusCode: 200,
			text: cached_text,
		}
	}
	const fetch_res = await fetch(url_str)
	const text = await fetch_res.text()
	await redis.set(redis_key, text, 'EX', timeout_minutes)
	return {
		statusCode: fetch_res.status,
		text,
	}
}
export interface api_proxy_response__ret_T {
	statusCode:number
	text:string
}
