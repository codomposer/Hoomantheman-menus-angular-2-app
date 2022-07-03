import type { nullish } from '@ctx-core/function'
import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import {
	ACCOUNT_INFORMATION_TAB, APP_CUSTOM_DOMAIN_FEATURE, APP_ID_READ_FEATURE, APP_ID_WRITE_FEATURE, APP_NAME_READ_FEATURE,
	APP_NAME_WRITE_FEATURE, APP_SUBDOMAIN_READ_FEATURE, APP_SUBDOMAIN_WRITE_FEATURE, BACKOFFICE_MIN_APP_VERSION_FEATURE,
	BACKOFFICE_MIN_FORCED_APP_VERSION_FEATURE, BILLING_PAGE, CHARTS_TAB, CHAT_PAGE, CONTACT_EMAIL_FEATURE, COUPONS_TAB,
	CUSTOMER_REVIEW_TAB, ENABLE_APP_FEATURE, ENABLE_MAP_VIEW_FEATURE, FILTERS_FEATURE, FIN_REPORT_TAB, FIN_STATEMENT_TAB,
	GROUP_SIMILAR_DISHES_FEATURE, INTRO_PAGES_FEATURE, MANAGE_CHAT_FEATURE, MANAGE_PLATFORM_PAGE,
	MANAGE_PLATFORM_PAGE_LINK, MANAGE_RESTAURANT_PAGE, MANAGE_SUPPORT_CHAT_FEATURE, MARKETING_PAGE, MENUS_TAB,
	MIN_APP_VERSION_FEATURE, MIN_FORCED_APP_VERSION_FEATURE, ORDER_PRICE_FEATURE, ORDERS_TAB, PREVIEW_TAB, POINTS_FEATURE,
	PUBLIC_KEY_FEATURE, REST_INFO_TAB, SETTINGS_PAGE, SUPPORT_PAGE, TERMS_CONDITIONS_PAGE, USERS_PAGE,
} from '@menus/web-config'
import { ro_auth_redirects$_b } from './ro_auth_redirects$_b.js'
import type { ro_user_common_Ctx } from './ro_user_common_Ctx.js'
const key = 'ro_auth_rules$'
export const ro_auth_rules$_b:B<ro_user_common_Ctx, typeof key> = be_(key, ctx=>{
	const ro_auth_redirects$ = ro_auth_redirects$_b(ctx)
	return derived$(ro_auth_redirects$, ro_auth_redirects=>{
		const ro_auth_rules = {} as ro_auth_rules_T
		for (const key in (ro_auth_redirects || {})) {
			ro_auth_rules[key] = !ro_auth_redirects[key]
		}
		return ro_auth_rules
	}) as ro_auth_rules$_T
})
export interface ro_auth_rules_T {
	[ACCOUNT_INFORMATION_TAB]:boolean
	[APP_CUSTOM_DOMAIN_FEATURE]:boolean
	[APP_ID_READ_FEATURE]:boolean
	[APP_ID_WRITE_FEATURE]:boolean
	[APP_NAME_READ_FEATURE]:boolean
	[APP_NAME_WRITE_FEATURE]:boolean
	[APP_SUBDOMAIN_READ_FEATURE]:boolean
	[APP_SUBDOMAIN_WRITE_FEATURE]:boolean
	[BACKOFFICE_MIN_APP_VERSION_FEATURE]:boolean
	[BACKOFFICE_MIN_FORCED_APP_VERSION_FEATURE]:boolean
	[BILLING_PAGE]:boolean
	[CHARTS_TAB]:boolean
	[CHAT_PAGE]:boolean
	[CONTACT_EMAIL_FEATURE]:boolean
	[COUPONS_TAB]:boolean
	[CUSTOMER_REVIEW_TAB]:boolean
	[ENABLE_APP_FEATURE]:boolean
	[ENABLE_MAP_VIEW_FEATURE]:boolean
	[FILTERS_FEATURE]:boolean
	[FIN_REPORT_TAB]:boolean
	[FIN_STATEMENT_TAB]:boolean
	[GROUP_SIMILAR_DISHES_FEATURE]:boolean
	[INTRO_PAGES_FEATURE]:boolean
	[MANAGE_CHAT_FEATURE]:boolean
	[MANAGE_SUPPORT_CHAT_FEATURE]:boolean
	[MANAGE_PLATFORM_PAGE]:boolean
	[MANAGE_PLATFORM_PAGE_LINK]:boolean
	[MANAGE_RESTAURANT_PAGE]:boolean
	[MARKETING_PAGE]:boolean
	[MENUS_TAB]:boolean
	[MIN_APP_VERSION_FEATURE]:boolean
	[MIN_FORCED_APP_VERSION_FEATURE]:boolean
	[ORDERS_TAB]:boolean
	[ORDER_PRICE_FEATURE]:boolean
	[PREVIEW_TAB]:boolean
	[POINTS_FEATURE]:boolean
	[PUBLIC_KEY_FEATURE]:boolean
	[REST_INFO_TAB]:boolean
	[SETTINGS_PAGE]:boolean
	[SUPPORT_PAGE]:boolean
	[TERMS_CONDITIONS_PAGE]:boolean
	[USERS_PAGE]:boolean
}
export type ro_auth_rules$_T = Readable$<ro_auth_rules_T|nullish>
