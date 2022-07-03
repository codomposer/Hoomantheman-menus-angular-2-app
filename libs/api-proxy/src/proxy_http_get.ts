import type { Request, Response } from 'express'
import { api_proxy_response_ } from './api_proxy_response_.js'
export async function proxy_http_get(req:Request, res:Response) {
	const { statusCode, text } = await api_proxy_response_(req.query.url as string)
	res.statusCode = statusCode
	res.end(text)
}
