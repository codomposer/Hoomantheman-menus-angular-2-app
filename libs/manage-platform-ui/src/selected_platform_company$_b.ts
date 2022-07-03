import type { nullish } from '@ctx-core/function'
import { B, be_ } from '@ctx-core/object'
import { Writable$, writable$ } from '@ctx-core/store'
import type { PlatformCompany } from '@menus/ro-http'
import { platform_companies$_b } from './platform_companies$_b.js'
import type { manage_platform_ui_Ctx } from './manage_platform_ui_Ctx.js'
const key = 'selected_platform_company$'
export const selected_platform_company$_b:B<manage_platform_ui_Ctx, typeof key> = be_(key, function (ctx) {
	const platform_companies$ = platform_companies$_b(ctx)
	const selected_platform_company$ = writable$<PlatformCompany>(undefined) as selected_platform_company$_T
	platform_companies$.subscribe(platform_companies=>{
		if (!platform_companies?.length) {
			selected_platform_company$.set(null)
			return
		}
		const selected_platform_company = selected_platform_company$.$
		if (
			selected_platform_company
			&& (
				platform_companies.find(platform_company=>
					platform_company.App_ID === selected_platform_company.App_ID
				)
			)
		) return
		selected_platform_company$.set(platform_companies[0])
	})
	return selected_platform_company$
})
export type selected_platform_company$_T = Writable$<PlatformCompany|nullish>
