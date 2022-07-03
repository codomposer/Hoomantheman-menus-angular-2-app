import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import serverless from 'serverless-http'
import * as sapper from '@sapper/server'
import mime from 'mime/lite'
import { neql_ } from '@ctx-core/function'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { uuid_ } from '@ctx-core/uuid'
import { gps$_b, platform_settings$_b } from '@menus/http'
import { host_ } from '@menus/server'
import { ui_ctx_, request_id_map_ctx } from '@menus/ui'
import { backoffice_host_a, webConfig_ } from '@menus/web-config'
//import 'newrelic'
const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'
mime.define({
	'image/x-icon': ['ico'],
})
const server = polka()
server
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev })
	)
	.use(
		sapper.middleware({
			async session(req, res) {
				const host = host_(req)
				const { path } = req
				console.info('server.js|headers', path)
				const webConfig = webConfig_(host)
				req.webConfig = webConfig
				let gps
				if (!~backoffice_host_a.indexOf(host)) {
					const ctx = ui_ctx_(
						{ host, path, params: {}, query: {} },
						{ webConfig }
					)
					const gps$ = gps$_b(ctx)
					gps = await gps$.load_promise
					const platform_settings$ = platform_settings$_b(ctx)
					const platform_settings = await subscribe_wait_timeout(
						platform_settings$, neql_(undefined), 10_000
					)
					const PublicKey = platform_settings?.PublicKey
					if (!PublicKey) {
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
					req.gps = gps
				}
				const request_id = uuid_().toString()
				request_id_map_ctx.set(request_id, { req, res })
				req.request_id = request_id
				return { gps, request_id, webConfig }
			}
		}),
		set_content_type,
	)
	.use((req, res) => {
		request_id_map_ctx.delete(req.request_id)
	})
	.listen(PORT, err => {
		if (err) console.log('error', err)
	})
const serverless_handler = serverless(server, {
	binary(headers) {
		return true
	},
})
export const handler = async (event, ctx) => {
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
process.on('uncaughtException', (ex) => {
	console.error('uncaughtException', ex)
})
function set_content_type(req, res) {
	const { uri } = req
	if (!res.getHeader('content-type')) {
		res.setHeader('Content-Type', mime.getType(uri))
	}
}
