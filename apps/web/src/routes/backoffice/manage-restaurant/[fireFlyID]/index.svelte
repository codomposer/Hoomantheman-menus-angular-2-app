<script context="module" lang="ts">
import { no_dom } from '@ctx-core/dom'
import { neq_, neql_, run } from '@ctx-core/function'
import type { PreloadContext, PageContext } from '@ctx-core/sapper'
import { subscribe_wait_timeout } from '@ctx-core/store'
import { preload_ } from '@menus/app'
import { ro_orders_API_ORDERS_list_payload$_b } from '@menus/ro-orders'
import { ro_restaurant$_b } from '@menus/ro-restaurant'
import { ro_auth_redirects$_b, ro_auth_rules$_b, ro_login_user$_b } from '@menus/ro-user-common'
import type { ui_ctx__session_T } from '@menus/ui'
import { ssr_ui_ctx_ } from '@menus/ui'
import {
	CHARTS_TAB, COUPONS_TAB, CUSTOMER_REVIEW_TAB, FIN_REPORT_TAB, FIN_STATEMENT_TAB, MENUS_TAB, ORDERS_TAB, PREVIEW_TAB,
	REST_INFO_TAB, timeout_ms
} from '@menus/web-config'
export const preload = preload_(async function (this:PreloadContext, page:PageContext, session:ui_ctx__session_T) {
	const ui_ctx = ssr_ui_ctx_(page, session)
	if (no_dom) return
	const { params } = page
	const { fireFlyID } = params
	const ro_auth_redirects$ = ro_auth_redirects$_b(ui_ctx)
	const ro_auth_rules$ = ro_auth_rules$_b(ui_ctx)
	const ro_orders_API_ORDERS_list_payload$ = ro_orders_API_ORDERS_list_payload$_b(ui_ctx)
	const ro_login_user$ = ro_login_user$_b(ui_ctx)
	const ro_login_user = await subscribe_wait_timeout(ro_login_user$, neql_(undefined), timeout_ms)
	const ro_restaurant$ = ro_restaurant$_b(ui_ctx)
	const ro_restaurant = ro_login_user ? await subscribe_wait_timeout(ro_restaurant$, neq_(null), timeout_ms) : null
	const check_tab_a = [
		REST_INFO_TAB, FIN_REPORT_TAB, FIN_STATEMENT_TAB, CHARTS_TAB, CUSTOMER_REVIEW_TAB, PREVIEW_TAB,
		MENUS_TAB, COUPONS_TAB
	]
	const ro_auth_rules = ro_auth_rules$.$
	const tab =
		(
			ro_auth_rules[ORDERS_TAB]
			&& ro_restaurant?.EnableOnlineOrdering
			&& await run(async ()=>{
				await ro_orders_API_ORDERS_list_payload$.load_promise
				return !!(ro_orders_API_ORDERS_list_payload$.$.OrderList[0])
			})
		)
		? ORDERS_TAB
		: check_tab_a.find(tab=>ro_auth_rules[tab])
	const url = (
		tab
		? `/backoffice/manage-restaurant/${fireFlyID}/${tab}`
		: (ro_auth_redirects$[check_tab_a[0]] ?? '/backoffice/login')
	)
	return this.redirect(302, url)
})
</script>
