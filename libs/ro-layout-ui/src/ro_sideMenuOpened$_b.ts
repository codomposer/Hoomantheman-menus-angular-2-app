import { B, be_ } from '@ctx-core/object'
import { tup } from '@ctx-core/array'
import { no_dom } from '@ctx-core/dom'
import { derived$, Readable$ } from '@ctx-core/store'
import { in_ro_sideMenuOpened$_b } from './in_ro_sideMenuOpened$_b.js'
import type { ro_layout_ui_Ctx } from './ro_layout_ui_Ctx.js'
const key = 'ro_sideMenuOpened$'
export const ro_sideMenuOpened$_b:B<ro_layout_ui_Ctx, typeof key> = be_(key, ctx=>{
		const in_ro_sideMenuOpened$ = in_ro_sideMenuOpened$_b(ctx)
		return derived$(
			tup(in_ro_sideMenuOpened$, in_ro_sideMenuOpened$.ready$),
			([in_ro_sideMenuOpened, ready])=>{
				return no_dom || !ready || in_ro_sideMenuOpened
			}
		) as ro_sideMenuOpened$_T
	}
)
export type ro_sideMenuOpened$_T = Readable$<boolean>
