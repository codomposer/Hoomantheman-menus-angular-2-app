import type { nullish } from '@ctx-core/function'
import { B, be_ } from '@ctx-core/object'
import { Writable$ } from '@ctx-core/store'
import { idb_writable_ } from '@menus/idb'
import type { layout_ui_Ctx } from './layout_ui_Ctx.js'
const key = 'enable_beta_features$'
export const enable_beta_features$_b:B<layout_ui_Ctx, typeof key> = be_(key, ()=>{
	const enable_beta_features$ = idb_writable_<boolean>('enable_beta_features', (enable_beta_features?:boolean|nullish)=>{
		return enable_beta_features ?? false
	})
	return enable_beta_features$
})
export type enable_beta_features$_T = Writable$<boolean>
