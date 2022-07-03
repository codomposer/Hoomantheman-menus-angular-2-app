import { run } from '@ctx-core/function'
import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { ServiceType, ServiceTypeId } from '@menus/service-type-common'
import { fetch_search_menus_menu_b } from '@menus/consumer-http'
import { SearchMenuRequestQuery } from '@menus/search-menu-common'
import { manage_platform_settings$_b } from './manage_platform_settings$_b.js'
import type { manage_platform_ui_Ctx } from './manage_platform_ui_Ctx.js'
const key = 'manage_platform_no_active_restaurant$'
export const manage_platform_no_active_restaurant$_b:B<manage_platform_ui_Ctx, typeof key> = be_(key, function (ctx) {
	const fetch_search_menus_menu = fetch_search_menus_menu_b(ctx)
	const manage_platform_settings$ = manage_platform_settings$_b(ctx)
	let pcpk:string
	return derived$(manage_platform_settings$, (manage_platform_settings, set)=>{
		const in_pcpk = manage_platform_settings?.PublicKey
		if (!pcpk || pcpk === in_pcpk) {
			set(undefined)
			return
		}
		pcpk = in_pcpk
		run(async()=>{
			const data = new SearchMenuRequestQuery()
			data.usemap = 1
			data.menuType = ServiceTypeId[ServiceType.SERVICE_TYPE_ALL]
			data.page = 1
			data.pageSize = 1
			data.pcpk = pcpk
			const search_menus_menu_payload = await fetch_search_menus_menu(data)
			if (manage_platform_settings$.$?.PublicKey !== pcpk) return
			const Data = search_menus_menu_payload.Data || []
			set(!Data.length)
		}).then()
	}) as manage_platform_no_active_restaurant$_T
})
export type manage_platform_no_active_restaurant$_T = Readable$<boolean>
