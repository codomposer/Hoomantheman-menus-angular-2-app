import { del as idel, get as iget, set as iset } from 'idb-keyval'
import { has_dom } from '@ctx-core/dom'
// import { weak_r_ } from '@ctx-core/object'
import type { Page, PreloadSession } from '@ctx-core/sapper'
import { PageContext } from '@ctx-core/sapper'
import { gps_url_, WebConfig } from '@menus/web-config'
import { Gps } from '@menus/platform-settings-lib'
import { get_b } from './get_b.js'
import type { ui_Ctx } from './ui_Ctx.js'
export const ui_ctx_key:ui_ctx_key_T = 'ui_ctx'
export function ui_ctx_(page:Page|PageContext, session:ui_ctx__session_T):ui_Ctx {
	let ui_ctx:ui_Ctx =
		(has_dom ? window.ui_ctx : null)
		|| session?.ui_ctx
	if (!ui_ctx) {
		const webConfig = session.webConfig || (has_dom ? window.webConfig : null)
		const { gps } = session
		const gps_url = gps_url_(page.host, webConfig)
		ui_ctx = {
			webConfig, gps_url, gps, iget, iset, idel,
		} as ui_Ctx
		// ui_ctx = weak_r_({
		//   webConfig, gps_url, gps,
		//   iget, iset, idel,
		// }) as ui_Ctx
		if (has_dom) window.ui_ctx = ui_ctx
		get_b(ui_ctx)
	}
	return ui_ctx
}
export interface ui_ctx__session_T extends PreloadSession {
	webConfig:WebConfig
	gps?:Gps
	ui_ctx?:ui_Ctx
}
export interface ui_ctx_page_I {
	host:string
	[rest:string]:any
}
export type ui_ctx_key_T = 'ui_ctx'
declare global {
	interface Window {
		ctx:ui_Ctx
		ui_ctx:ui_Ctx
	}
}
