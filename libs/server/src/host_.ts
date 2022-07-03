import type { Request } from 'polka'
import type { ServerRequest } from '@sveltejs/kit/types/hooks.js'
export function host_(req:Request|ServerRequest):string {
	return (
		process.env.SITE_HOST
		|| req.headers['x-forwarded-host']
		|| req.headers.host
	) as string
}
