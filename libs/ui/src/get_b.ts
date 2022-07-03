import { B, be_ } from '@ctx-core/object'
import { get } from '@ctx-core/store'
import type { ui_Ctx } from './ui_Ctx.js'
const key = 'get'
export const get_b:B<ui_Ctx, typeof key> = be_(key, ()=>{
	return get as get_T
})
export type get_T = (store:any)=>any
