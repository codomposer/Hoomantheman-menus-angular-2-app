import { B, be_ } from '@ctx-core/object'
import { ConsumerHttpClient } from './ConsumerHttpClient.js'
import type { consumer_http_Ctx } from './consumer_http_Ctx.js'
const key = 'consumer_http_client'
export const consumer_http_client_b:B<consumer_http_Ctx, typeof key> = be_(key, ctx=>
	new ConsumerHttpClient(ctx) as consumer_http_client_T
)
export type consumer_http_client_T = ConsumerHttpClient
