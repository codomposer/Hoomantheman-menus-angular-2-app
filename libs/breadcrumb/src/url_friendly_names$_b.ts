import { B, be_ } from '@ctx-core/object'
import type { Writable$ } from '@ctx-core/store'
import { Path } from '@menus/route'
import { refresh_writable_, refresh_mixin_T } from '@menus/store'
import type { breadcrumb_Ctx } from './breadcrumb_Ctx.js'
const key = 'url_friendly_names$'
export const url_friendly_names$_b:B<breadcrumb_Ctx, typeof key> = be_(key, ()=>
	refresh_writable_(url_friendly_names_()) as url_friendly_names$_T
)
function url_friendly_names_() {
	const url_friendly_names = new Map<string, string>()
	url_friendly_names.set(`/${Path.RO.BASE}/${Path.RO.MANAGE_RESTAURANT}`, 'Manage Restaurant')
	url_friendly_names.set(`/${Path.RO.BASE}/${Path.RO.USERS}`, 'Users')
	url_friendly_names.set(`/${Path.RO.BASE}/${Path.RO.SUPPORT}`, 'Support')
	url_friendly_names.set(`/${Path.RO.BASE}/${Path.RO.SETTINGS}`, 'Settings')
	url_friendly_names.set(`/${Path.RO.BASE}/${Path.RO.MANAGE_PLATFORM}`, 'Manage Platform')
	return url_friendly_names
}
export type url_friendly_names_T = Map<string, string>
export interface url_friendly_names$_T
	extends Writable$<url_friendly_names_T>,
		refresh_mixin_T<url_friendly_names_T> {}
