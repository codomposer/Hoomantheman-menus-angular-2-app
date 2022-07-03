import { B, be_ } from '@ctx-core/object'
import type { aws_Ctx } from '../aws_Ctx.js'
const key = 'has_redis'
export const has_redis_b:B<aws_Ctx, typeof key> = be_(key, ()=>{
	return true
})
export type has_redis_T = boolean
