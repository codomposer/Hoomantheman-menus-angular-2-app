import { has_dom } from '@ctx-core/dom'
if (has_dom) throw 'dom not supported for redis_b.js'
import RedisStatic, { Redis } from 'ioredis'
import { B, be_ } from '@ctx-core/object'
import type { redis_Ctx } from './redis_Ctx.js'
const key = 'redis'
export const redis_b:B<redis_Ctx, typeof key> = be_(key, ()=>{
	const redis = new RedisStatic({
		host: process.env.REDIS_HOST || 'localhost',
		port: parseInt(process.env.REDIS_PORT || '6379'),
	})
	return redis
})
export type redis_T = Redis
