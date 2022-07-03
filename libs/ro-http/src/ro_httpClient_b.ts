import { B, be_ } from '@ctx-core/object'
import { RoHttpClient } from './RoHttpClient.js'
import type { ro_http_Ctx } from './ro_http_Ctx.js'
const key = 'ro_httpClient'
export const ro_httpClient_b:B<ro_http_Ctx, typeof key> = be_(key, ctx=>
	new RoHttpClient(ctx) as RoHttpClient
)
export type ro_httpClient_T = RoHttpClient
