import type { GetSession, Handle } from '@sveltejs/kit'
import { neql_ } from '@ctx-core/function'
import { assign } from '@ctx-core/object'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { uuid_ } from '@ctx-core/uuid'
import { webConfig_ } from '@menus/web-config'
import { host_ } from '@menus/server'
import { request_id_map_ctx, ui_ctx_ } from '@menus/ui'
import { gps$_b, platform_settings$_b } from '@menus/http'
export const handle:Handle = async ({ request, resolve })=>{
	const host = host_(request)
	const path = request.path
	const webConfig = webConfig_(host)
	const ctx = ui_ctx_(
		{ host, path, params: {}, query: {} },
		{ webConfig }
	)
	const gps$ = gps$_b(ctx)
	const gps = await gps$.load_promise
	const platform_settings$ = platform_settings$_b(ctx)
	const platform_settings = await subscribe_wait_timeout(
		platform_settings$, neql_(undefined), 10_000
	)
	const PublicKey = platform_settings?.PublicKey
	console.info('server.js|headers', path)
	if (
		!PublicKey
		&& host !== 'menu.com'
		&& host !== 'dev.menu.com'
		&& host !== 'my.dev.menu.com'
	) {
		const redirect_url =
			/\.dev\.menu\.com$/.test(host)
			? 'https://dev.menu.com'
			: 'https://menu.com'
		return {
			status: 302,
			headers: {
				Location: redirect_url,
			}
		}
	}
	const request_id = uuid_().toString()
	request_id_map_ctx.set(request_id, ctx)
	try {
		const response = await resolve(request)
		assign(request.locals, {
			request_id, gps, webConfig
		})
		return {
			...response,
			headers: {
				...response.headers,
			}
		}
	} finally {
		request_id_map_ctx.delete(request_id)
	}
}
export const getSession:GetSession = (request)=>{
	return {
		webConfig: request.locals.webConfig,
		gps: request.locals.gps,
	}
}
