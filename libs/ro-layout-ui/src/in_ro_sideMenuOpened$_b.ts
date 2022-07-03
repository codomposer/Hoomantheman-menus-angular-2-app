import { B, be_ } from '@ctx-core/object'
import { idb_writable_, idb_writable_T } from '@menus/idb'
import type { ro_layout_ui_Ctx } from './ro_layout_ui_Ctx.js'
const key = 'in_ro_sideMenuOpened$'
export const in_ro_sideMenuOpened$_b:B<ro_layout_ui_Ctx, typeof key> = be_(key, ()=>
	idb_writable_<boolean>(
		'in_ro_sideMenuOpened', in_ro_sideMenuOpened=>
			in_ro_sideMenuOpened == null ? false : in_ro_sideMenuOpened
	) as in_ro_sideMenuOpened$_T
)
export type in_ro_sideMenuOpened$_T = idb_writable_T<boolean>
