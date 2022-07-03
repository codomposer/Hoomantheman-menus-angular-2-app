import { B, be_, assign } from '@ctx-core/object'
import type { Writable$ } from '@ctx-core/store'
import { refresh_writable_, invalidate_mixin_T, refresh_mixin_T } from '@menus/store'
import type { OptionGroupSuggestion } from '@menus/ro-shared-models'
import {
	API_MENUS_optiongroup_list_payload$_b, success_API_MENUS_optiongroup_list_payload_T
} from '@menus/ro-restaurant-ui'
import type { ro_menu_ui_Ctx } from './ro_menu_ui_Ctx.js'
const key = 'OptionGroupSuggestions$'
export const OptionGroupSuggestions$_b:B<ro_menu_ui_Ctx, typeof key> = be_(key, ctx=>{
	const OptionGroupSuggestions$ = refresh_writable_<OptionGroupSuggestion[]>(null)
	const API_MENUS_optiongroup_list_payload$ = API_MENUS_optiongroup_list_payload$_b(ctx)
	API_MENUS_optiongroup_list_payload$.subscribe($API_MENUS_optiongroup_list_payload=>{
		const OptionGroupSuggestions = (
			$API_MENUS_optiongroup_list_payload as success_API_MENUS_optiongroup_list_payload_T
		)?.Data
		if (OptionGroupSuggestions) {
			OptionGroupSuggestions$.$ = OptionGroupSuggestions
		} else {
			OptionGroupSuggestions$.$ = null
		}
	})
	return assign(OptionGroupSuggestions$, {
		invalidate() {
			API_MENUS_optiongroup_list_payload$.invalidate()
		}
	}) as OptionGroupSuggestions$_T
})
export interface OptionGroupSuggestions$_T
	extends Writable$<OptionGroupSuggestion[]>,
		refresh_mixin_T<OptionGroupSuggestion[]>,
		invalidate_mixin_T {}
