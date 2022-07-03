import { B, be_ } from '@ctx-core/object'
import type { ro_signup_ui_Ctx } from '../ro_signup_ui_Ctx.js'
import { Signup_step$_b } from './Signup_step$_b.js'
import { STEP_EMAIL } from './STEP.js'
const key = 'continue_restaurant_list_step'
export const continue_restaurant_list_step_b:B<ro_signup_ui_Ctx, typeof key> = be_(key, (ctx)=>{
	const Signup_step$ = Signup_step$_b(ctx)
	return continue_restaurant_list_step as continue_restaurant_list_step_T
	function continue_restaurant_list_step() {
		Signup_step$.$ = STEP_EMAIL
	}
})
export type continue_restaurant_list_step_T = ()=>void
