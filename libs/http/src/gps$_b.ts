import { B, be_, assign } from '@ctx-core/object'
import { sleep } from '@ctx-core/sleep'
import { Writable$, writable$ } from '@ctx-core/store'
import type { Gps } from '@menus/platform-settings-lib'
import { STATUS_ERROR } from '@menus/web-config'
import { api_fetch_b } from './api_fetch_b.js'
import type { http_Ctx } from './http_Ctx.js'
import { init_gps$_b } from './init_gps$_b'
const key = 'gps$'
export const gps$_b:B<http_Ctx, typeof key> = be_(key, ctx=>{
	const api_fetch = api_fetch_b(ctx)
	const init_gps$ = init_gps$_b(ctx)
	let reload_called = false
	const gps$ = writable$<gps_T>(ctx.gps)
	const load_promise = load()
	return assign(gps$, {
		load_promise,
		load,
		reload,
	}) as gps$_T
	async function load() {
		if (!gps$.$ && init_gps$.$) {
			gps$.$ = init_gps$.$
		}
		const gps = gps$.$
		if (reload_called || gps) return gps
		return await reload()
	}
	async function reload() {
		reload_called = true
		const { gps_url } = ctx
		let gps_response:Response
		while (!gps_response) {
			try {
				gps_response = await api_fetch({ method: 'GET', url: gps_url })
			} catch (err) {
				console.error('gps$_b#reload|catch', err)
				console.trace('gps$_b#reload|catch', err)
				if (err.code === 'ECONNRESET') {
					console.warn('retrying gps reload...')
					await sleep(100)
					continue
				}
				const gps = {
					Status: STATUS_ERROR,
					Data: {},
					err,
				} as Gps
				gps$.set(gps)
				// gps$.$ = gps
				return gps
			}
		}
		const gps = await gps_response.json()
		gps$.set(gps)
		// gps$.$ = gps
		return gps
	}
})
export type gps_T = Gps
export interface gps$_T extends Writable$<gps_T> {
	load_promise:Promise<gps_T>
	load():Promise<gps_T>
	reload():Promise<gps_T>
}
