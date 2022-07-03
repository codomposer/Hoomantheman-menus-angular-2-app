import type { nullish } from '@ctx-core/function'
import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { is_hash_routing } from '@menus/core-routing'
import {
	ACCOUNT_INFORMATION_TAB, APP_CUSTOM_DOMAIN_FEATURE, APP_ID_READ_FEATURE, APP_ID_WRITE_FEATURE, APP_NAME_READ_FEATURE,
	APP_NAME_WRITE_FEATURE, APP_SUBDOMAIN_READ_FEATURE, APP_SUBDOMAIN_WRITE_FEATURE, BACKOFFICE_MIN_APP_VERSION_FEATURE,
	BACKOFFICE_MIN_FORCED_APP_VERSION_FEATURE, BILLING_PAGE, CHARTS_TAB, CHAT_PAGE, CONTACT_EMAIL_FEATURE, COUPONS_TAB,
	CUSTOMER_REVIEW_TAB, ENABLE_APP_FEATURE, ENABLE_MAP_VIEW_FEATURE, FILTERS_FEATURE, FIN_REPORT_TAB, FIN_STATEMENT_TAB,
	GROUP_SIMILAR_DISHES_FEATURE, INTRO_PAGES_FEATURE, MANAGE_CHAT_FEATURE, MANAGE_PLATFORM_PAGE, MANAGE_RESTAURANT_PAGE,
	MANAGE_SUPPORT_CHAT_FEATURE, MARKETING_PAGE, MENUS_TAB, MIN_APP_VERSION_FEATURE, MIN_FORCED_APP_VERSION_FEATURE,
	ORDER_PRICE_FEATURE, ORDERS_TAB, PREVIEW_TAB, POINTS_FEATURE, PUBLIC_KEY_FEATURE, REST_INFO_TAB, SETTINGS_PAGE,
	SUPPORT_PAGE, TERMS_CONDITIONS_PAGE, USERS_PAGE, MANAGE_PLATFORM_PAGE_LINK,
} from '@menus/web-config'
import { is_admin_role_ } from './is_admin_role_.js'
import { is_appmaker_role_ } from './is_appmaker_role_.js'
import { is_kitchen_role_ } from './is_kitchen_role_.js'
import { is_super_admin_role_ } from './is_super_admin_role_.js'
import { is_vendor_admin_role_ } from './is_vendor_admin_role_.js'
import { ro_login_user$_b } from './ro_login_user$_b.js'
import type { ro_user_common_Ctx } from './ro_user_common_Ctx.js'
import { is_rest_owner_role_ } from './is_rest_owner_role_'
const key = 'ro_auth_redirects$'
export const ro_auth_redirects$_b:B<ro_user_common_Ctx, typeof key> = be_(key, ctx=>{
	const ro_login_user$ = ro_login_user$_b(ctx)
	return derived$(ro_login_user$, ro_login_user=>{
		if (ro_login_user == undefined) return undefined
		if (ro_login_user == null) return null
		const is_admin_role = is_admin_role_(ro_login_user)
		const is_appmaker_role = is_appmaker_role_(ro_login_user)
		const is_kitchen_role = is_kitchen_role_(ro_login_user)
		const is_rest_owner_role = is_rest_owner_role_(ro_login_user)
		const is_super_admin_role = is_super_admin_role_(ro_login_user)
		const is_vendor_admin_role = is_vendor_admin_role_(ro_login_user)
		const login_url = '/backoffice/login'
		const terms_conditions_url = '/backoffice/terms-conditions'
		const ro_login_user_or_login_url = !ro_login_user ? login_url : ''
		const admin_or_login_url = !is_admin_role ? login_url : ''
		const path_routing_and_admin_or_login_url = (is_hash_routing || !is_admin_role) ? login_url : ''
		const admin_appmaker_or_login_url = (!is_admin_role && !is_appmaker_role) ? login_url : ''
		// ShowPlatformMenu rule only applies to restaurant_owner
		const admin_appmaker_or_restaurant_owner_with_ShowPlatformMenu_or_login_url =
			(
				(is_admin_role || is_appmaker_role)
				&& (
					!is_rest_owner_role
					|| (
						is_rest_owner_role
						&& ro_login_user.ShowPlatformMenu
					)))
			? ''
			: login_url
		const super_admin_or_login_url = !is_super_admin_role ? login_url : ''
		const vendor_admin_or_login_url = !is_vendor_admin_role ? login_url : ''
		const login_and_not_appmaker_or_login_url =
			ro_login_user_or_login_url
			|| (is_appmaker_role ? login_url : '')
		const login_and_not_kitchen_or_login_url =
			ro_login_user_or_login_url
			|| (is_kitchen_role ? login_url : '')
		const login_and_not_appmaker_kitchen_or_login_url =
			ro_login_user_or_login_url
			|| (is_kitchen_role ? login_url : '')
			|| (is_appmaker_role ? login_url : '')
		const terms_or_terms_conditions_url = !ro_login_user.Terms ? terms_conditions_url : ''
		return {
			[ACCOUNT_INFORMATION_TAB]: admin_or_login_url,
			[APP_CUSTOM_DOMAIN_FEATURE]: vendor_admin_or_login_url,
			[APP_ID_READ_FEATURE]: vendor_admin_or_login_url,
			[APP_ID_WRITE_FEATURE]: vendor_admin_or_login_url,
			[APP_NAME_READ_FEATURE]: admin_or_login_url,
			[APP_NAME_WRITE_FEATURE]: vendor_admin_or_login_url,
			[APP_SUBDOMAIN_READ_FEATURE]: admin_or_login_url,
			[APP_SUBDOMAIN_WRITE_FEATURE]: vendor_admin_or_login_url,
			[BACKOFFICE_MIN_APP_VERSION_FEATURE]: super_admin_or_login_url,
			[BACKOFFICE_MIN_FORCED_APP_VERSION_FEATURE]: super_admin_or_login_url,
			[BILLING_PAGE]: path_routing_and_admin_or_login_url,
			[CHAT_PAGE]: admin_or_login_url || terms_or_terms_conditions_url,
			[CHARTS_TAB]: login_and_not_appmaker_kitchen_or_login_url,
			[CONTACT_EMAIL_FEATURE]: vendor_admin_or_login_url,
			[COUPONS_TAB]: admin_or_login_url,
			[CUSTOMER_REVIEW_TAB]: login_and_not_appmaker_kitchen_or_login_url,
			[ENABLE_APP_FEATURE]: vendor_admin_or_login_url,
			[ENABLE_MAP_VIEW_FEATURE]: vendor_admin_or_login_url,
			[FILTERS_FEATURE]: vendor_admin_or_login_url,
			[FIN_REPORT_TAB]: admin_or_login_url,
			[FIN_STATEMENT_TAB]: admin_or_login_url,
			[GROUP_SIMILAR_DISHES_FEATURE]: vendor_admin_or_login_url,
			[INTRO_PAGES_FEATURE]: vendor_admin_or_login_url,
			[MANAGE_CHAT_FEATURE]: vendor_admin_or_login_url,
			[MANAGE_SUPPORT_CHAT_FEATURE]: vendor_admin_or_login_url,
			[MANAGE_PLATFORM_PAGE]: (
				admin_appmaker_or_restaurant_owner_with_ShowPlatformMenu_or_login_url || terms_or_terms_conditions_url
			),
			[MANAGE_PLATFORM_PAGE_LINK]: admin_appmaker_or_login_url,
			[MANAGE_RESTAURANT_PAGE]: ro_login_user_or_login_url || terms_or_terms_conditions_url,
			[MARKETING_PAGE]: admin_appmaker_or_login_url,
			[MENUS_TAB]: admin_appmaker_or_login_url,
			[MIN_APP_VERSION_FEATURE]: super_admin_or_login_url,
			[MIN_FORCED_APP_VERSION_FEATURE]: super_admin_or_login_url,
			[ORDER_PRICE_FEATURE]: login_and_not_appmaker_kitchen_or_login_url,
			[ORDERS_TAB]: login_and_not_appmaker_or_login_url,
			[PREVIEW_TAB]: login_and_not_kitchen_or_login_url,
			[POINTS_FEATURE]: super_admin_or_login_url,
			[PUBLIC_KEY_FEATURE]: vendor_admin_or_login_url,
			[REST_INFO_TAB]: admin_appmaker_or_login_url,
			[SETTINGS_PAGE]: ro_login_user_or_login_url || terms_or_terms_conditions_url,
			[SUPPORT_PAGE]: ro_login_user_or_login_url || terms_or_terms_conditions_url,
			[TERMS_CONDITIONS_PAGE]: ro_login_user_or_login_url,
			[USERS_PAGE]: admin_or_login_url || terms_or_terms_conditions_url,
		} as ro_auth_redirects_T
	}) as ro_auth_redirects$_T
})
export interface ro_auth_redirects_T {
	[ACCOUNT_INFORMATION_TAB]:string
	[APP_CUSTOM_DOMAIN_FEATURE]:string
	[APP_ID_READ_FEATURE]:string
	[APP_ID_WRITE_FEATURE]:string
	[APP_NAME_READ_FEATURE]:string
	[APP_NAME_WRITE_FEATURE]:string
	[APP_SUBDOMAIN_READ_FEATURE]:string
	[APP_SUBDOMAIN_WRITE_FEATURE]:string
	[BACKOFFICE_MIN_APP_VERSION_FEATURE]:string
	[BACKOFFICE_MIN_FORCED_APP_VERSION_FEATURE]:string
	[BILLING_PAGE]:string
	[CHARTS_TAB]:string
	[CHAT_PAGE]:string
	[CONTACT_EMAIL_FEATURE]:string
	[COUPONS_TAB]:string
	[CUSTOMER_REVIEW_TAB]:string
	[ENABLE_APP_FEATURE]:string
	[ENABLE_MAP_VIEW_FEATURE]:string
	[FILTERS_FEATURE]:string
	[FIN_REPORT_TAB]:string
	[FIN_STATEMENT_TAB]:string
	[GROUP_SIMILAR_DISHES_FEATURE]:string
	[INTRO_PAGES_FEATURE]:string
	[MANAGE_CHAT_FEATURE]:string
	[MANAGE_SUPPORT_CHAT_FEATURE]:string
	[MANAGE_PLATFORM_PAGE]:string
	[MANAGE_RESTAURANT_PAGE]:string
	[MANAGE_PLATFORM_PAGE_LINK]:string
	[MARKETING_PAGE]:string
	[MENUS_TAB]:string
	[MIN_APP_VERSION_FEATURE]:string
	[MIN_FORCED_APP_VERSION_FEATURE]:string
	[ORDERS_TAB]:string
	[ORDER_PRICE_FEATURE]:string
	[PREVIEW_TAB]:string
	[POINTS_FEATURE]:string
	[PUBLIC_KEY_FEATURE]:string
	[REST_INFO_TAB]:string
	[SETTINGS_PAGE]:string
	[SUPPORT_PAGE]:string
	[TERMS_CONDITIONS_PAGE]:string
	[USERS_PAGE]:string
}
export type ro_auth_redirects$_T = Readable$<ro_auth_redirects_T|nullish>
