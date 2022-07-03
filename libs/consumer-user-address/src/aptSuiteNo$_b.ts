import { B, be_ } from '@ctx-core/object'
import type { Writable$ } from '@ctx-core/store'
import { idb_writable_ } from '@menus/idb'
import type { consumer_user_address_Ctx } from './consumer_user_address_Ctx.js'
const key = 'aptSuiteNo$'
export const aptSuiteNo$_b:B<consumer_user_address_Ctx, typeof key> = be_(key, ()=>
	idb_writable_<string>(
		'$aptSuiteNo', aptSuiteNo=>
			aptSuiteNo == null ? '' : aptSuiteNo
	) as aptSuiteNo$_T
)
export type aptSuiteNo$_T = Writable$<string>
