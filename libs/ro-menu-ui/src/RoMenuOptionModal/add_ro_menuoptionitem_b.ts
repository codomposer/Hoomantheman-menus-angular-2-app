import { B, be_ } from '@ctx-core/object'
import { notyf_error_b } from '@menus/notyf'
import { RoMenuoptionitem } from '@menus/ro-shared-models'
import type { ro_menu_ui_Ctx } from '../ro_menu_ui_Ctx.js'
import { selected_ro_menuoption$_b } from '../selected_ro_menuoption$_b.js'
import { ro_menuoptionitems$_b } from '../ro_menuoptionitems$_b.js'
import { ro_menuoptionsizes$_b } from '../ro_menuoptionsizes$_b.js'
import { edit_ro_menuoptionitem_b } from './edit_ro_menuoptionitem_b.js'
const key = 'add_ro_menuoptionitem'
export const add_ro_menuoptionitem_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, (ctx)=>{
	const edit_ro_menuoptionitem = edit_ro_menuoptionitem_b(ctx)
	const notyf_error = notyf_error_b(ctx)
	const selected_ro_menuoption$ = selected_ro_menuoption$_b(ctx)
	const ro_menuoptionitems$ = ro_menuoptionitems$_b(ctx)
	const ro_menuoptionsizes$ = ro_menuoptionsizes$_b(ctx)
	return add_ro_menuoptionitem as add_ro_menuoptionitem_T
	async function add_ro_menuoptionitem() {
		if (!(selected_ro_menuoption$.$?.ID > 0)) {
			notyf_error('You need to Save Option Category first')
			return
		}
		const ro_menuoptionitem = new RoMenuoptionitem()
		ro_menuoptionitem.ID = -Date.now()
		for (const size of ro_menuoptionsizes$.$) {
			if (size.ID > 0) {
				ro_menuoptionitem.SizeDetails.push({
					MenuSizeID: size.ID,
					Name: size.Name,
					Price: 0,
					id: 0,
				})
			}
		}
		const ro_menuoptionitems = ro_menuoptionitems$.$
		ro_menuoptionitems.push(ro_menuoptionitem)
		ro_menuoptionitems$.$ = ro_menuoptionitems
		await edit_ro_menuoptionitem(ro_menuoptionitem)
	}
})
export type add_ro_menuoptionitem_T = ()=>Promise<void>
