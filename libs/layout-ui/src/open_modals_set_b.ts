import { B, be_, assign } from '@ctx-core/object'
import { refresh_writable_, refresh_writable_T } from '@menus/store'
import type { layout_ui_Ctx } from './layout_ui_Ctx.js'
const key = 'open_modals_set'
export const open_modals_set_b:B<layout_ui_Ctx, typeof key> = be_(key, ()=>{
	const open_modals_set = refresh_writable_<Set<string>>(new Set<string>())
	return assign(open_modals_set, {
		add(value:string) {
			const rv = open_modals_set.$.add(value)
			open_modals_set.refresh()
			return rv
		},
		clear() {
			open_modals_set.$.clear()
			open_modals_set.refresh()
		},
		delete(value:string) {
			const rv = open_modals_set.$.delete(value)
			open_modals_set.refresh()
			return rv
		},
	}) as open_modals_set_T
})
export interface open_modals_set_T extends refresh_writable_T<Set<string>> {
	add(value:string):Set<string>
	clear():void
	delete(value:string):boolean
}
