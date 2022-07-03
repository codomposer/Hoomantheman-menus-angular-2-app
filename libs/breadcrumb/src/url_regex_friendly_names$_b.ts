import { B, be_ } from '@ctx-core/object'
import type { Writable$ } from '@ctx-core/store'
import { Path } from '@menus/route'
import { refresh_writable_, refresh_mixin_T } from '@menus/store'
import type { breadcrumb_Ctx } from './breadcrumb_Ctx.js'
const key = 'url_regex_friendly_names$'
export const url_regex_friendly_names$_b:B<breadcrumb_Ctx, typeof key> = be_(key, ()=>
	refresh_writable_(url_regex_friendly_names_()) as url_regex_friendly_names$_T
)
function url_regex_friendly_names_() {
	const url_regex_friendly_names = new Map<RegExp, string>()
	url_regex_friendly_names.set(
		new RegExp(`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}[A-Za-z0-9\?=&]+$`),
		'Manage Restaurant'
	)
	return url_regex_friendly_names
}
export type url_regex_friendly_names_T = Map<RegExp, string>
export interface url_regex_friendly_names$_T
	extends Writable$<url_regex_friendly_names_T>,
		refresh_mixin_T<url_regex_friendly_names_T> {}
