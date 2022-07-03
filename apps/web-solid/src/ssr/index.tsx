import sirv from 'sirv'
import polka, { Request } from 'polka'
import compression from 'compression'
import serverless from 'serverless-http'
import { renderToString } from 'solid-js/web'
import mime from 'mime/lite'
import { neql_ } from '@ctx-core/function'
import { assign } from '@ctx-core/object'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { uuid_ } from '@ctx-core/uuid'
import { host_ } from '@menus/server'
import { WebConfig, webConfig_ } from '@menus/web-config'
import { gps$_b, platform_settings$_b } from '@menus/http'
import { ui_ctx_, request_id_map_ctx } from '@menus/ui'
import { Gps } from '@menus/platform-settings-lib'
import 'newrelic'
import { App } from '../app'
const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'
mime.define({
	'image/x-icon': ['ico'],
})
const server = polka()
server
	.use(
		compression({ threshold: 0 }),
		sirv('dist/dom', { dev }),
		sirv('static', { dev }),
	)
	.use(async (req:MenuRequest, res, next)=>{
		try {
			const host = host_(req) as string
			const path = req.path
			const webConfig = webConfig_(host)
			const ctx = ui_ctx_(
				{ host, path, params: {}, query: {} },
				{ webConfig }
			)
			assign(ctx, { req, res })
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
				res.writeHead(302, {
					'Location': redirect_url
				})
				res.end()
				return
			}
			const request_id = uuid_().toString()
			request_id_map_ctx.set(request_id, ctx)
			req.request_id = request_id
			req.gps = gps
			req.webConfig = webConfig
		} catch (err) {
			console.error(err)
			console.trace(err)
			throw err
		}
		next()
	})
	.use(async (req, res)=>{
		const html = renderToString(()=><App url={req.url}/>)
		res.end(html)
		// sapper.middleware({
		//   async session(req, res) {
		//     const { gps, request_id, webConfig } = req
		//     return { gps, request_id, webConfig }
		//   }
		// }),
	})
	.use(set_content_type)
	.use((req:MenuRequest, _res)=>{
		request_id_map_ctx.delete(req.request_id)
	})
	.listen(PORT, ()=>{
	})
const serverless_handler = serverless(server as any, {
	binary(_headers) {
		return true
	},
})
module.exports.handler = async (event, ctx)=>{
	try {
		const data = await serverless_handler(event, ctx)
		const { statusCode, headers, isBase64Encoded } = data
		console.info('lambda.handler', { statusCode, headers, isBase64Encoded })
		return data
	} catch (err) {
		console.error(err)
		console.trace(err)
		return {
			statusCode: 302,
			headers: {
				Location: '/500'
			},
			isBase64Encoded: true,
		}
	}
}
process.on('uncaughtException', (ex)=>{
	console.error('uncaughtException', ex)
})
function set_content_type(req, res) {
	const { uri } = req
	if (!res.getHeader('content-type')) {
		res.setHeader('Content-Type', mime.getType(uri))
	}
}
export interface MenuRequest extends Request {
	request_id?:string
	gps?:Gps
	webConfig?:WebConfig
}
