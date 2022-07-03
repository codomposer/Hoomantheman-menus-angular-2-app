import { B, be_ } from '@ctx-core/object'
import { derived$, Readable$ } from '@ctx-core/store'
import { RoMenuoptionitem_I } from '@menus/ro-shared-models'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
import { ro_menuoptionitems$_b } from './ro_menuoptionitems$_b.js'
const key = 'ro_menuoptionitems_limit_option_a$'
export const ro_menuoptionitems_limit_option_a$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ctx=>{
	const ro_menuoptionitems$ = ro_menuoptionitems$_b(ctx)
	return derived$(ro_menuoptionitems$, (ro_menuoptions:RoMenuoptionitem_I[])=>{
		return [{ text: 'No Limit', value: 0 }, ...(ro_menuoptions || []).map((_, index)=>{
			const value = index + 1
			return {
				text: `${value}`,
				value,
			}
		}, 0)]
	})
})
export interface RoMenuoptionsLimitOption_I {
	text:string
	value:number
}
export type ro_menuoptionitems_limit_option_a$_T = Readable$<RoMenuoptionsLimitOption_I[]>
