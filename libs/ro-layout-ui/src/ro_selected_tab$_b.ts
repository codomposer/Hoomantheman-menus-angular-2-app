import { B, be_ } from '@ctx-core/object'
import { page_path$_b } from '@ctx-core/sapper'
import { derived$, Readable$ } from '@ctx-core/store'
import {
	ACCOUNT_INFORMATION_TAB, CHARTS_TAB, COUPONS_TAB, CUSTOMER_REVIEW_TAB, FIN_REPORT_TAB, FIN_STATEMENT_TAB,
	MENUS_TAB, ORDERS_TAB, PREVIEW_TAB, REST_INFO_TAB
} from '@menus/web-config'
import type { ro_layout_ui_Ctx } from './ro_layout_ui_Ctx.js'
const key = 'ro_selected_tab$'
export const ro_selected_tab$_b:B<ro_layout_ui_Ctx, typeof key> = be_(key, ctx=>{
	const page_path$ = page_path$_b(ctx)
	return derived$(page_path$, (path)=>{
		if (!path) return null
		const path_a = path.split('/')
		if (~path_a.indexOf('menu-details')) return MENUS_TAB
		if (~path_a.indexOf('order-details')) return ORDERS_TAB
		if (~path_a.indexOf(ACCOUNT_INFORMATION_TAB)) return ACCOUNT_INFORMATION_TAB
		if (~path_a.indexOf(MENUS_TAB)) return MENUS_TAB
		if (~path_a.indexOf(ORDERS_TAB)) return ORDERS_TAB
		if (~path_a.indexOf(COUPONS_TAB)) return COUPONS_TAB
		if (~path_a.indexOf(PREVIEW_TAB)) return PREVIEW_TAB
		if (~path_a.indexOf(CHARTS_TAB)) return CHARTS_TAB
		if (~path_a.indexOf(FIN_REPORT_TAB)) return FIN_REPORT_TAB
		if (~path_a.indexOf(FIN_STATEMENT_TAB)) return FIN_STATEMENT_TAB
		if (~path_a.indexOf(CUSTOMER_REVIEW_TAB)) return CUSTOMER_REVIEW_TAB
		return REST_INFO_TAB
	}) as ro_selected_tab$_T
})
export type ro_selected_tab$_T = Readable$<string>
