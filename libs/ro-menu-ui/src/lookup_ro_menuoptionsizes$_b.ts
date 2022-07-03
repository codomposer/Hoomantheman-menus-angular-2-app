import { B, be_ } from '@ctx-core/object'
import type { Writable$ } from '@ctx-core/store'
import { refresh_writable_, refresh_mixin_T } from '@menus/store'
import type { RoMenuoptionsize_I } from '@menus/ro-shared-models'
import { API_MENUS_sizelookup_payload$_b } from '@menus/ro-restaurant-ui'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
const key = 'lookup_ro_menuoptionsizes$'
export const lookup_ro_menuoptionsizes$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ctx=>{
	const lookup_ro_menuoptionsizes$ = refresh_writable_<RoMenuoptionsize_I[]>(null)
	const API_MENUS_sizelookup_payload$ = API_MENUS_sizelookup_payload$_b(ctx)
	API_MENUS_sizelookup_payload$.subscribe(API_MENUS_sizelookup_payload=>{
		const lookup_ro_menuoptionsizes = API_MENUS_sizelookup_payload?.Data
		lookup_ro_menuoptionsizes$.$ = lookup_ro_menuoptionsizes ? lookup_ro_menuoptionsizes : null
	})
	return lookup_ro_menuoptionsizes$ as lookup_ro_menuoptionsizes$_T
})
export interface lookup_ro_menuoptionsizes$_T
	extends Writable$<RoMenuoptionsize_I[]>,
		refresh_mixin_T<RoMenuoptionsize_I[]> {}
