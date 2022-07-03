import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { html_scrollTop$_b } from '@menus/layout-ui'
import type { ro_layout_ui_Ctx } from './ro_layout_ui_Ctx.js'
import { ro_app_body_scrollTop$_b } from './ro_app_body_scrollTop$_b'
const key = 'ro_scrollTop$'
export const ro_scrollTop$_b:B<ro_layout_ui_Ctx, typeof key> = be_(key, (ctx)=>{
	const html_scrollTop$ = html_scrollTop$_b(ctx)
	const ro_app_body_scrollTop$ = ro_app_body_scrollTop$_b(ctx)
	return derived$([html_scrollTop$, ro_app_body_scrollTop$], ([html_scrollTop, ro_app_body_scrollTop])=>
		html_scrollTop + ro_app_body_scrollTop
	)
})
export type ro_scrollTop$_T = Readable$<number>
